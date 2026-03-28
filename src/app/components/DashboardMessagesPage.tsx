import { Link } from "react-router";
import { conversations } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DashboardMessagesPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Tin nhắn</h1>
        <Link to="/chat" className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg" style={{ fontSize: "0.875rem" }}>
          Mở chat đầy đủ
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-border divide-y divide-border">
        {conversations.map((conv) => (
          <Link
            key={conv.id}
            to="/chat"
            className="flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
          >
            <ImageWithFallback src={conv.tutorAvatar} alt={conv.tutorName} className="w-11 h-11 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-gray-900" style={{ fontWeight: 500 }}>{conv.tutorName}</p>
                <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{conv.time}</span>
              </div>
              <p className="text-gray-500 truncate" style={{ fontSize: "0.8125rem" }}>{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && (
              <span className="bg-[#2F80ED] text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "0.6875rem" }}>{conv.unread}</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}
