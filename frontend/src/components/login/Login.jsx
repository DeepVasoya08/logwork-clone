import { Email, Lock, KeyboardArrowRight } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../../context/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      return alert("fill the missing fields");
    }
    await axios
      .post("http://localhost:9000/auth/login", { email, pass })
      .then(async (d) => {
        localStorage.setItem("token", JSON.stringify(d.headers.token));
        dispatch(setToken(d.headers.token));
        window.location.reload();
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  return (
    <>
      <Header home={false} />
      <div className="login__container flex justify-center items-center relative h-[90vh]">
        <Paper
          style={{ borderRadius: "0.75rem" }}
          className="flex flex-col items-center justify-center w-[30vw] relative -top-10 h-[65vh]"
          elevation={2}
        >
          <div className="login__header">
            <h1 className="text-2xl">Login</h1>
          </div>
          <hr className="w-[15vw] text-black m-1" />
          <div className="login__div">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "5px",
              }}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextField
                type={"email"}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ margin: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                autoFocus
              />

              <TextField
                type={"password"}
                placeholder="Pasword"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                style={{ margin: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
              <Button type="submit" variant="contained">
                Login
              </Button>
            </form>
          </div>
          <div className="flex justify-center items-center cursor-pointer m-2">
            <span className="text-blue-600 font-bold">Forget password?</span>
            <KeyboardArrowRight className="text-blue-600" />
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/signup")}
            >
              Register
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Login;
