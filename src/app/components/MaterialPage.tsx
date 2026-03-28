import { useState } from "react";
import {
  Search,
  Upload,
  Download,
  FileText,
  File,
  Presentation,
  Filter,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";
import { materials } from "../data/mockData";

const fileIcons: Record<string, { icon: typeof FileText; color: string; bg: string }> = {
  pdf: { icon: FileText, color: "text-red-500", bg: "bg-red-50" },
  docx: { icon: File, color: "text-blue-500", bg: "bg-blue-50" },
  pptx: { icon: Presentation, color: "text-orange-500", bg: "bg-orange-50" },
};

const subjects = ["Tất cả", "Toán", "Lý", "Hóa", "Tiếng Anh"];
const grades = ["Tất cả", "Lớp 10", "Lớp 11", "Lớp 12"];

export function MaterialPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("Tất cả");
  const [filterGrade, setFilterGrade] = useState("Tất cả");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = materials.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSubject = filterSubject === "Tất cả" || m.subject === filterSubject;
    const matchGrade = filterGrade === "Tất cả" || m.grade === filterGrade;
    return matchSearch && matchSubject && matchGrade;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-gray-900" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Tài liệu học tập
            </h1>
            <button
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors shadow-sm"
              style={{ fontSize: "0.875rem" }}
            >
              <Upload className="w-4 h-4" />
              Upload tài liệu
            </button>
          </div>

          {/* Search + filter bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tài liệu..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters
                  ? "border-[#2F80ED] bg-[#2F80ED]/5 text-[#2F80ED]"
                  : "border-gray-200 text-gray-600 hover:border-[#2F80ED]"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              <Filter className="w-4 h-4" />
              Bộ lọc
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white rounded-xl border border-border p-4 mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-gray-500 block mb-1.5" style={{ fontSize: "0.8125rem" }}>
                  Môn học
                </label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterSubject(s)}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        filterSubject === s
                          ? "bg-[#2F80ED] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <label className="text-gray-500 block mb-1.5" style={{ fontSize: "0.8125rem" }}>
                  Lớp
                </label>
                <div className="flex flex-wrap gap-2">
                  {grades.map((g) => (
                    <button
                      key={g}
                      onClick={() => setFilterGrade(g)}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        filterGrade === g
                          ? "bg-[#27AE60] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      style={{ fontSize: "0.8125rem" }}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Material cards */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="bg-white rounded-xl border border-border p-12 text-center text-gray-400">
                Không tìm thấy tài liệu phù hợp
              </div>
            ) : (
              filtered.map((mat) => {
                const iconConfig = fileIcons[mat.type] || fileIcons.pdf;
                const IconComp = iconConfig.icon;
                return (
                  <div
                    key={mat.id}
                    className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 ${iconConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <IconComp className={`w-6 h-6 ${iconConfig.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 truncate" style={{ fontWeight: 500 }}>
                        {mat.name}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-gray-400" style={{ fontSize: "0.8125rem" }}>
                        <span className="px-2 py-0.5 bg-blue-50 text-[#2F80ED] rounded" style={{ fontSize: "0.75rem" }}>
                          {mat.subject}
                        </span>
                        <span className="px-2 py-0.5 bg-green-50 text-[#27AE60] rounded" style={{ fontSize: "0.75rem" }}>
                          {mat.grade}
                        </span>
                        <span>{mat.size}</span>
                        <span>{mat.date}</span>
                        <span>{mat.downloads} lượt tải</span>
                      </div>
                    </div>

                    <button
                      className="flex items-center gap-1.5 px-4 py-2.5 text-[#2F80ED] bg-[#2F80ED]/5 rounded-xl hover:bg-[#2F80ED]/10 transition-colors flex-shrink-0"
                      style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Tải xuống</span>
                    </button>
                  </div>
                );
              })
            )}
          </div>

          <p className="text-center text-gray-400 mt-6" style={{ fontSize: "0.8125rem" }}>
            Hiển thị {filtered.length} / {materials.length} tài liệu
          </p>
        </div>
      </main>
    </div>
  );
}