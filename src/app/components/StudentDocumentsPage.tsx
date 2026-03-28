import { useState } from "react";
import { FileText, Download, Search, Filter, Eye } from "lucide-react";
import { StudentSidebar } from "./StudentSidebar";
import { materials } from "../data/mockData";

const typeIcons: Record<string, string> = {
  pdf: "PDF",
  docx: "DOC",
  pptx: "PPT",
};

const typeColors: Record<string, string> = {
  pdf: "bg-red-50 text-red-500",
  docx: "bg-blue-50 text-[#2F80ED]",
  pptx: "bg-orange-50 text-[#F2994A]",
};

export function StudentDocumentsPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");

  const subjects = [...new Set(materials.map((m) => m.subject))];
  const filtered = materials.filter(
    (m) =>
      (subjectFilter === "all" || m.subject === subjectFilter) &&
      m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Tài liệu học tập</h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Tài liệu từ các gia sư của em</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm tài liệu..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-1 focus:ring-[#2F80ED]/20 transition-all"
                style={{ fontSize: "0.875rem" }}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] appearance-none"
                style={{ fontSize: "0.875rem" }}
              >
                <option value="all">Tất cả môn</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Documents grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`px-2.5 py-1.5 rounded-lg ${typeColors[doc.type] || "bg-gray-50 text-gray-500"}`}
                    style={{ fontSize: "0.6875rem", fontWeight: 700 }}
                  >
                    {typeIcons[doc.type] || doc.type.toUpperCase()}
                  </div>
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{doc.size}</span>
                </div>

                <h3 className="text-gray-900 mb-2 line-clamp-2" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                  {doc.name}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{doc.subject}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{doc.grade}</span>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>{doc.date}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#2F80ED]/5 text-[#2F80ED] rounded-lg hover:bg-[#2F80ED]/10 transition-colors"
                    style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    <Eye className="w-3.5 h-3.5" /> Xem
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#27AE60]/5 text-[#27AE60] rounded-lg hover:bg-[#27AE60]/10 transition-colors"
                    style={{ fontSize: "0.8125rem", fontWeight: 500 }}
                  >
                    <Download className="w-3.5 h-3.5" /> Tải về
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Không tìm thấy tài liệu</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
