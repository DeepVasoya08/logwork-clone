import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PlayArrow, Pause } from "@mui/icons-material";
import axios from "axios";
import { useSelector } from "react-redux";

import Timer from "../home/Timer";
import TotalHour from "./TotalHour";
import { setWork } from "../../context/workSlice";

const Body = () => {
  const [project, setProject] = useState("");
  const [time, setTime] = useState(0);
  const [total_time, setTotalTime] = useState(0);
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const dispatch = useDispatch();
  const continueTask = useSelector((state) => state.work.continueTask);

  const continueTask_ = (task_name, time, total_time_) => {
    if (total_time_) {
      setTotalTime(total_time_);
    }
    setProject(task_name);
    setTime(time);
    setStart(true);
    setPaused(false);
  };

  const handleStart = () => {
    if (project.length <= 0) {
      alert("Please enter task!");
      return;
    }
    checkTask();
    if (project) setStart(true);
    setPaused(false);
  };

  const handlePause = () => {
    setPaused(true);
    setStart(false);
    handleTask();
  };

  const updateAllTasks = (task) => {
    const idx = allTasks.findIndex((t) => t.name === task.name);
    if (idx === -1) {
      setAllTasks([...allTasks, task]);
    } else {
      const updated = [...allTasks];
      updated[idx] = {
        ...updated[idx],
        time: task.time,
      };
      setAllTasks(updated);
    }
  };

  const handleTask = () => {
    let task = [{ total_time }, { name: project, time }];
    updateAllTasks(task[1]);
    dispatch(setWork(task));
  };

  const checkTask = () => {
    for (let tasks in allTasks) {
      const task = allTasks[tasks];
      if (project === task.name) {
        setTime(task.time);
        return;
      }
    }
    setTime(0);
  };

  useEffect(() => {
    if (continueTask.length <= 1) {
      return;
    }
    if (continueTask.length >= 3) {
      continueTask_(continueTask[0], continueTask[1], continueTask[2]);
    } else {
      continueTask_(continueTask[0], continueTask[1]);
    }
  }, [continueTask]);

  // saving records when task pauses
  useEffect(() => {
    if (allTasks.length >= 1) {
      const fetchList = async () => {
        const jwt = JSON.parse(localStorage.getItem("token"));
        await axios
          .post(
            "http://localhost:9000/work/task",
            {
              total_time,
              ...allTasks,
            },
            {
              headers: {
                "x-access-token": `Bearer ${jwt}`,
              },
            }
          )
          .catch((e) => alert(e.response.data));
      };
      setTimeout(() => {
        fetchList();
      }, 800);
    }
    return () => {};
  }, [allTasks]);

  // task timer
  useEffect(() => {
    let interval = null;
    if (start && paused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
        setTotalTime((time) => time + 10);
        sessionStorage.setItem("total_time", total_time);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [start, paused]);

  return (
    <div className="w-[70vw] h-[55vh]">
      <div className="home__container flex flex-col justify-center items-center relative top-40">
        <div className="home__title">
          <h1 className="text-xl">Worked Today:</h1>
        </div>
        <div className="home__total_time">
          <TotalHour time={total_time} />
        </div>
        <div className="home__input">
          <div className="home__input_box flex items-center justify-center">
            <input
              className="outline-none m-1 p-1 rounded-lg"
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="project name"
            />
            <Timer time={time} />
            {paused ? (
              <div className="cursor-pointer" onClick={handleStart}>
                <PlayArrow color="success" fontSize="large" />
              </div>
            ) : (
              <div className="cursor-pointer" onClick={handlePause}>
                <Pause color="error" fontSize="large" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
