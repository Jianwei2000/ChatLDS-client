import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./styles/Layout.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const LogoutSwal = withReactContent(Swal);
  useEffect(() => {
    const token = localStorage.getItem("user");

    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    LogoutSwal.fire({
      title: "是否要登出?",

      icon: "question",
      showCancelButton: true,
      background: "#3d3d3dff",
      color: "#FFF",
      confirmButtonText: "是",
      cancelButtonText: "否",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      }
    });
  };

  return (
    <>
      <nav>
        <div className="navbar container">
          <h1>
            <a href="/" className="logo">
              <img src="favicon.ico" alt="logo" />
              <p>ChatLDS</p>
            </a>
          </h1>
          {user ? (
            <div className="short-profile">
              <img
                src={user.thumbnail ? user.thumbnail : "user.png"}
                alt="頭貼"
              />
              <p>Hi,{user.name}</p>
              <Link className="logout-btn" onClick={handleLogout}>
                登出
              </Link>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              登入
            </Link>
          )}
        </div>
      </nav>

      <Outlet context={{ user, setUser }} />

      <footer>
        <p>
          © 2025 ChatLDS Design & Development by
          <a href="https://jianwei2000.github.io/resume/" target="_blank">
            JianWei
          </a>
        </p>
      </footer>
    </>
  );
};

export default Layout;
