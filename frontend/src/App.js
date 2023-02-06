import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

import Home from "./components/home/Home";
import Signup from "./components/signup/Signup";
import Login from "./components//login/Login";
import { setUsername } from "./context/authSlice";

function App() {
  const token = useSelector((state) => state.auth.token);
  let expired;
  const dispatch = useDispatch();
  if (token) {
    const decodedToken = jwt_decode(token);
    dispatch(setUsername(decodedToken.data.username));
    expired = new Date(decodedToken.exp * 1000) < new Date();
  }

  return (
    <div className="App" style={{ backgroundColor: "whitesmoke" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={token && !expired ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={token && !expired ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={token && !expired ? <Navigate to="/" /> : <Signup />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
