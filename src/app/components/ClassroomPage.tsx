import { useState } from "react";
import { useParams, Link, useLocation } from "react-router";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  Phone,
  MessageSquare,
  Users,
  Share2,
  Hand,
  Settings,
  Maximize2,
  Copy,
  ExternalLink,
  Clock,
  MapPin,
  CheckCircle,
} from "lucide-react";

export function ClassroomPage() {
  const { meetingId } = useParams();
  const location = useLocation();
  const isTutor = location.pathname.startsWith("/tutor-dashboard");
  const isStudent = location.pathname.startsWith("/student");

  const [joined, setJoined] = useState(false);
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Nguyễn Thị Mai", text: "Chào các em, cô bắt đầu buổi học nhé!", time: "14:01", isTutor: true },
    { id: 2, sender: "Minh Anh", text: "Dạ vâng ạ!", time: "14:02", isTutor: false },
  ]);
  const [newChat, setNewChat] = useState("");

  const backPath = isTutor ? "/tutor-dashboard/schedule" : isStudent ? "/student/schedule" : "/dashboard";
  const roleName = isTutor ? "Gia sư" : "Học sinh";
  const userName = isTutor ? "Nguyễn Thị Mai" : "Nguyễn Minh Anh";
  const accentColor = isTutor ? "#2F80ED" : "#F2994A";

  const meetingInfo = {
    subject: "Toán - Đạo hàm và Ứng dụng",
    tutor: "Nguyễn Thị Mai",
    student: "Nguyễn Minh Anh",
    time: "14:00 - 16:00",
    date: "Thứ 4, 12/03/2026",
    format: meetingId?.includes("001") ? "Offline" : "Online",
    zoomLink: "https://zoom.us/j/1234567890",
    meetingId: meetingId || "EDU-2026-0312-001",
    password: "edunest2026",
    location: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendChat = () => {
    if (!newChat.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: chatMessages.length + 1,
        sender: userName,
        text: newChat,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
        isTutor: isTutor,
      },
    ]);
    setNewChat("");
  };

  // Pre-join lobby
  if (!joined) {
    return (
      <div className="min-h-screen bg-[#0f0f23] flex items-center justify-center p-6">
        <div className="max-w-[900px] w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to={backPath} className="text-gray-400 hover:text-white transition-colors" style={{ fontSize: "0.875rem" }}>
              ← Quay lại
            </Link>
            <span className="text-gray-500" style={{ fontSize: "0.8125rem" }}>
              Mã phòng: {meetingInfo.meetingId}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Video preview */}
            <div className="lg:col-span-3 bg-gray-800 rounded-2xl aspect-video flex flex-col items-center justify-center relative overflow-hidden">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center mb-4" style={{ fontSize: "2rem", fontWeight: 700, color: "white" }}>
                {userName.charAt(0)}
              </div>
              <p className="text-white mb-1" style={{ fontSize: "1.125rem", fontWeight: 600 }}>{userName}</p>
              <p className="text-gray-400" style={{ fontSize: "0.8125rem" }}>{roleName}</p>

              {/* Camera/Mic controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button
                  onClick={() => setVideoOn(!videoOn)}
                  className={`p-3 rounded-xl transition-colors ${videoOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white"}`}
                >
                  {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`p-3 rounded-xl transition-colors ${micOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white"}`}
                >
                  {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Meeting info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
                <h2 className="text-white mb-4" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
                  {meetingInfo.subject}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300" style={{ fontSize: "0.875rem" }}>
                    <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{meetingInfo.date} • {meetingInfo.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300" style={{ fontSize: "0.875rem" }}>
                    <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span>{isTutor ? `Học sinh: ${meetingInfo.student}` : `Gia sư: ${meetingInfo.tutor}`}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300" style={{ fontSize: "0.875rem" }}>
                    {meetingInfo.format === "Online" ? (
                      <><Monitor className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>Online (Zoom)</span></>
                    ) : (
                      <><MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" /><span>{meetingInfo.location}</span></>
                    )}
                  </div>
                </div>

                {/* Meeting link / details */}
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2.5">
                  <div>
                    <p className="text-gray-500 mb-1" style={{ fontSize: "0.75rem" }}>Link Zoom</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#2F80ED] truncate flex-1" style={{ fontSize: "0.8125rem" }}>{meetingInfo.zoomLink}</span>
                      <button onClick={() => handleCopy(meetingInfo.zoomLink)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                        {copied ? <CheckCircle className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 mb-0.5" style={{ fontSize: "0.75rem" }}>Mật khẩu</p>
                      <p className="text-gray-300" style={{ fontSize: "0.8125rem" }}>{meetingInfo.password}</p>
                    </div>
                    <button onClick={() => handleCopy(meetingInfo.password)} className="p-1.5 hover:bg-gray-700 rounded-lg transition-colors">
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Join buttons */}
              <button
                onClick={() => setJoined(true)}
                className="w-full py-3.5 bg-[#27AE60] text-white rounded-xl hover:bg-[#219a54] transition-colors shadow-lg shadow-[#27AE60]/20"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Vào phòng học
              </button>

              <a
                href={meetingInfo.zoomLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 border border-[#2F80ED] text-[#2F80ED] rounded-xl hover:bg-[#2F80ED]/10 transition-colors flex items-center justify-center gap-2"
                style={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                <ExternalLink className="w-4 h-4" />
                Mở bằng Zoom
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // In-call view
  return (
    <div className="h-screen bg-[#0f0f23] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 bg-gray-900/80 border-b border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>{meetingInfo.subject}</span>
          <span className="text-gray-500 hidden sm:inline" style={{ fontSize: "0.8125rem" }}>
            | {meetingInfo.meetingId}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-400 flex items-center gap-1.5" style={{ fontSize: "0.8125rem" }}>
            <Clock className="w-3.5 h-3.5" /> 14:23
          </span>
          <span className="text-gray-400 flex items-center gap-1.5" style={{ fontSize: "0.8125rem" }}>
            <Users className="w-3.5 h-3.5" /> 2
          </span>
        </div>
      </div>

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Video grid */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tutor video */}
            <div className="bg-gray-800 rounded-2xl relative flex items-center justify-center overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2F80ED] to-[#1a5fbb] flex items-center justify-center" style={{ fontSize: "1.75rem", fontWeight: 700, color: "white" }}>
                M
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg flex items-center gap-2">
                <span className="text-white" style={{ fontSize: "0.8125rem" }}>Nguyễn Thị Mai</span>
                <span className="text-gray-400" style={{ fontSize: "0.6875rem" }}>Gia sư</span>
              </div>
              {isTutor && (
                <div className="absolute top-3 right-3 bg-[#2F80ED]/80 px-2 py-0.5 rounded text-white" style={{ fontSize: "0.6875rem" }}>
                  Bạn
                </div>
              )}
            </div>

            {/* Student video */}
            <div className="bg-gray-800 rounded-2xl relative flex items-center justify-center overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#F2994A] to-[#e8882f] flex items-center justify-center" style={{ fontSize: "1.75rem", fontWeight: 700, color: "white" }}>
                A
              </div>
              <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-lg flex items-center gap-2">
                <span className="text-white" style={{ fontSize: "0.8125rem" }}>Nguyễn Minh Anh</span>
                <span className="text-gray-400" style={{ fontSize: "0.6875rem" }}>Học sinh</span>
              </div>
              {isStudent && (
                <div className="absolute top-3 right-3 bg-[#F2994A]/80 px-2 py-0.5 rounded text-white" style={{ fontSize: "0.6875rem" }}>
                  Bạn
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Chat panel */}
        {chatOpen && (
          <div className="w-[320px] bg-gray-900 border-l border-gray-800 flex flex-col flex-shrink-0">
            <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
              <h3 className="text-white" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Chat trong lớp</h3>
              <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
                <span style={{ fontSize: "1.25rem" }}>×</span>
              </button>
            </div>
            <div className="flex-1 overflow-auto px-4 py-3 space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`${msg.isTutor ? "text-[#2F80ED]" : "text-[#F2994A]"}`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      {msg.sender}
                    </span>
                    <span className="text-gray-600" style={{ fontSize: "0.6875rem" }}>{msg.time}</span>
                  </div>
                  <p className="text-gray-300" style={{ fontSize: "0.8125rem" }}>{msg.text}</p>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newChat}
                  onChange={(e) => setNewChat(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-gray-600"
                  style={{ fontSize: "0.8125rem" }}
                />
                <button onClick={handleSendChat} className="px-3 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4]">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between px-5 py-4 bg-gray-900/80 border-t border-gray-800 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 hidden sm:inline" style={{ fontSize: "0.8125rem" }}>
            {meetingInfo.time}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMicOn(!micOn)}
            className={`p-3 rounded-xl transition-colors ${micOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white"}`}
            title={micOn ? "Tắt mic" : "Bật mic"}
          >
            {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setVideoOn(!videoOn)}
            className={`p-3 rounded-xl transition-colors ${videoOn ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-red-500 text-white"}`}
            title={videoOn ? "Tắt camera" : "Bật camera"}
          >
            {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors hidden sm:flex" title="Chia sẻ màn hình">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors hidden sm:flex" title="Giơ tay">
            <Hand className="w-5 h-5" />
          </button>
          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`p-3 rounded-xl transition-colors ${chatOpen ? "bg-[#2F80ED] text-white" : "bg-gray-700 text-white hover:bg-gray-600"}`}
            title="Chat"
          >
            <MessageSquare className="w-5 h-5" />
          </button>
          <div className="w-px h-8 bg-gray-700 mx-1" />
          <Link
            to={backPath}
            className="px-5 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center gap-2"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            <Phone className="w-4 h-4 rotate-[135deg]" />
            <span className="hidden sm:inline">Rời phòng</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors hidden sm:flex" title="Cài đặt">
            <Settings className="w-5 h-5" />
          </button>
          <button className="p-3 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors hidden sm:flex" title="Toàn màn hình">
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
