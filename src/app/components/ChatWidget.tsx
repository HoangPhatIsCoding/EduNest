import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Paperclip, Minus } from "lucide-react";

const initialMessages = [
  { id: 1, sender: "tutor", text: "Chào chị! Em có thể giúp gì cho chị ạ?", time: "10:00" },
  { id: 2, sender: "parent", text: "Chào cô, em muốn hỏi về lịch học tuần sau ạ.", time: "10:02" },
  { id: 3, sender: "tutor", text: "Dạ, tuần sau em vẫn dạy thứ 3 và thứ 5 như bình thường ạ. Có thay đổi gì không chị?", time: "10:03" },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
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
        time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setNewMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div
          className="mb-4 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="bg-[#2F80ED] px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                M
              </div>
              <div>
                <p className="text-white" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                  Nguyễn Thị Mai
                </p>
                <p className="text-blue-200 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                  <span className="w-2 h-2 bg-[#27AE60] rounded-full inline-block" />
                  Đang hoạt động
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-auto px-4 py-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((msg) => {
              const isParent = msg.sender === "parent";
              return (
                <div
                  key={msg.id}
                  className={`flex ${isParent ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] px-3.5 py-2.5 ${
                      isParent
                        ? "bg-[#2F80ED] text-white rounded-2xl rounded-br-lg"
                        : "bg-white text-gray-700 rounded-2xl rounded-bl-lg border border-gray-100 shadow-sm"
                    }`}
                    style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-0.5 ${isParent ? "text-blue-200" : "text-gray-400"}`}
                      style={{ fontSize: "0.625rem" }}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-border flex items-center gap-2 flex-shrink-0">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
              <Paperclip className="w-4.5 h-4.5" />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED]/20 transition-all"
              style={{ fontSize: "0.8125rem" }}
            />
            <button
              onClick={handleSend}
              disabled={!newMessage.trim()}
              className="p-2.5 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 ${
          isOpen
            ? "bg-gray-600 hover:bg-gray-700"
            : "bg-[#2F80ED] hover:bg-[#2563d4]"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6 text-white" />
            {/* Unread badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center" style={{ fontSize: "0.6875rem" }}>
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
}
