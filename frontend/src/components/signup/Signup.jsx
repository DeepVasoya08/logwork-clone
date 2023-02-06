import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Email, Lock, Person } from "@mui/icons-material";
import { Button, InputAdornment, Paper, TextField } from "@mui/material";
import axios from "axios";
import Header from "../header/Header";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uname || !email || !pass || !cpass) {
      return alert("fill the missing fields!");
    }
    if (!pass === cpass) {
      return alert("password doesn't match!");
    }
    await axios
      .post("http://localhost:9000/auth/signup", { uname, email, pass })
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e.response.data);
      });
  };

  return (
    <>
      <Header home={false} />
      <div className="signup__container flex justify-center items-center relative h-[90vh]">
        <Paper
          style={{ borderRadius: "0.75rem" }}
          className="flex flex-col items-center justify-center w-[30vw] relative -top-10 h-[65vh]"
          elevation={2}
        >
          <div className="signup__header">
            <h1 className="text-2xl">Signup</h1>
          </div>
          <hr className="w-[15vw] text-black m-1" />
          <div className="signup__div">
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
                type={"text"}
                placeholder="Username"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                style={{ margin: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                autoFocus
              />
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
                autoFocus
              />
              <TextField
                type={"password"}
                placeholder="Confirm Pasword"
                value={cpass}
                onChange={(e) => setcPass(e.target.value)}
                style={{ margin: "10px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                autoFocus
              />
              <Button type="submit" variant="contained">
                Signup
              </Button>
            </form>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
};

export default Signup;
