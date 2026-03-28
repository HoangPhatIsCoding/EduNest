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
import { TutorSidebar } from "./TutorSidebar";

const parentConversations = [
  {
    id: 1,
    parentName: "Phụ huynh Minh Anh",
    studentName: "Nguyễn Minh Anh",
    subject: "Toán",
    initial: "A",
    lastMessage: "Dạ cảm ơn cô, em sẽ nhắc bé làm bài ạ.",
    time: "10:30",
    unread: 1,
    online: true,
    messages: [
      { id: 1, sender: "parent", text: "Chào cô Mai, hôm nay bé Anh có làm bài tốt không ạ?", time: "09:00" },
      { id: 2, sender: "tutor", text: "Chào chị! Hôm nay bé làm bài khá tốt, đặc biệt phần đạo hàm đã tiến bộ rõ rệt ạ.", time: "09:15" },
      { id: 3, sender: "tutor", text: "Em có giao thêm 5 bài tập về nhà cho bé, chị nhắc bé làm trước buổi học sau nhé.", time: "09:16" },
      { id: 4, sender: "parent", text: "Dạ cảm ơn cô, em sẽ nhắc bé làm bài ạ.", time: "10:30" },
    ],
  },
  {
    id: 2,
    parentName: "Phụ huynh Bảo Ngọc",
    studentName: "Trần Bảo Ngọc",
    subject: "Lý",
    initial: "N",
    lastMessage: "Tuần sau bé có thể học bù được không cô?",
    time: "Hôm qua",
    unread: 2,
    online: false,
    messages: [
      { id: 1, sender: "parent", text: "Cô ơi, tuần sau bé Ngọc bị ốm nên xin nghỉ thứ 4 ạ.", time: "14:00" },
      { id: 2, sender: "tutor", text: "Dạ vâng, chúc bé mau khỏe ạ! Chị muốn học bù vào ngày nào không ạ?", time: "14:30" },
      { id: 3, sender: "parent", text: "Tuần sau bé có thể học bù được không cô?", time: "15:00" },
    ],
  },
  {
    id: 3,
    parentName: "Phụ huynh Hoàng Nam",
    studentName: "Lê Hoàng Nam",
    subject: "Toán",
    initial: "N",
    lastMessage: "Cô cho em xem điểm bài kiểm tra của bé với ạ.",
    time: "Thứ 2",
    unread: 0,
    online: true,
    messages: [
      { id: 1, sender: "parent", text: "Cô cho em xem điểm bài kiểm tra của bé với ạ.", time: "20:00" },
      { id: 2, sender: "tutor", text: "Bé Nam đạt 9 điểm bài kiểm tra tuần này, rất xuất sắc chị ạ! 🎉", time: "20:15" },
    ],
  },
  {
    id: 4,
    parentName: "Phụ huynh Thu Hà",
    studentName: "Phạm Thu Hà",
    subject: "Tiếng Anh",
    initial: "H",
    lastMessage: "Em gửi cô tài liệu IELTS bé cần ôn ạ.",
    time: "Thứ 2",
    unread: 0,
    online: false,
    messages: [
      { id: 1, sender: "tutor", text: "Chào chị, bé Hà cần ôn thêm phần Writing Task 2 ạ. Em sẽ gửi thêm tài liệu.", time: "16:00" },
      { id: 2, sender: "parent", text: "Em gửi cô tài liệu IELTS bé cần ôn ạ.", time: "16:30" },
    ],
  },
];

export function TutorChatPage() {
  const [activeConv, setActiveConv] = useState(parentConversations[0]);
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
        sender: "tutor",
        text: newMessage,
        time: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setNewMessage("");
  };

  const selectConv = (conv: (typeof parentConversations)[0]) => {
    setActiveConv(conv);
    setMessages(conv.messages);
    setShowConvList(false);
  };

  const filteredConversations = parentConversations.filter((c) =>
    c.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside
          className={`${
            showConvList ? "flex" : "hidden"
          } md:flex flex-col w-full md:w-[340px] bg-white border-r border-border flex-shrink-0`}
        >
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h2
                className="text-gray-900"
                style={{ fontSize: "1.125rem", fontWeight: 700 }}
              >
                Tin nhắn
              </h2>
              <span
                className="bg-[#2F80ED] text-white rounded-full px-2.5 py-0.5"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {parentConversations.reduce((sum, c) => sum + c.unread, 0)} mới
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm phụ huynh, học sinh..."
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
                className={`w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left ${
                  activeConv.id === conv.id
                    ? "bg-[#2F80ED]/5 border-l-3 border-l-[#2F80ED]"
                    : "border-l-3 border-l-transparent"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]"
                    style={{ fontWeight: 600, fontSize: "0.875rem" }}
                  >
                    {conv.initial}
                  </div>
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
                  )}
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
                      className={`truncate ${conv.unread > 0 ? "text-gray-900" : "text-gray-700"}`}
                      style={{ fontWeight: conv.unread > 0 ? 600 : 400, fontSize: "0.875rem" }}
                    >
                      {conv.studentName}
                    </p>
                    <span className="text-gray-400 flex-shrink-0 ml-2" style={{ fontSize: "0.75rem" }}>
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-gray-400 truncate" style={{ fontSize: "0.75rem" }}>
                    {conv.subject} • {conv.parentName}
                  </p>
                  <p
                    className={`truncate mt-0.5 ${conv.unread > 0 ? "text-gray-700" : "text-gray-400"}`}
                    style={{ fontSize: "0.8125rem", fontWeight: conv.unread > 0 ? 500 : 400 }}
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
          className={`${showConvList ? "hidden" : "flex"} md:flex flex-col flex-1 bg-[#F8FAFC]`}
        >
          {/* Chat header */}
          <div className="bg-white border-b border-border px-5 py-3.5 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-1"
                onClick={() => setShowConvList(true)}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]"
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  {activeConv.initial}
                </div>
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                  {activeConv.studentName}
                </p>
                <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                  {activeConv.parentName} • {activeConv.subject}
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
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400 flex-shrink-0" style={{ fontSize: "0.75rem" }}>
                Hôm nay
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {messages.map((msg, index) => {
              const isTutor = msg.sender === "tutor";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isTutor ? "justify-end" : "justify-start"}`}
                >
                  {!isTutor && (
                    <div className="flex-shrink-0 w-8">
                      {index === 0 || messages[index - 1]?.sender !== "parent" ? (
                        <div
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600"
                          style={{ fontSize: "0.6875rem", fontWeight: 600 }}
                        >
                          {activeConv.initial}
                        </div>
                      ) : null}
                    </div>
                  )}
                  <div
                    className={`max-w-[65%] px-4 py-3 ${
                      isTutor
                        ? "bg-[#2F80ED] text-white rounded-2xl rounded-br-lg"
                        : "bg-white text-gray-700 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                    }`}
                    style={{ fontSize: "0.9375rem", lineHeight: 1.5 }}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-1 ${isTutor ? "text-blue-200" : "text-gray-400"}`}
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
              <div className="flex items-center gap-1 pb-1">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Đính kèm tệp">
                  <Paperclip className="w-5 h-5 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors" title="Gửi hình ảnh">
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
