import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CachedIcon from "@mui/icons-material/Cached";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import { FormControl, Select } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { removeToken } from "../../context/authSlice";

const Header = ({ home }) => {
  const username = useSelector((state) => state.auth.username);

  const [select, setSelect] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(removeToken());
  };

  return (
    <div className="flex items-center bg-slate-200 justify-around">
      <div onClick={() => navigate("/")} className="m-2 p-2 cursor-pointer">
        <h1 className="text-2xl">LogWork</h1>
      </div>
      {home ? (
        <div className="header__middle input flex items-center">
          <span className="border border-solid border-slate-400 p-[6px] relative left-2 rounded">
            Tracking for
          </span>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={select}
              onChange={(e) => setSelect(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>For</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      ) : null}
      {home ? (
        <div className="header__left flex justify-center">
          <div
            onClick={() => navigate("/")}
            className="refresh m-[2px] cursor-pointer hover:animate-pulse"
          >
            <CachedIcon /> <span className="text-black m-[1px]">•</span>
          </div>
          <div className="support m-[2px] cursor-pointer hover:animate-pulse">
            <LanguageIcon />
            Support <span className="text-black m-[1px]">•</span>
          </div>
          <div className="profile m-[2px] cursor-pointer hover:animate-pulse flex justify-center">
            <PersonIcon /> {username}
            <div>
              <button onClick={handleClick}>
                <ExpandMoreIcon />
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Account Setting</MenuItem>
                <MenuItem onClick={() => navigate("/update/email")}>
                  Change Email
                </MenuItem>
                <MenuItem onClick={() => navigate("/update/password")}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      ) : (
        <div className="header__left flex justify-center">
          <div className="support m-[2px] cursor-pointer hover:animate-pulse">
            <LanguageIcon />
            Support <span className="text-black m-[1px]">•</span>
          </div>
          <div
            onClick={() => navigate("/login")}
            className="profile m-[2px] cursor-pointer hover:animate-pulse"
          >
            Login <span className="text-black m-[1px]">•</span>
          </div>
          <div
            onClick={() => navigate("/signup")}
            className="profile m-[2px] cursor-pointer hover:animate-pulse"
          >
            Signup
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
