import { useState, useRef, useEffect } from "react";
import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Search,
  Smile,
  Image as ImageIcon,
} from "lucide-react";
import { StudentSidebar } from "./StudentSidebar";

const tutorConversations = [
  {
    id: 1,
    tutorName: "Nguyễn Thị Mai",
    subject: "Toán",
    initial: "M",
    lastMessage: "Em làm xong bài tập 3, 4, 5 rồi gửi cô nhé.",
    time: "10:30",
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: "student", text: "Cô ơi, em không hiểu bài đạo hàm hàm hợp ạ.", time: "09:00" },
      { id: 2, sender: "tutor", text: "Em xem lại phần công thức cô ghi trên bảng nhé. Đạo hàm hàm hợp: [f(g(x))]' = f'(g(x)).g'(x)", time: "09:15" },
      { id: 3, sender: "tutor", text: "Em làm xong bài tập 3, 4, 5 rồi gửi cô nhé.", time: "10:30" },
    ],
  },
  {
    id: 2,
    tutorName: "Trần Văn Hùng",
    subject: "Tiếng Anh",
    initial: "H",
    lastMessage: "Great job on the essay! Keep it up!",
    time: "Hôm qua",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "student", text: "Thầy ơi, em gửi bài essay ạ.", time: "14:00" },
      { id: 2, sender: "tutor", text: "Great job on the essay! Keep it up!", time: "15:00" },
    ],
  },
];

export function StudentChatPage() {
  const [activeConv, setActiveConv] = useState(tutorConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(activeConv.messages);
  const [showConvList, setShowConvList] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "student",
        text: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  const selectConv = (conv: (typeof tutorConversations)[0]) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setShowConvList(false);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside
          className={`${showConvList ? "flex" : "hidden"} md:flex flex-col w-full md:w-[340px] bg-white border-r border-border flex-shrink-0`}
        >
          <div className="p-4 border-b border-border space-y-3">
            <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 700 }}>Tin nhắn</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm gia sư..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                style={{ fontSize: "0.8125rem" }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {tutorConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConv(conv)}
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left ${
                  activeConv.id === conv.id
                    ? "bg-[#F2994A]/5 border-l-3 border-l-[#F2994A]"
                    : "border-l-3 border-l-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-full bg-[#F2994A]/10 flex items-center justify-center text-[#F2994A]"
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    {conv.initial}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-gray-900 truncate" style={{ fontWeight: conv.unread > 0 ? 600 : 400, fontSize: "0.875rem" }}>
                      {conv.tutorName}
                    </p>
                    <span className="text-gray-400 flex-shrink-0 ml-2" style={{ fontSize: "0.75rem" }}>{conv.time}</span>
                  </div>
                  <p className="text-gray-400 truncate" style={{ fontSize: "0.75rem" }}>{conv.subject}</p>
                  <p className="text-gray-400 truncate mt-0.5" style={{ fontSize: "0.8125rem" }}>{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="bg-[#F2994A] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ fontSize: "0.6875rem" }}>
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat window */}
        <div className={`${showConvList ? "hidden" : "flex"} md:flex flex-col flex-1 bg-[#F8FAFC]`}>
          {/* Header */}
          <div className="bg-white border-b border-border px-5 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button className="md:hidden p-1" onClick={() => setShowConvList(true)}>
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#F2994A]/10 flex items-center justify-center text-[#F2994A]" style={{ fontWeight: 600 }}>
                  {activeConv.initial}
                </div>
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{activeConv.tutorName}</p>
                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>{activeConv.subject} • {activeConv.online ? "Đang hoạt động" : "Offline"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Phone className="w-[18px] h-[18px] text-gray-500" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Video className="w-[18px] h-[18px] text-gray-500" />
              </button>
              <button className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <MoreVertical className="w-[18px] h-[18px] text-gray-500" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-5 py-6 space-y-3">
            {messages.map((msg, index) => {
              const isStudent = msg.sender === "student";
              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isStudent ? "justify-end" : "justify-start"}`}>
                  {!isStudent && (
                    <div className="flex-shrink-0 w-8">
                      {index === 0 || messages[index - 1]?.sender !== "tutor" ? (
                        <div className="w-8 h-8 rounded-full bg-[#F2994A]/10 flex items-center justify-center text-[#F2994A]" style={{ fontSize: "0.6875rem", fontWeight: 600 }}>
                          {activeConv.initial}
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div
                    className={`max-w-[65%] px-4 py-3 ${
                      isStudent
                        ? "bg-[#F2994A] text-white rounded-2xl rounded-br-lg"
                        : "bg-white text-gray-700 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                    }`}
                    style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1 ${isStudent ? "text-orange-200" : "text-gray-400"}`} style={{ fontSize: "0.6875rem" }}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-border px-5 py-4 flex-shrink-0">
            <div className="flex items-end gap-3">
              <div className="flex items-center gap-1 pb-1">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nhập tin nhắn..."
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1">
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="p-3 bg-[#F2994A] text-white rounded-2xl hover:bg-[#e8882f] transition-colors disabled:opacity-40 shadow-sm shadow-[#F2994A]/20 flex-shrink-0"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
