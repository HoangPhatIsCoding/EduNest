import { useState } from "react";
import { BarChart3, TrendingUp, BookOpen, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { StudentSidebar } from "./StudentSidebar";
import { scoreRecords, attendanceRecords, progressData } from "../data/mockData";

export function StudentGradesPage() {
  const [tab, setTab] = useState<"scores" | "attendance">("scores");

  const avgScore = (scoreRecords.reduce((s, r) => s + r.score, 0) / scoreRecords.length).toFixed(1);
  const presentCount = attendanceRecords.filter((a) => a.status === "present").length;
  const attendanceRate = Math.round((presentCount / attendanceRecords.length) * 100);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Điểm số & Tiến độ</h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Theo dõi kết quả học tập của em</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {[
              { icon: BarChart3, label: "Điểm TB", value: avgScore, color: "#2F80ED", bg: "bg-[#2F80ED]/10" },
              { icon: Award, label: "Điểm cao nhất", value: "9.0", color: "#27AE60", bg: "bg-[#27AE60]/10" },
              { icon: TrendingUp, label: "Tỷ lệ đi học", value: `${attendanceRate}%`, color: "#F2994A", bg: "bg-[#F2994A]/10" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-border p-5 shadow-sm">
                <div className={`w-11 h-11 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <p className="text-gray-900" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{s.value}</p>
                <p className="text-gray-500" style={{ fontSize: "0.8125rem" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-8">
            <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>
              Biểu đồ tiến độ học tập
            </h2>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line key="line-toan" type="monotone" dataKey="toan" name="Toán" stroke="#2F80ED" strokeWidth={2} dot={{ r: 4 }} />
                  <Line key="line-english" type="monotone" dataKey="english" name="Tiếng Anh" stroke="#F2994A" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-border shadow-sm">
            <div className="flex border-b border-border">
              {[
                { key: "scores" as const, label: "Bảng điểm" },
                { key: "attendance" as const, label: "Điểm danh" },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-6 py-3.5 transition-colors ${
                    tab === t.key
                      ? "text-[#F2994A] border-b-2 border-[#F2994A]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  style={{ fontSize: "0.9375rem", fontWeight: tab === t.key ? 600 : 400 }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "scores" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {["Môn học", "Điểm", "Nhận xét", "Gia sư"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {scoreRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-2 text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                            <BookOpen className="w-4 h-4 text-[#2F80ED]" /> {r.subject}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-lg ${
                              r.score >= 8 ? "bg-[#27AE60]/10 text-[#27AE60]" : "bg-[#F2994A]/10 text-[#F2994A]"
                            }`}
                            style={{ fontSize: "0.875rem", fontWeight: 600 }}
                          >
                            {r.score}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500" style={{ fontSize: "0.8125rem" }}>{r.comment}</td>
                        <td className="px-6 py-4 text-gray-500" style={{ fontSize: "0.8125rem" }}>{r.tutor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tab === "attendance" && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      {["Ngày", "Môn học", "Gia sư", "Trạng thái"].map((h) => (
                        <th key={h} className="px-6 py-3 text-left text-gray-500" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {attendanceRecords.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900" style={{ fontSize: "0.875rem" }}>{r.date}</td>
                        <td className="px-6 py-4 text-gray-700" style={{ fontSize: "0.875rem" }}>{r.subject}</td>
                        <td className="px-6 py-4 text-gray-500" style={{ fontSize: "0.8125rem" }}>{r.tutor}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full ${
                              r.status === "present"
                                ? "bg-[#27AE60]/10 text-[#27AE60]"
                                : "bg-red-50 text-red-500"
                            }`}
                            style={{ fontSize: "0.75rem", fontWeight: 500 }}
                          >
                            {r.status === "present" ? "Có mặt" : "Vắng"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}