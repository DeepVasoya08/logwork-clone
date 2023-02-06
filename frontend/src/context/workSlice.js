import { StarRateTwoTone } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

export const workSlice = createSlice({
  name: "work",
  initialState: {
    work: {},
    continueTask: [],
  },
  reducers: {
    setWork: (state, action) => {
      const keys = Object.keys(state.work);
      const date_ = new Date().toISOString().substring(0, 10);

      // if today's date is not present
      if (!keys.includes(date_)) {
        const name = action.payload[1].name;
        const time = action.payload[1].time;
        const total_time = action.payload[0].total_time;
        state.work[date_] = [{ total_time }, { [name]: time }];
        return;
      }
      // if date is present
      for (let date in state.work) {
        if (date === date_) {
          let tasks = state.work[date];
          tasks[0].total_time = action.payload[0].total_time;
          const task = tasks[1];
          if (action.payload[1].name in task) {
            // if task is already running or same task continues after pause
            task[action.payload[1].name] = action.payload[1].time;
          } else {
            // if task is newly assigned
            task[action.payload[1].name] = action.payload[1].time;
          }
        }
      }
    },
    setContinueTask: (state, action) => {
      state.continueTask = action.payload;
    },
  },
});
export const { setWork, setContinueTask } = workSlice.actions;

export default workSlice.reducer;
