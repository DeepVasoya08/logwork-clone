import React, { useEffect } from "react";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pusher from "pusher-js";
import axios from "axios";
import { Chip } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useDispatch } from "react-redux";

import Timer from "../../home/Timer";
import { setContinueTask } from "../../../context/workSlice";

const History = () => {
  const date = new Date().toISOString().substring(0, 10);
  const dispatch = useDispatch();
  const [workList, setWorkList] = useState([]);

  const pusher = new Pusher("683e41031fc87aba3ff7", {
    cluster: "ap2",
  });

  const channel = pusher.subscribe("works");
  channel.bind("work", () => {
    fetchWork();
  });

  const fetchWork = async () => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    await axios
      .get("http://localhost:9000/work/worklist", {
        headers: {
          "x-access-token": `Bearer ${jwt}`,
        },
      })
      .then((d) => {
        if (d.data) {
          setWorkList(d.data);
        }
      })
      .catch((e) => console.log(e.response.data));
  };

  const handleClick = (date, name, time, total_time) => {
    const date_ = new Date().toISOString().substring(0, 10);
    if (date_ === date) {
      dispatch(setContinueTask([name, time, total_time]));
    } else {
      dispatch(setContinueTask([name, 0]));
    }
  };

  useEffect(() => {
    fetchWork();
  }, []);

  return (
    <div className="w-[35vw] m-2 flex flex-col-reverse">
      {workList.length >= 1 ? (
        workList.map((obj) => {
          return Object.entries(obj).map(([key, value]) => {
            if (key !== "_id" && key !== "__v") {
              return (
                <Accordion
                  sx={{ margin: "10px", borderRadius: "10px" }}
                  key={key}
                >
                  <AccordionSummary
                    sx={{
                      bgcolor: "grey",
                      borderRadius: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography sx={{ width: "65%", flexShrink: 0 }}>
                      {key === date ? "Today" : key}
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.primary",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Total: <Timer time={value.total_time} />
                    </Typography>
                  </AccordionSummary>
                  {Object.entries(value).map(([subKey, subValue]) => {
                    if (subKey !== "total_time") {
                      return (
                        <AccordionDetails
                          key={subKey}
                          className="flex justify-between"
                        >
                          <div>
                            <Chip label={subKey} color="success" />
                            <span className="m-1">{subValue.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Timer time={subValue.time} />
                            <PlayArrowIcon
                              sx={{ cursor: "pointer" }}
                              onClick={() =>
                                handleClick(
                                  key,
                                  subValue.name,
                                  subValue.time,
                                  value.total_time
                                )
                              }
                              color="success"
                            />
                          </div>
                        </AccordionDetails>
                      );
                    }
                  })}
                </Accordion>
              );
            }
          });
        })
      ) : (
        <>
          <div></div>
        </>
      )}
    </div>
    // <div></div>
  );
};

export default History;
