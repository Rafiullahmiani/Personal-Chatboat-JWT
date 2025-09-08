import axios from "axios";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Chatboat.css";
const personalInfo = {
  name: "Rafiullah",
  profession: "Full Stack Developer",
  edjucation: "BS Computer Science from gomal university dera ismail khan",
  location: "Tank, Pakistan",
  skills: ["React", "Node.js", "MongoDB", "Express"],
  email: "rafi@example.com",
  experience: "Front End Developer ",
  about:
    "I am a passionate MERN Stack Developer who loves building modern web applications.",
  how: "I am fine.",
};
const Dashboard = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function getDashboard() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          localStorage.removeItem("token");
          navigate("/");
          return;
        }

        const res = await axios.get("http://localhost:5050/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("dashboard data:", res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error("Networking Eroor:", err.message);
        }
      }
    }
    getDashboard();
  }, []);

  const askQuestion = (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    // Add user question to chat
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    // Simple Q&A system
    let botReply = "Sorry, I don't have information about that.";

    const q = question.toLowerCase();

    if (q.includes("name") || q.includes("who"))
      botReply = `My name is ${personalInfo.name}.`;
    else if (q.includes("profession") || q.includes("work"))
      botReply = `I am a ${personalInfo.profession}.`;
    else if (q.includes("edjucation"))
      botReply = `My Edjucation are ${personalInfo.edjucation}.`;
    else if (q.includes("location") || q.includes("live"))
      botReply = `I live in ${personalInfo.location}.`;
    else if (q.includes("skills"))
      botReply = `My skills are: ${personalInfo.skills.join(", ")}.`;
    else if (q.includes("email"))
      botReply = `You can contact me at ${personalInfo.email}.`;
    else if (q.includes("experience"))
      botReply = `Experience of  ${personalInfo.experience}.`;
    else if (q.includes("about") || q.includes("doing"))
      botReply = personalInfo.about;
    else if (q.includes("how")) botReply = personalInfo.how;

    // Add bot reply to chat
    // Type define karein

    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setQuestion("");
  };

  return (
    
      <div className="chatbot-container">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={msg.sender === "user" ? "user-message" : "bot-message"}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <form className="chatbot-form" onSubmit={askQuestion}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about me..."
            className="chatbot-input"
          />
          <button className="chatbot-button" type="submit">
            Ask
          </button>
        </form>
      </div>
    
  );
};

export default Dashboard;
