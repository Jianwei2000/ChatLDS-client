import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { io } from "socket.io-client";
import Loading from "../components/Loading";
import "../styles/ChatRoom.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";

const ChatRoom = () => {
  const { user } = useOutletContext();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [partner, setPartner] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const LeaveSwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(process.env.REACT_APP_SERVER_URL, {
        transports: ["websocket"],
      }); // 初始化 socket
    }

    const socket = socketRef.current;

    // 每次先清除舊的綁定，避免重複綁定
    socket.off("connect");
    socket.off("matched");
    socket.off("receive_message");
    socket.off("disconnect");

    // 等連線成功再 emit join_queue
    socket.on("connect", () => {
      console.log("🔌 已連線:", socket.id);
      socket.emit("join_queue", JSON.parse(token));
    });

    // 接收到配對成功
    socket.on("matched", ({ roomId, partner }) => {
      console.log("✅ 成功配對，房間ID:", roomId);
      setRoomId(roomId);
      setPartner(partner);
    });

    // 接收到訊息
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    //使用者斷線
    socket.on("disconnect", () => {
      console.log("❌ 已斷線");
    });

    // 離開時清除連線（或事件綁定）
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  //訊息通知
  useEffect(() => {
    if (roomId) {
      toast(
        <CustomToast thumbnail={partner?.thumbnail} name={partner?.name} />,
        {
          toastId: "joined-room", //  防止重複
          position: "top-center",
          autoClose: 5000,
        }
      );
    }
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const msgData = {
      roomId,
      content: input,
      sender: user,
    };

    socketRef.current.emit("send_message", msgData);
    setInput("");
    console.log(partner);
  };

  const handleLeave = () => {
    LeaveSwal.fire({
      title: "確定要離開嗎?",

      icon: undefined,
      showCancelButton: true,
      background: "#3d3d3dff",
      color: "#FFF",
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        socketRef.current.emit("leave_room", { roomId });
        navigate("/"); // 回首頁或其他頁面
      }
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {!roomId ? (
        <div className="loading-wrap">
          <div className="waiting">
            <Loading />
            <Link to="/">取消配對</Link>
          </div>
        </div>
      ) : (
        <div className="chatroom-wrap">
          <div className="avatar">
            <div className="img-box">
              <img src={partner?.thumbnail || "user.png"} alt="對方頭貼" />
            </div>
            <div className="img-box">
              <img src={user?.thumbnail || "user.png"} alt="自己頭貼" />
            </div>
          </div>
          <div className="room">
            <div className="content">
              {messages.map((i, index) => {
                const isMe = i.sender._id === user._id; // 判斷是否本人
                return (
                  <div
                    key={index}
                    className={`bubble-wrap ${isMe ? "me" : "partner"}`}
                  >
                    <div className="bubble">
                      <strong>{i.sender.name}</strong>
                      <p>{i.content}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit}>
              <button type="button" onClick={handleLeave}>
                離開
              </button>
              <input
                type="text"
                placeholder="輸入訊息"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit">送出</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
