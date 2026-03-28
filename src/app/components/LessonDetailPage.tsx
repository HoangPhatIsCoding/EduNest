import { useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  Clock,
  Monitor,
  MapPin,
  BookOpen,
  User,
  Calendar,
  CheckCircle,
  Save,
  XCircle,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";
import { todayLessons } from "../data/mockData";

export function LessonDetailPage() {
  const { id } = useParams();
  const lesson = todayLessons.find((l) => l.id === Number(id)) || todayLessons[0];

  const [attendance, setAttendance] = useState<"present" | "absent" | "">("");
  const [score, setScore] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);
  const [ended, setEnded] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-8 py-8">
          {/* Back */}
          <Link
            to="/tutor-dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2F80ED] transition-colors mb-6"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại trang chủ
          </Link>

          <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Chi tiết buổi học
          </h1>

          {saved && (
            <div className="flex items-center gap-2 bg-green-50 text-[#27AE60] rounded-xl p-4 mb-6" style={{ fontSize: "0.875rem" }}>
              <CheckCircle className="w-5 h-5" />
              Thông tin đã được lưu thành công!
            </div>
          )}

          {ended && (
            <div className="flex items-center gap-2 bg-blue-50 text-[#2F80ED] rounded-xl p-4 mb-6" style={{ fontSize: "0.875rem" }}>
              <CheckCircle className="w-5 h-5" />
              Buổi học đã kết thúc. Cảm ơn bạn!
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left: Lesson info + notes (3 cols) */}
            <div className="lg:col-span-3 space-y-6">
              {/* Lesson information card */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-gray-900 mb-5" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Thông tin buổi học
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#2F80ED]/10 rounded-lg flex items-center justify-center">
                      <User className="w-4.5 h-4.5 text-[#2F80ED]" />
                    </div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Học sinh</p>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>{lesson.studentName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#27AE60]/10 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4.5 h-4.5 text-[#27AE60]" />
                    </div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Môn học</p>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>{lesson.subject}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4.5 h-4.5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Ngày học</p>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>Thứ Năm, 12/03/2026</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4.5 h-4.5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Thời gian</p>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>{lesson.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-cyan-100 rounded-lg flex items-center justify-center">
                      {lesson.format === "Online" ? (
                        <Monitor className="w-4.5 h-4.5 text-cyan-600" />
                      ) : (
                        <MapPin className="w-4.5 h-4.5 text-cyan-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>Hình thức</p>
                      <p className="text-gray-900" style={{ fontWeight: 500 }}>{lesson.format}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lesson notes */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Ghi chú buổi học
                </h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={6}
                  placeholder="Ghi chú nội dung đã dạy, bài tập về nhà, nhận xét về học sinh..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
            </div>

            {/* Right: Attendance + score (2 cols) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Attendance card */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Điểm danh
                </h2>
                <p className="text-gray-500 mb-4" style={{ fontSize: "0.875rem" }}>
                  Trạng thái học sinh:
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAttendance("present")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      attendance === "present"
                        ? "border-[#27AE60] bg-green-50 text-[#27AE60]"
                        : "border-gray-200 text-gray-500 hover:border-[#27AE60]"
                    }`}
                    style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                    Có mặt
                  </button>
                  <button
                    onClick={() => setAttendance("absent")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${
                      attendance === "absent"
                        ? "border-red-500 bg-red-50 text-red-500"
                        : "border-gray-200 text-gray-500 hover:border-red-500"
                    }`}
                    style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    <XCircle className="w-5 h-5" />
                    Vắng mặt
                  </button>
                </div>
              </div>

              {/* Score input */}
              <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                  Nhập điểm
                </h2>
                <div>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Điểm số (0 - 10)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.5"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="VD: 8.5"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    style={{ fontSize: "1.25rem", fontWeight: 600, textAlign: "center" }}
                  />
                </div>
                {score && (
                  <div className="mt-3 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full ${
                        Number(score) >= 8
                          ? "bg-green-50 text-[#27AE60]"
                          : Number(score) >= 5
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-red-50 text-red-500"
                      }`}
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      {Number(score) >= 8 ? "Giỏi" : Number(score) >= 6.5 ? "Khá" : Number(score) >= 5 ? "Trung bình" : "Yếu"}
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors shadow-sm"
                  style={{ fontSize: "0.9375rem" }}
                >
                  <Save className="w-5 h-5" />
                  Lưu thông tin
                </button>
                <button
                  onClick={() => setEnded(true)}
                  disabled={ended}
                  className="w-full py-3 bg-[#27AE60] text-white rounded-xl hover:bg-[#219a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: "0.9375rem" }}
                >
                  {ended ? "Đã kết thúc" : "Kết thúc buổi học"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}