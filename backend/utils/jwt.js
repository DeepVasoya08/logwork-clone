import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const sign_token = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.secret,
    { expiresIn: "7d" }
  );
};

const verify_token = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"].split(" ")[1];
    if (!token) {
      return res.status(404).json("Auth token required!");
    }
    const data = jwt.verify(token, process.env.secret);
    req.data = data;
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res
        .status(403)
        .json({ err: "Login session expired", msg: "Login again!" });
    }
    res.status(400).json({ msg: error.message });
  }
};

export { sign_token, verify_token };
