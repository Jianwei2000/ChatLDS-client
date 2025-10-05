import { Link } from "react-router-dom";
import HALO from "vanta/dist/vanta.halo.min";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import "../styles/Home.scss";

const Home = () => {
  const vantaRef = useRef(null);
  useEffect(() => {
    const effect = HALO({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 100.0,
      minWidth: 100.0,
      xOffset: 0.13,
      yOffset: 0,
      size: 2.5,
      backgroundColor: "#161212",
      // baseColor: "#6559a2",
    });

    return () => {
      // 清除 Vanta 特效
      if (effect) effect.destroy();
    };
  }, [vantaRef.current]);

  return (
    <>
      <div ref={vantaRef} className="vanta"></div>
      <div className="home container">
        <div className="img-wrap">
          <div className="bubble1">週末有空嗎</div>
          <div className="bubble2">約晚上怎麼樣</div>
          <div className="bubble3">附近有一家酒吧不錯</div>
          <div className="avatar">
            <img src="woman.jpg" alt="女" />
          </div>
          <div className="avatar">
            <img src="man.jpg" alt="男" />
          </div>
        </div>

        <div className="info-wrap">
          <h2>
            ChatLDS <span>喇低賽</span>
          </h2>
          <h3>與在線用戶隨機配對，1對1即時聊天。</h3>
          <Link to="/chatroom">開始配對</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
