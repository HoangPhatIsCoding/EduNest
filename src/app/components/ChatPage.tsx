import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  GraduationCap,
  Paperclip,
  Search,
  Smile,
  Image as ImageIcon,
} from "lucide-react";
import { conversations } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ChatPage() {
  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(activeConv.messages);
  const [showConvList, setShowConvList] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
        sender: "parent",
        text: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");
  };

  const selectConv = (conv: typeof conversations[0]) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setShowConvList(false);
  };

  const filteredConversations = conversations.filter((c) =>
    c.tutorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top bar */}
      <div className="bg-white border-b border-border px-5 py-3 flex items-center gap-3 flex-shrink-0">
        <Link
          to="/dashboard"
          className="flex items-center gap-2 text-gray-500 hover:text-[#2F80ED] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[#2F80ED]" />
          <span
            className="text-[#2F80ED]"
            style={{ fontSize: "1.125rem", fontWeight: 700 }}
          >
            EduNest
          </span>
        </Link>
        <span
          className="text-gray-400 ml-1"
          style={{ fontSize: "0.875rem" }}
        >
          / Tin nhắn
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside
          className={`${
            showConvList ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-[360px] bg-white border-r border-border flex-shrink-0`}
        >
          {/* Header + search */}
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h2
                className="text-gray-900"
                style={{ fontSize: "1.25rem", fontWeight: 700 }}
              >
                Hội thoại
              </h2>
              <span
                className="bg-[#2F80ED] text-white rounded-full px-2.5 py-0.5"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {conversations.reduce((sum, c) => sum + c.unread, 0)} mới
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm hội thoại..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED]/20 transition-all"
                style={{ fontSize: "0.8125rem" }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConv(conv)}
                className={`w-full flex items-center gap-3.5 px-4 py-4 hover:bg-gray-50 transition-colors text-left ${
                  activeConv.id === conv.id
                    ? "bg-[#2F80ED]/5 border-l-3 border-l-[#2F80ED]"
                    : "border-l-3 border-l-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <ImageWithFallback
                    src={conv.tutorAvatar}
                    alt={conv.tutorName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {/* Online indicator */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#27AE60] border-2 border-white rounded-full" />
                  {conv.unread > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                      style={{ fontSize: "0.6875rem" }}
                    >
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p
                      className={`truncate ${
                        conv.unread > 0 ? "text-gray-900" : "text-gray-700"
                      }`}
                      style={{
                        fontWeight: conv.unread > 0 ? 600 : 400,
                        fontSize: "0.9375rem",
                      }}
                    >
                      {conv.tutorName}
                    </p>
                    <span
                      className="text-gray-400 flex-shrink-0 ml-2"
                      style={{ fontSize: "0.75rem" }}
                    >
                      {conv.time}
                    </span>
                  </div>
                  <p
                    className={`truncate ${
                      conv.unread > 0 ? "text-gray-700" : "text-gray-400"
                    }`}
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: conv.unread > 0 ? 500 : 400,
                    }}
                  >
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}

            {filteredConversations.length === 0 && (
              <div className="p-8 text-center text-gray-400" style={{ fontSize: "0.875rem" }}>
                Không tìm thấy hội thoại
              </div>
            )}
          </div>
        </aside>

        {/* Chat window */}
        <div
          className={`${
            showConvList ? "hidden" : "flex"
          } md:flex flex-col flex-1 bg-[#F8FAFC]`}
        >
          {/* Chat header */}
          <div className="bg-white border-b border-border px-5 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden"
                onClick={() => setShowConvList(true)}
              >
                <ArrowLeft className="w-5 h-5 text-gray-500" />
              </button>
              <div className="relative">
                <ImageWithFallback
                  src={activeConv.tutorAvatar}
                  alt={activeConv.tutorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
              </div>
              <div>
                <p
                  className="text-gray-900"
                  style={{ fontWeight: 600, fontSize: "0.9375rem" }}
                >
                  {activeConv.tutorName}
                </p>
                <p
                  className="text-[#27AE60] flex items-center gap-1"
                  style={{ fontSize: "0.75rem" }}
                >
                  <span className="w-1.5 h-1.5 bg-[#27AE60] rounded-full inline-block" />
                  Đang hoạt động
                </p>
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
            {/* Date divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span
                className="text-gray-400 flex-shrink-0"
                style={{ fontSize: "0.75rem" }}
              >
                Hôm nay
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {messages.map((msg, index) => {
              const isParent = msg.sender === "parent";
              const showAvatar =
                !isParent &&
                (index === 0 || messages[index - 1]?.sender !== "tutor");
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${
                    isParent ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isParent && (
                    <div className="flex-shrink-0 w-8">
                      {showAvatar ? (
                        <ImageWithFallback
                          src={activeConv.tutorAvatar}
                          alt={activeConv.tutorName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : null}
                    </div>
                  )}
                  <div
                    className={`max-w-[65%] px-4 py-3 ${
                      isParent
                        ? "bg-[#2F80ED] text-white rounded-2xl rounded-br-lg"
                        : "bg-white text-gray-700 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                    }`}
                    style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-1 ${
                        isParent ? "text-blue-200" : "text-gray-400"
                      }`}
                      style={{ fontSize: "0.6875rem" }}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="bg-white border-t border-border px-5 py-4 flex-shrink-0">
            <div className="flex items-end gap-3">
              {/* Action buttons */}
              <div className="flex items-center gap-1 pb-1">
                <button
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Đính kèm tệp"
                >
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  title="Gửi hình ảnh"
                >
                  <ImageIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Text input */}
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Nhập tin nhắn..."
                  className="w-full pl-4 pr-12 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Biểu tượng cảm xúc"
                >
                  <Smile className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Send button */}
              <button
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="p-3 bg-[#2F80ED] text-white rounded-2xl hover:bg-[#2563d4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-[#2F80ED]/20 flex-shrink-0"
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
