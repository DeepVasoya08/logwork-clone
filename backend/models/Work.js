import mongoose from "mongoose";

// const TimeSchema = new mongoose.Schema({
//   total_time: Number,
// });

const workSchema = new mongoose.Schema({
  _id: { type: String, required: true },
});

export default workSchema;
