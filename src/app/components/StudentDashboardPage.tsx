import { Link } from "react-router";
import {
  BookOpen,
  Calendar,
  Clock,
  Monitor,
  MapPin,
  ChevronRight,
  Video,
  BarChart3,
  Star,
  Bell,
} from "lucide-react";
import { StudentSidebar } from "./StudentSidebar";

const upcomingLessons = [
  { id: 1, tutorName: "Nguyễn Thị Mai", subject: "Toán", time: "14:00 - 16:00", date: "Hôm nay", format: "Offline", meetingId: "EDU-2026-0312-001" },
  { id: 2, tutorName: "Trần Văn Hùng", subject: "Tiếng Anh", time: "19:00 - 21:00", date: "Hôm nay", format: "Online", meetingId: "EDU-2026-0312-002" },
  { id: 3, tutorName: "Nguyễn Thị Mai", subject: "Toán", time: "14:00 - 16:00", date: "Ngày mai", format: "Offline", meetingId: "EDU-2026-0313-001" },
];

const recentScores = [
  { subject: "Toán", score: 9.0, date: "12/03", comment: "Xuất sắc!" },
  { subject: "Tiếng Anh", score: 7.5, date: "10/03", comment: "Tiến bộ rõ rệt" },
  { subject: "Toán", score: 8.5, date: "08/03", comment: "Làm bài tốt" },
];

const announcements = [
  { id: 1, title: "Bài tập Toán chương Đạo hàm", tutor: "Cô Mai", time: "2 giờ trước", type: "homework" },
  { id: 2, title: "Tài liệu IELTS Writing đã được cập nhật", tutor: "Thầy Hùng", time: "Hôm qua", type: "material" },
  { id: 3, title: "Lịch học thay đổi tuần sau", tutor: "Cô Mai", time: "2 ngày trước", type: "schedule" },
];

export function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Xin chào, Minh Anh 👋
            </h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>
              Thứ Năm, 12 tháng 3, 2026 — Chúc em một ngày học tập hiệu quả!
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { icon: BookOpen, label: "Buổi học hôm nay", value: "2", color: "#2F80ED", bg: "bg-[#2F80ED]/10" },
              { icon: BarChart3, label: "Điểm TB tháng này", value: "8.3", color: "#27AE60", bg: "bg-[#27AE60]/10" },
              { icon: Calendar, label: "Tổng buổi đã học", value: "42", color: "#F2994A", bg: "bg-[#F2994A]/10" },
              { icon: Star, label: "Chuỗi đi học", value: "12 ngày", color: "#9B51E0", bg: "bg-[#9B51E0]/10" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl border border-border p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                </div>
                <p className="text-gray-900 mb-0.5" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {stat.value}
                </p>
                <p className="text-gray-500" style={{ fontSize: "0.8125rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming lessons */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="text-gray-900" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
                  Buổi học sắp tới
                </h2>
                <Link
                  to="/student/schedule"
                  className="text-[#2F80ED] flex items-center gap-1"
                  style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                >
                  Xem tất cả <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="divide-y divide-border">
                {upcomingLessons.map((lesson) => (
                  <div key={lesson.id} className="px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-11 h-11 bg-[#F2994A]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-5 h-5 text-[#F2994A]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-900 truncate" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                          {lesson.subject}
                        </p>
                        <p className="text-gray-500 truncate" style={{ fontSize: "0.8125rem" }}>
                          {lesson.tutorName} • {lesson.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <div className="text-right hidden sm:block">
                        <p className="text-gray-700 flex items-center gap-1.5" style={{ fontSize: "0.8125rem" }}>
                          <Clock className="w-3.5 h-3.5" /> {lesson.time}
                        </p>
                        <p className="text-gray-400 flex items-center gap-1.5 mt-0.5" style={{ fontSize: "0.75rem" }}>
                          {lesson.format === "Online" ? (
                            <><Monitor className="w-3.5 h-3.5" /> Online</>
                          ) : (
                            <><MapPin className="w-3.5 h-3.5" /> Offline</>
                          )}
                        </p>
                      </div>
                      <Link
                        to={`/student/classroom/${lesson.meetingId}`}
                        className="flex items-center gap-1.5 px-3.5 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors"
                        style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                      >
                        <Video className="w-3.5 h-3.5" />
                        Vào lớp
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              {/* Recent scores */}
              <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="text-gray-900" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
                    Điểm gần đây
                  </h2>
                  <Link
                    to="/student/grades"
                    className="text-[#2F80ED] flex items-center gap-1"
                    style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    Xem tất cả <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-border">
                  {recentScores.map((score, i) => (
                    <div key={i} className="px-5 py-3.5 flex items-center justify-between">
                      <div>
                        <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{score.subject}</p>
                        <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>{score.date} • {score.comment}</p>
                      </div>
                      <span
                        className={`px-2.5 py-1 rounded-lg ${
                          score.score >= 8 ? "bg-[#27AE60]/10 text-[#27AE60]" : "bg-[#F2994A]/10 text-[#F2994A]"
                        }`}
                        style={{ fontSize: "0.875rem", fontWeight: 600 }}
                      >
                        {score.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcements */}
              <div className="bg-white rounded-xl border border-border shadow-sm">
                <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                  <h2 className="text-gray-900 flex items-center gap-2" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
                    <Bell className="w-4.5 h-4.5 text-[#F2994A]" />
                    Thông báo
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {announcements.map((a) => (
                    <div key={a.id} className="px-5 py-3.5">
                      <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{a.title}</p>
                      <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.75rem" }}>
                        {a.tutor} • {a.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
