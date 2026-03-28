import { Link } from "react-router";
import { BookOpen, Clock, Heart, Video, MapPin } from "lucide-react";
import { upcomingSessions, conversations } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DashboardOverviewPage() {
  return (
    <>
      <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
        Xin chào, Phụ huynh! 👋
      </h1>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          to="/dashboard/manage"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors shadow-sm"
          style={{ fontSize: "0.875rem" }}
        >
          <BookOpen className="w-4 h-4" /> Quản lý việc học
        </Link>
        <Link
          to="/tutors"
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-border text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          style={{ fontSize: "0.875rem" }}
        >
          <Clock className="w-4 h-4" /> Tìm gia sư
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: BookOpen, label: "Buổi học tháng này", value: "12", color: "#2F80ED" },
          { icon: Clock, label: "Giờ học tích lũy", value: "48h", color: "#27AE60" },
          { icon: Heart, label: "Gia sư đã lưu", value: "3", color: "#EB5757" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + "15" }}>
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-gray-400" style={{ fontSize: "0.8125rem" }}>{stat.label}</p>
              <p className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming sessions */}
      <div className="bg-white rounded-xl border border-border mb-6">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Lịch học sắp tới</h2>
        </div>
        <div className="divide-y divide-border">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#2F80ED]/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#2F80ED]" />
                </div>
                <div>
                  <p className="text-gray-900" style={{ fontWeight: 500 }}>
                    {session.subject} - {session.tutorName}
                  </p>
                  <p className="text-gray-400" style={{ fontSize: "0.8125rem" }}>
                    {session.date} • {session.time}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full ${
                  session.format === "Online"
                    ? "bg-blue-50 text-[#2F80ED]"
                    : "bg-green-50 text-[#27AE60]"
                }`}
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                {session.format === "Online" ? (
                  <span className="flex items-center gap-1"><Video className="w-3 h-3" /> Online</span>
                ) : (
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Offline</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent messages */}
      <div className="bg-white rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Tin nhắn gần đây</h2>
          <Link to="/dashboard/messages" className="text-[#2F80ED]" style={{ fontSize: "0.875rem" }}>
            Xem tất cả
          </Link>
        </div>
        <div className="divide-y divide-border">
          {conversations.slice(0, 2).map((conv) => (
            <button
              key={conv.id}
              className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
            >
              <ImageWithFallback
                src={conv.tutorAvatar}
                alt={conv.tutorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-gray-900" style={{ fontWeight: 500, fontSize: "0.875rem" }}>{conv.tutorName}</p>
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{conv.time}</span>
                </div>
                <p className="text-gray-500 truncate" style={{ fontSize: "0.8125rem" }}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <span className="bg-[#2F80ED] text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0" style={{ fontSize: "0.6875rem" }}>
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
