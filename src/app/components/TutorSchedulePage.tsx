import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Monitor,
  MapPin,
  ChevronLeft,
  ChevronRight,
  User,
  Video,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";
import { todayLessons, tutorStudents } from "../data/mockData";

const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const weekSchedule = [
  {
    day: "Thứ 2",
    date: "10/03",
    lessons: [
      { id: 10, studentName: "Nguyễn Minh Anh", subject: "Toán", time: "14:00 - 16:00", format: "Offline" },
    ],
  },
  {
    day: "Thứ 3",
    date: "11/03",
    lessons: [
      { id: 11, studentName: "Trần Bảo Ngọc", subject: "Lý", time: "16:30 - 18:30", format: "Online" },
      { id: 12, studentName: "Phạm Thu Hà", subject: "Tiếng Anh", time: "19:00 - 21:00", format: "Online" },
    ],
  },
  {
    day: "Thứ 4",
    date: "12/03",
    lessons: todayLessons.map((l) => ({ ...l })),
  },
  {
    day: "Thứ 5",
    date: "13/03",
    lessons: [
      { id: 13, studentName: "Lê Hoàng Nam", subject: "Toán", time: "18:00 - 20:00", format: "Offline" },
    ],
  },
  {
    day: "Thứ 6",
    date: "14/03",
    lessons: [
      { id: 14, studentName: "Phạm Thu Hà", subject: "Tiếng Anh", time: "15:00 - 17:00", format: "Online" },
      { id: 15, studentName: "Nguyễn Minh Anh", subject: "Toán", time: "18:00 - 20:00", format: "Offline" },
    ],
  },
  {
    day: "Thứ 7",
    date: "15/03",
    lessons: [
      { id: 16, studentName: "Trần Bảo Ngọc", subject: "Lý", time: "09:00 - 11:00", format: "Offline" },
    ],
  },
  {
    day: "Chủ nhật",
    date: "16/03",
    lessons: [],
  },
];

export function TutorSchedulePage() {
  const [view, setView] = useState<"week" | "list">("week");

  const totalLessons = weekSchedule.reduce((sum, d) => sum + d.lessons.length, 0);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                Lịch dạy
              </h1>
              <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>
                Tuần 10/03 - 16/03/2026 • {totalLessons} buổi học
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setView("week")}
                  className={`px-4 py-2 transition-colors ${
                    view === "week"
                      ? "bg-[#2F80ED] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                >
                  Tuần
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`px-4 py-2 transition-colors ${
                    view === "list"
                      ? "bg-[#2F80ED] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                >
                  Danh sách
                </button>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-white rounded-lg border border-border transition-colors">
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-white rounded-lg border border-border transition-colors">
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Week view */}
          {view === "week" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {weekSchedule.map((day) => (
                <div
                  key={day.date}
                  className={`bg-white rounded-xl border shadow-sm overflow-hidden ${
                    day.date === "12/03" ? "border-[#2F80ED] ring-1 ring-[#2F80ED]/20" : "border-border"
                  }`}
                >
                  <div
                    className={`px-5 py-3 border-b flex items-center justify-between ${
                      day.date === "12/03"
                        ? "bg-[#2F80ED]/5 border-[#2F80ED]/20"
                        : "bg-gray-50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={day.date === "12/03" ? "text-[#2F80ED]" : "text-gray-900"}
                        style={{ fontWeight: 600, fontSize: "0.9375rem" }}
                      >
                        {day.day}
                      </span>
                      <span className="text-gray-400" style={{ fontSize: "0.8125rem" }}>
                        {day.date}
                      </span>
                    </div>
                    {day.date === "12/03" && (
                      <span
                        className="px-2 py-0.5 bg-[#2F80ED] text-white rounded-full"
                        style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                      >
                        Hôm nay
                      </span>
                    )}
                  </div>

                  <div className="p-4">
                    {day.lessons.length === 0 ? (
                      <p className="text-gray-400 text-center py-6" style={{ fontSize: "0.8125rem" }}>
                        Không có buổi học
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {day.lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/tutor-dashboard/lesson/${lesson.id}`}
                            className="block p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#2F80ED]/5 border border-transparent hover:border-[#2F80ED]/20 transition-all"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className="w-8 h-8 rounded-lg bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]"
                                style={{ fontWeight: 600, fontSize: "0.75rem" }}
                              >
                                {lesson.studentName.split(" ").pop()?.[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-gray-900 truncate" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                                  {lesson.studentName}
                                </p>
                                <p className="text-gray-500" style={{ fontSize: "0.75rem" }}>
                                  {lesson.subject}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400" style={{ fontSize: "0.75rem" }}>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {lesson.time}
                              </span>
                              <span className="flex items-center gap-1">
                                {lesson.format === "Online" ? (
                                  <Monitor className="w-3 h-3" />
                                ) : (
                                  <MapPin className="w-3 h-3" />
                                )}
                                {lesson.format}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List view */}
          {view === "list" && (
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {weekSchedule
                  .filter((d) => d.lessons.length > 0)
                  .map((day) => (
                    <div key={day.date}>
                      <div className="px-5 py-3 bg-gray-50 border-b border-border">
                        <span className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                          {day.day}, {day.date}/2026
                        </span>
                        {day.date === "12/03" && (
                          <span
                            className="ml-2 px-2 py-0.5 bg-[#2F80ED] text-white rounded-full"
                            style={{ fontSize: "0.6875rem", fontWeight: 500 }}
                          >
                            Hôm nay
                          </span>
                        )}
                      </div>
                      {day.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
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
                          <Link
                            to={`/tutor-dashboard/lesson/${lesson.id}`}
                            className="px-4 py-2 text-[#2F80ED] bg-[#2F80ED]/5 rounded-lg hover:bg-[#2F80ED]/10 transition-colors"
                            style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                          >
                            Chi tiết
                          </Link>
                          <Link
                            to={`/tutor-dashboard/classroom/EDU-2026-${day.date.replace("/", "")}-${String(lesson.id).padStart(3, "0")}`}
                            className="px-4 py-2 text-white bg-[#27AE60] rounded-lg hover:bg-[#219a54] transition-colors flex items-center gap-1.5"
                            style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                          >
                            <Video className="w-3.5 h-3.5" /> Vào phòng
                          </Link>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}