import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Context } from "./context/Context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Create from "./pages/posts/Create";
import Show from "./pages/posts/Show";
import Register from "./pages/Register";
import Settings from "./pages/Settings";

function App() {

  const { user } = useContext(Context);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/create" element={user ? <Create /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/posts/:id" element={<Show />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
