import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/AuthForm.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    pwcheck: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.pwcheck) {
      alert("密碼不一致");
      return;
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      if (res) {
        alert("註冊成功");
        window.location.href = "/";
      } else {
        alert("註冊失敗");
      }
    } catch (e) {
      console.log(e);
      alert(e.response.data);
    }
  };
  return (
    <div className="auth-wrap">
      <Link to="/login" className="go-back">
        返回
      </Link>
      <form className="auth-form" onSubmit={handleRegister}>
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
          <h2>建立帳號</h2>
        </div>
        <div className="auth-input">
          <input
            type="text"
            placeholder="輸入暱稱"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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
            minLength={8}
            required
          />
        </div>
        <div className="auth-input">
          <input
            type="password"
            placeholder="確認密碼"
            name="pwcheck"
            value={formData.pwcheck}
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>

        <button>註冊</button>
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

export default Register;
