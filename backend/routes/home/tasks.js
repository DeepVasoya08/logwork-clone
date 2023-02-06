import express from "express";
import mongoose from "mongoose";

import User from "../../models/User.js";
import workSchema from "../../models/Work.js";
import { encrypt, decrypt } from "../../utils/enctypion.js";
import { sign_token, verify_token } from "../../utils/jwt.js";

const router = express();

router.post("/task", verify_token, async (req, res) => {
  try {
    const date = new Date().toISOString().substring(0, 10);
    const userData = req.data;
    const data = { ...req.body };
    // console.log(req.body);

    workSchema.add({
      [date]: mongoose.Schema.Types.Mixed,
    });
    const Work = mongoose.model("Work", workSchema);

    await Work.findOneAndUpdate(
      { _id: userData.data._id },
      { $set: { [date]: data } },
      { upsert: true, returnOriginal: false }
    );

    // const isExists = await Work.findOne({
    //   _id: userData.data._id,
    // });

    // if (isExists) {
    //   await Work.updateOne(
    //     { _id: userData.data._id },
    //     { $set: { [date]: data } },
    //     { upsert: true }
    //   );
    // } else {
    //   console.log("inside");
    //   await Work.create({ _id: userData.data._id, [date]: data });
    // }

    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/worklist", verify_token, async (req, res) => {
  try {
    const userData = req.data;
    const Work = mongoose.model("Work", workSchema);
    const workList = await Work.findOne({ _id: userData.data._id });
    // const workList = await Work.find();
    res.status(200).json(workList === null ? [] : [workList]);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

export default router;
