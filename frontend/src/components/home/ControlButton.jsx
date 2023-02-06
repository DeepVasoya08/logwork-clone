import "./ControlButton.css";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const ControlButtons = (props) => {
  const StartButton = (
    <div className="btn btn-one btn-start" onClick={props.handleStart}>
      <PlayArrowIcon color="success" fontSize="large" />
    </div>
  );
  const ActiveButtons = (
    <div className="btn-grp">
      <div className="btn btn-one" onClick={props.handlePause}>
        {props.paused ? (
          <PlayArrowIcon color="success" fontSize="large" />
        ) : (
          <PauseIcon color="error" fontSize="large" />
        )}
      </div>
    </div>
  );

  return (
    <div
      className="Control-Buttons"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <div>{props.active ? ActiveButtons : StartButton}</div>
    </div>
  );
};

export default ControlButtons;
