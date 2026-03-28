import { useState } from "react";
import { Link } from "react-router";
import {
  Calendar,
  Clock,
  Monitor,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Video,
  BookOpen,
} from "lucide-react";
import { StudentSidebar } from "./StudentSidebar";

const weekSchedule = [
  {
    day: "Thứ 2", date: "10/03",
    lessons: [
      { id: "EDU-2026-0310-001", tutorName: "Nguyễn Thị Mai", subject: "Toán", time: "14:00 - 16:00", format: "Offline" },
    ],
  },
  {
    day: "Thứ 3", date: "11/03",
    lessons: [
      { id: "EDU-2026-0311-001", tutorName: "Trần Văn Hùng", subject: "Tiếng Anh", time: "19:00 - 21:00", format: "Online" },
    ],
  },
  {
    day: "Thứ 4", date: "12/03",
    lessons: [
      { id: "EDU-2026-0312-001", tutorName: "Nguyễn Thị Mai", subject: "Toán", time: "14:00 - 16:00", format: "Offline" },
      { id: "EDU-2026-0312-002", tutorName: "Trần Văn Hùng", subject: "Tiếng Anh", time: "19:00 - 21:00", format: "Online" },
    ],
  },
  {
    day: "Thứ 5", date: "13/03",
    lessons: [],
  },
  {
    day: "Thứ 6", date: "14/03",
    lessons: [
      { id: "EDU-2026-0314-001", tutorName: "Nguyễn Thị Mai", subject: "Toán", time: "14:00 - 16:00", format: "Offline" },
    ],
  },
  {
    day: "Thứ 7", date: "15/03",
    lessons: [
      { id: "EDU-2026-0315-001", tutorName: "Trần Văn Hùng", subject: "Tiếng Anh", time: "10:00 - 12:00", format: "Online" },
    ],
  },
  { day: "Chủ nhật", date: "16/03", lessons: [] },
];

export function StudentSchedulePage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const todayIndex = 2; // Wednesday

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Lịch học</h1>
              <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Xem và quản lý lịch học của em</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWeekOffset(weekOffset - 1)}
                className="p-2.5 bg-white border border-border rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span
                className="px-4 py-2.5 bg-white border border-border rounded-xl text-gray-700"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Tuần {weekOffset === 0 ? "này" : weekOffset > 0 ? `+${weekOffset}` : weekOffset}
              </span>
              <button
                onClick={() => setWeekOffset(weekOffset + 1)}
                className="p-2.5 bg-white border border-border rounded-xl hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {weekSchedule.map((day, dayIndex) => (
              <div
                key={day.day}
                className={`bg-white rounded-xl border shadow-sm ${
                  dayIndex === todayIndex && weekOffset === 0
                    ? "border-[#F2994A]/40 ring-1 ring-[#F2994A]/10"
                    : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      dayIndex === todayIndex && weekOffset === 0
                        ? "bg-[#F2994A] text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                    style={{ fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    <Calendar className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                      {day.day}, {day.date}
                      {dayIndex === todayIndex && weekOffset === 0 && (
                        <span className="ml-2 text-[#F2994A] bg-[#F2994A]/10 px-2 py-0.5 rounded-full" style={{ fontSize: "0.6875rem" }}>
                          Hôm nay
                        </span>
                      )}
                    </p>
                    <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                      {day.lessons.length === 0 ? "Không có buổi học" : `${day.lessons.length} buổi học`}
                    </p>
                  </div>
                </div>

                {day.lessons.length > 0 && (
                  <div className="divide-y divide-border">
                    {day.lessons.map((lesson) => (
                      <div key={lesson.id} className="px-6 py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 bg-[#2F80ED]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-5 h-5 text-[#2F80ED]" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                              {lesson.subject}
                            </p>
                            <p className="text-gray-500" style={{ fontSize: "0.8125rem" }}>
                              {lesson.tutorName}
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
                            to={`/student/classroom/${lesson.id}`}
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
                )}

                {day.lessons.length === 0 && (
                  <div className="px-6 py-6 text-center text-gray-400" style={{ fontSize: "0.875rem" }}>
                    Không có lịch học trong ngày này
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
