import express from "express";
import Work from "../../models/Work.js";
import { verify_token } from "../../utils/jwt.js";

const router = express();

router.post("/add/work", verify_token, async (req, res) => {
  try {
    const user = new Work(req.body);
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/work/:uid", verify_token, async (req, res) => {
  try {
    const user = await Work.find({
      uid: req.params.uid,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// router.get("/login", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   const pass = await decrypt(user.password, req.body.password);
//   if (pass) {
//     res.status(200).json({ msg: "OK" });
//   }
//   res.status(404).json({ msg: "invalid credentials" });
// });

// router.get("/change/password", async (req, res) => {});

export default router;
