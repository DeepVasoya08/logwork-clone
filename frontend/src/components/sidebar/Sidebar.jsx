import React from "react";
import {
  AccessTime,
  Dashboard,
  CalendarMonth,
  BarChart,
  Folder,
} from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="min-w-[300px] h-screen bg-slate-100">
      <ul>
        <li className="flex items-center m-3 cursor-pointer hover:animate-pulse">
          <Dashboard />
          <span>Dashboard</span>
        </li>
        <li className="flex items-center m-3 cursor-pointer hover:animate-pulse">
          <AccessTime />
          <span>Time tracker</span>
        </li>
        <li className="flex items-center m-3 cursor-pointer hover:animate-pulse">
          <CalendarMonth />
          <span>Timeline</span>
        </li>
        <li className="flex items-center m-3 cursor-pointer hover:animate-pulse">
          <BarChart />
          <span>Reports</span>
        </li>
        <li className="flex items-center m-3 cursor-pointer hover:animate-pulse">
          <Folder />
          <span>Downloads</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
