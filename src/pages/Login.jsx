import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const LoginSwal = withReactContent(Swal);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (res) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        window.location.href = "/";
      } else {
        LoginSwal.fire({
          icon: "error",
          title: "登入失敗",
        });
        
      }
    } catch (e) {
      console.log(e);
       LoginSwal.fire({
          icon: "error",
          title: "登入失敗",
          text: e.response.data,
        });
    }
  };
  return (
    <div className="auth-wrap">
      <Link to="/" className="go-back">
        返回
      </Link>
      <form className="auth-form" onSubmit={handleLogin}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div className="form-logo">
            <img src="favicon.ico" alt="logo" />
            <p>ChatLDS</p>
          </div>
          <h2>請先登入</h2>
        </div>

        <div className="auth-input">
          <input
            type="email"
            placeholder="輸入信箱"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-input">
          <input
            type="password"
            placeholder="輸入密碼"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button>登入</button>
        <p style={{ textAlign: "center" }}>OR</p>
        <Link
          to={`${process.env.REACT_APP_SERVER_URL}/google`}
          className="google-btn"
        >
          <img src="google.png" alt="google" />
          使用Google登入
        </Link>

        <Link to="/register" className="go-register">
          註冊帳號
        </Link>
      </form>
      <footer>
        <p>
          © 2025 ChatLDS Design & Development by
          <a href="https://jianwei2000.github.io/resume/" target="_blank">
            JianWei
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Login;
