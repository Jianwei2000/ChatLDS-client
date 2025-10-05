import axios from "axios";
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/google/getUser`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      // 清除 token 後導向主頁或 dashboard
      window.history.replaceState({}, "", "/"); // 移除 URL 中的 token
      window.location.href = "/";
    } catch (e) {
      console.log(e);
    }
  };
  return <></>;
};

export default GoogleCallback;
