import { useState } from "react";
import { Link } from "react-router";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";
import { tutorStudents } from "../data/mockData";

export function TutorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tutorStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                Học sinh của tôi
              </h1>
              <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>
                Tổng cộng {tutorStudents.length} học sinh
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm học sinh..."
              className="w-full max-w-md pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
              style={{ fontSize: "0.9375rem" }}
            />
          </div>

          {/* Student cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((student) => (
              <div
                key={student.id}
                className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED] flex-shrink-0"
                    style={{ fontWeight: 600 }}
                  >
                    {student.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-gray-900 mb-0.5" style={{ fontWeight: 600 }}>
                      {student.name}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className="px-2 py-0.5 bg-green-50 text-[#27AE60] rounded"
                        style={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        {student.grade}
                      </span>
                      <span
                        className="px-2 py-0.5 bg-blue-50 text-[#2F80ED] rounded"
                        style={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        {student.subject}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>{student.sessions} buổi đã học</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: "0.8125rem" }}>
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{student.nextSession}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <Link
                    to={`/tutor-dashboard/lesson/${student.id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[#2F80ED] bg-[#2F80ED]/5 rounded-xl hover:bg-[#2F80ED]/10 transition-colors"
                    style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    <Clock className="w-4 h-4" /> Xem buổi học
                  </Link>
                  <Link
                    to="/tutor-dashboard/chat"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[#27AE60] bg-[#27AE60]/5 rounded-xl hover:bg-[#27AE60]/10 transition-colors"
                    style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    <MessageSquare className="w-4 h-4" /> Nhắn tin
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-border p-12 text-center text-gray-400">
              Không tìm thấy học sinh phù hợp
            </div>
          )}
        </div>
      </main>
    </div>
  );
}