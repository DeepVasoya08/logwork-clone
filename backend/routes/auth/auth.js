import express from "express";

import User from "../../models/User.js";
import { encrypt, decrypt } from "../../utils/enctypion.js";
import { sign_token } from "../../utils/jwt.js";

const router = express();

router.post("/signup", async (req, res) => {
  try {
    const hashedPass = await encrypt(req.body.pass);
    const user = new User({
      username: req.body.uname,
      email: req.body.email,
      password: hashedPass,
    });
    user.save();
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const pass = await decrypt(user.password, req.body.pass);
    if (pass) {
      const { password, ...rest } = user._doc;
      const token = sign_token(rest);
      res.setHeader("Access-Control-Expose-Headers", "token");
      res.setHeader("token", token);
      return res.status(200).json("OK");
    }
    res.status(404).json("invalid credentials");
  } catch (error) {
    res.status(500).json("User does not exists");
  }
});

router.get("/change/password", async (req, res) => {});

export default router;
