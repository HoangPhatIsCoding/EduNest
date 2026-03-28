import { useState } from "react";
import { Link } from "react-router";
import {
  GraduationCap,
  ArrowLeft,
  User,
  BookOpen,
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  attendanceRecords,
  scoreRecords,
  progressData,
} from "../data/mockData";
import { ChatWidget } from "./ChatWidget";

export function ParentManagementPage() {
  const [activeTab, setActiveTab] = useState<"attendance" | "scores" | "progress">("attendance");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top bar */}
      <div className="bg-white border-b border-border px-6 py-3 flex items-center gap-3">
        <Link to="/dashboard" className="text-gray-500 hover:text-[#2F80ED] transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[#2F80ED]" />
          <span className="text-[#2F80ED]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>
            EduNest
          </span>
        </Link>
        <span className="text-gray-400 ml-1" style={{ fontSize: "0.875rem" }}>
          / Quản lý việc học
        </span>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
        <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
          Quản lý việc học
        </h1>

        {/* Student overview card */}
        <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#2F80ED]/10 flex items-center justify-center">
              <User className="w-8 h-8 text-[#2F80ED]" />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-1" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                Nguyễn Minh Anh
              </h2>
              <div className="flex flex-wrap gap-4 text-gray-500" style={{ fontSize: "0.875rem" }}>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> Lớp 11
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" /> Gia sư: Nguyễn Thị Mai, Trần Văn Hùng
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link
                to="/tutor-dashboard/lesson/1"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#2F80ED]/5 text-[#2F80ED] rounded-xl hover:bg-[#2F80ED]/10 transition-colors"
                style={{ fontSize: "0.8125rem", fontWeight: 500 }}
              >
                <Calendar className="w-4 h-4" /> Xem chi tiết buổi học
              </Link>
              <Link
                to="/chat"
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#27AE60] text-white rounded-xl hover:bg-[#219a54] transition-colors"
                style={{ fontSize: "0.8125rem", fontWeight: 500 }}
              >
                <MessageSquare className="w-4 h-4" /> Nhắn tin với gia sư
              </Link>
            </div>
          </div>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
            <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Tổng buổi học</p>
            <p className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>24</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
            <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Tỷ lệ tham gia</p>
            <p className="text-[#27AE60]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>83%</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
            <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Điểm TB Toán</p>
            <p className="text-[#2F80ED]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>8.75</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
            <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Điểm TB T.Anh</p>
            <p className="text-purple-600" style={{ fontSize: "1.5rem", fontWeight: 700 }}>7.25</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <div className="flex border-b border-border">
            {[
              { key: "attendance" as const, label: "Điểm danh", icon: Calendar },
              { key: "scores" as const, label: "Điểm số", icon: BookOpen },
              { key: "progress" as const, label: "Biểu đồ tiến bộ", icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-3.5 transition-colors ${
                  activeTab === tab.key
                    ? "text-[#2F80ED] border-b-2 border-[#2F80ED]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Attendance tab */}
            {activeTab === "attendance" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Ngày</th>
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Môn học</th>
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Gia sư</th>
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record) => (
                      <tr key={record.id} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4 text-gray-900" style={{ fontSize: "0.875rem" }}>{record.date}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 bg-blue-50 text-[#2F80ED] rounded-lg" style={{ fontSize: "0.8125rem" }}>
                            {record.subject}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600" style={{ fontSize: "0.875rem" }}>{record.tutor}</td>
                        <td className="py-3.5 px-4">
                          {record.status === "present" ? (
                            <span className="flex items-center gap-1.5 text-[#27AE60]" style={{ fontSize: "0.875rem" }}>
                              <CheckCircle className="w-4 h-4" /> Có mặt
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 text-red-500" style={{ fontSize: "0.875rem" }}>
                              <XCircle className="w-4 h-4" /> Vắng mặt
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Scores tab */}
            {activeTab === "scores" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Môn học</th>
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Điểm</th>
                      <th className="text-left py-3 px-4 text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Nhận xét gia sư</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scoreRecords.map((record) => (
                      <tr key={record.id} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 bg-blue-50 text-[#2F80ED] rounded-lg" style={{ fontSize: "0.8125rem" }}>
                            {record.subject}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full ${
                              record.score >= 8
                                ? "bg-green-50 text-[#27AE60]"
                                : record.score >= 6.5
                                ? "bg-yellow-50 text-yellow-600"
                                : "bg-red-50 text-red-500"
                            }`}
                            style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                          >
                            {record.score}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-600 max-w-[300px]" style={{ fontSize: "0.875rem" }}>
                          {record.comment}
                          <p className="text-gray-400 mt-0.5" style={{ fontSize: "0.75rem" }}>— {record.tutor}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Progress chart tab */}
            {activeTab === "progress" && (
              <div>
                <p className="text-gray-500 mb-4" style={{ fontSize: "0.875rem" }}>
                  Biểu đồ tiến bộ điểm số theo tháng
                </p>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                      <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid #E5E7EB",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          fontSize: "0.8125rem",
                        }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: "0.8125rem" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="toan"
                        name="Toán"
                        stroke="#2F80ED"
                        strokeWidth={2.5}
                        dot={{ fill: "#2F80ED", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="english"
                        name="Tiếng Anh"
                        stroke="#27AE60"
                        strokeWidth={2.5}
                        dot={{ fill: "#27AE60", r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating chat widget */}
      <ChatWidget />
    </div>
  );
}