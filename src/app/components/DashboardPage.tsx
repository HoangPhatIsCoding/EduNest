import { useState } from "react";
import { Link } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  MessageCircle,
  User,
  BookOpen,
  Clock,
  Video,
  MapPin,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { upcomingSessions, conversations, tutors } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const sidebarItems = [
  { key: "overview", icon: LayoutDashboard, label: "Tổng quan" },
  { key: "schedule", icon: Calendar, label: "Lịch học" },
  { key: "saved", icon: Heart, label: "Gia sư đã lưu" },
  { key: "messages", icon: MessageCircle, label: "Tin nhắn" },
  { key: "profile", icon: User, label: "Hồ sơ" },
];

export function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const savedTutors = tutors.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-border flex-shrink-0">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-[#2F80ED]" />
            <span className="text-[#2F80ED]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>EduNest</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left ${
                activeSection === item.key
                  ? "bg-[#2F80ED]/10 text-[#2F80ED]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.key === "messages" && (
                <span className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "0.6875rem" }}>
                  2
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2F80ED] rounded-full flex items-center justify-center text-white" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
              PH
            </div>
            <div>
              <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Phụ huynh</p>
              <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>parent@edunest.vn</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-white border-b border-border p-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 ${
                  activeSection === item.key
                    ? "bg-[#2F80ED] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                style={{ fontSize: "0.8125rem" }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8 max-w-[1100px]">
          {/* Overview */}
          {activeSection === "overview" && (
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
                  <GraduationCap className="w-4 h-4" /> Tìm gia sư
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
                  <button onClick={() => setActiveSection("messages")} className="text-[#2F80ED]" style={{ fontSize: "0.875rem" }}>
                    Xem tất cả
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {conversations.slice(0, 2).map((conv) => (
                    <button
                      key={conv.id}
                      className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors text-left"
                      onClick={() => setActiveSection("messages")}
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
          )}

          {/* Schedule */}
          {activeSection === "schedule" && (
            <>
              <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Lịch học</h1>
              <div className="bg-white rounded-xl border border-border divide-y divide-border">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#2F80ED]/10 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#2F80ED]" />
                      </div>
                      <div>
                        <p className="text-gray-900" style={{ fontWeight: 500 }}>{session.subject} - {session.tutorName}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>{session.date} • {session.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full ${session.format === "Online" ? "bg-blue-50 text-[#2F80ED]" : "bg-green-50 text-[#27AE60]"}`} style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                        {session.format}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Saved */}
          {activeSection === "saved" && (
            <>
              <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gia sư đã lưu</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTutors.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-xl border border-border p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <ImageWithFallback src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="text-gray-900" style={{ fontWeight: 500 }}>{tutor.name}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.8125rem" }}>{tutor.subjects.join(", ")}</p>
                      </div>
                    </div>
                    <Link to={`/tutors/${tutor.id}`} className="block text-center py-2 border border-[#2F80ED] text-[#2F80ED] rounded-lg hover:bg-[#2F80ED] hover:text-white transition-colors" style={{ fontSize: "0.875rem" }}>
                      Xem hồ sơ
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Messages redirect */}
          {activeSection === "messages" && (
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
          )}

          {/* Profile */}
          {activeSection === "profile" && (
            <>
              <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Hồ sơ</h1>
              <div className="bg-white rounded-xl border border-border p-6 max-w-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center text-white" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                    PH
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Nguyễn Văn An</p>
                    <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>Phụ huynh</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Email", value: "parent@edunest.vn" },
                    { label: "Số điện thoại", value: "0901 234 567" },
                    { label: "Địa chỉ", value: "Quận 1, TP. Hồ Chí Minh" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="text-gray-400 block mb-1" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>{field.label}</label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                        style={{ fontSize: "0.875rem" }}
                      />
                    </div>
                  ))}
                </div>
                <button className="mt-6 px-6 py-2.5 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors" style={{ fontSize: "0.875rem" }}>
                  Lưu thay đổi
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}