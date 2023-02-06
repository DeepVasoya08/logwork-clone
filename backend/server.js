import * as dotenv from "dotenv";
import expess from "express";
import mongoose from "mongoose";
import auth from "./routes/auth/auth.js";
import user from "./routes/user/user.js";
import tasks from "./routes/home/tasks.js";
import cors from "cors";
import Pusher from "pusher";

dotenv.config();

const app = expess();
const PORT = process.env.PORT | 9000;

app.use(expess.json());
app.use(cors());

const pusher = new Pusher({
  appId: "1546602",
  key: "683e41031fc87aba3ff7",
  secret: "df9978a3878830af622a",
  cluster: "ap2",
  useTLS: true,
});

mongoose.connection.once("open", () => {
  const workStream = mongoose.connection.collection("works").watch();

  workStream.on("change", (change) => {
    if (
      change.operationType == "insert" ||
      change.operationType == "modify" ||
      change.operationType == "update" ||
      change.operationType == "delete"
    ) {
      pusher.trigger("works", "work", { change: "post modified" });
    }
  });
});

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.uri,
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("connected to mongodb");
  }
);

app.get("/", (req, res) => {
  return res.status(200).json("running");
});

// app.use("/",);
app.use("/auth", auth);
app.use("/user", user);
app.use("/work", tasks);

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});
