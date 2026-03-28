import { useState } from "react";
import { Link } from "react-router";
import {
  BookOpen,
  Users,
  CalendarDays,
  Clock,
  Monitor,
  MapPin,
  ChevronRight,
  Plus,
  Upload,
  X,
  Video,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";
import { todayLessons, tutorStudents } from "../data/mockData";

export function TutorDashboardPage() {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [assignTo, setAssignTo] = useState("");

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Xin chào, Nguyễn Thị Mai 👋
            </h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>
              Thứ Năm, 12 tháng 3, 2026
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[#2F80ED]/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#2F80ED]" />
                </div>
                <span className="text-[#27AE60] bg-green-50 px-2.5 py-1 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  Hôm nay
                </span>
              </div>
              <p className="text-gray-900 mb-0.5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                {todayLessons.length}
              </p>
              <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
                Buổi học hôm nay
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-[#27AE60]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#27AE60]" />
                </div>
              </div>
              <p className="text-gray-900 mb-0.5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                {tutorStudents.length}
              </p>
              <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
                Tổng số học sinh
              </p>
            </div>

            <div className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CalendarDays className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-900 mb-0.5" style={{ fontSize: "2rem", fontWeight: 700 }}>
                12
              </p>
              <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
                Lịch học tuần này
              </p>
            </div>
          </div>

          {/* Today's schedule */}
          <div className="bg-white rounded-xl border border-border shadow-sm mb-8">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                Lịch dạy hôm nay
              </h2>
              <Link
                to="/tutor-dashboard/schedule"
                className="text-[#2F80ED] flex items-center gap-1 hover:underline"
                style={{ fontSize: "0.875rem" }}
              >
                Xem tất cả <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="divide-y divide-border">
              {todayLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]"
                      style={{ fontWeight: 600, fontSize: "0.875rem" }}
                    >
                      {lesson.studentName.split(" ").pop()?.[0]}
                    </div>
                    <div>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>
                        {lesson.studentName}
                      </p>
                      <p className="text-gray-500" style={{ fontSize: "0.8125rem" }}>
                        {lesson.subject}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-6 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {lesson.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {lesson.format === "Online" ? (
                        <Monitor className="w-4 h-4" />
                      ) : (
                        <MapPin className="w-4 h-4" />
                      )}
                      {lesson.format}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/tutor-dashboard/classroom/${lesson.meetingId}`}
                      className="px-4 py-2 text-white bg-[#27AE60] rounded-lg hover:bg-[#219a54] transition-colors flex items-center gap-1.5"
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      <Video className="w-3.5 h-3.5" /> Vào phòng
                    </Link>
                    <Link
                      to={`/tutor-dashboard/lesson/${lesson.id}`}
                      className="px-4 py-2 text-[#2F80ED] bg-[#2F80ED]/5 rounded-lg hover:bg-[#2F80ED]/10 transition-colors"
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      Chi tiết
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice questions section */}
          <div className="bg-white rounded-xl border border-border shadow-sm">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                Câu hỏi luyện tập cho học sinh
              </h2>
              <button
                onClick={() => setShowQuestionForm(!showQuestionForm)}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors"
                style={{ fontSize: "0.8125rem" }}
              >
                {showQuestionForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {showQuestionForm ? "Đóng" : "Tạo câu hỏi"}
              </button>
            </div>

            {showQuestionForm && (
              <div className="p-5 border-b border-border bg-[#F8FAFC]">
                <div className="space-y-4 max-w-[600px]">
                  <div>
                    <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      Tiêu đề câu hỏi
                    </label>
                    <input
                      type="text"
                      value={questionTitle}
                      onChange={(e) => setQuestionTitle(e.target.value)}
                      placeholder="VD: Bài tập đạo hàm nâng cao"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                      style={{ fontSize: "0.9375rem" }}
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      Nội dung câu hỏi
                    </label>
                    <textarea
                      value={questionContent}
                      onChange={(e) => setQuestionContent(e.target.value)}
                      rows={4}
                      placeholder="Nhập nội dung câu hỏi..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                      style={{ fontSize: "0.9375rem" }}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Tải tệp đính kèm
                      </label>
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-[#2F80ED] hover:text-[#2F80ED] transition-colors">
                        <Upload className="w-4 h-4" />
                        <span style={{ fontSize: "0.875rem" }}>Chọn tệp</span>
                      </button>
                    </div>
                    <div>
                      <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Giao cho học sinh
                      </label>
                      <select
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                        style={{ fontSize: "0.9375rem" }}
                      >
                        <option value="">Chọn học sinh</option>
                        {tutorStudents.map((s) => (
                          <option key={s.id} value={s.name}>{s.name} - {s.subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    className="px-6 py-2.5 bg-[#27AE60] text-white rounded-lg hover:bg-[#219a54] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  >
                    Tạo câu hỏi
                  </button>
                </div>
              </div>
            )}

            {/* Existing questions placeholder */}
            <div className="p-5 text-center text-gray-400" style={{ fontSize: "0.875rem" }}>
              <p>Chưa có câu hỏi nào được tạo.</p>
              <p className="mt-1" style={{ fontSize: "0.8125rem" }}>
                Bấm "Tạo câu hỏi" để bắt đầu giao bài cho học sinh.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}