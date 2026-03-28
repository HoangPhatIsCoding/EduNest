import { useState } from "react";
import { SlidersHorizontal, Star, X } from "lucide-react";
import { tutors } from "../data/mockData";
import { TutorCard } from "./TutorCard";
import { Footer } from "./Footer";

const subjects = ["Toán", "Lý", "Hóa", "Sinh", "Tiếng Anh", "Văn", "Sử", "Tin học"];
const grades = ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"];
const formats = ["Online", "Offline"];
const priceRanges = [
  { label: "Dưới 200.000đ", min: 0, max: 200000 },
  { label: "200.000đ - 250.000đ", min: 200000, max: 250000 },
  { label: "Trên 250.000đ", min: 250000, max: Infinity },
];

export function TutorListingPage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSubject = (s: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const filteredTutors = tutors.filter((t) => {
    if (selectedSubjects.length && !t.subjects.some((s) => selectedSubjects.includes(s))) return false;
    if (selectedGrade && !t.grades.includes(selectedGrade)) return false;
    if (selectedFormat && !t.format.includes(selectedFormat)) return false;
    if (selectedPrice !== null) {
      const range = priceRanges[selectedPrice];
      if (t.price < range.min || t.price > range.max) return false;
    }
    if (minRating && t.rating < minRating) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedGrade("");
    setSelectedFormat("");
    setSelectedPrice(null);
    setMinRating(0);
  };

  const filterSidebar = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Bộ lọc
        </h3>
        <button onClick={clearFilters} className="text-[#2F80ED]" style={{ fontSize: "0.875rem" }}>
          Xóa tất cả
        </button>
      </div>

      {/* Subject */}
      <div>
        <label className="text-gray-700 mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Môn học</label>
        <div className="flex flex-wrap gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => toggleSubject(s)}
              className={`px-3 py-1.5 rounded-full border transition-colors ${
                selectedSubjects.includes(s)
                  ? "bg-[#2F80ED] text-white border-[#2F80ED]"
                  : "border-gray-200 text-gray-600 hover:border-[#2F80ED]"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grade */}
      <div>
        <label className="text-gray-700 mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Lớp</label>
        <select
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-600"
          style={{ fontSize: "0.875rem" }}
        >
          <option value="">Tất cả</option>
          {grades.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="text-gray-700 mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Giá</label>
        <div className="space-y-2">
          {priceRanges.map((p, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer" style={{ fontSize: "0.875rem", fontWeight: 400 }}>
              <input
                type="radio"
                name="price"
                checked={selectedPrice === i}
                onChange={() => setSelectedPrice(i)}
                className="text-[#2F80ED] accent-[#2F80ED]"
              />
              <span className="text-gray-600">{p.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Format */}
      <div>
        <label className="text-gray-700 mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Hình thức học</label>
        <div className="flex gap-2">
          {formats.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFormat(selectedFormat === f ? "" : f)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedFormat === f
                  ? "bg-[#2F80ED] text-white border-[#2F80ED]"
                  : "border-gray-200 text-gray-600 hover:border-[#2F80ED]"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-gray-700 mb-2 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Đánh giá tối thiểu</label>
        <div className="flex gap-1">
          {[4, 4.5, 4.8].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(minRating === r ? 0 : r)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-colors ${
                minRating === r
                  ? "bg-yellow-50 border-yellow-300 text-yellow-700"
                  : "border-gray-200 text-gray-600"
              }`}
              style={{ fontSize: "0.8125rem" }}
            >
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" /> {r}+
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Tìm gia sư</h1>
          <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>
            Tìm thấy {filteredTutors.length} gia sư phù hợp
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Mobile filter toggle */}
        <button
          className="md:hidden mb-4 px-4 py-2 bg-white rounded-lg border border-border flex items-center gap-2 text-gray-600"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="w-4 h-4" /> Bộ lọc
        </button>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className={`${showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-auto" : "hidden"} md:block md:relative md:w-[280px] flex-shrink-0`}>
            {showFilters && (
              <button
                className="md:hidden absolute top-4 right-4"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div className="bg-white rounded-xl border border-border p-5 md:sticky md:top-24">
              {filterSidebar}
            </div>
          </aside>

          {/* Grid */}
          <main className="flex-1">
            {filteredTutors.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-400 mb-2" style={{ fontSize: "1.125rem" }}>Không tìm thấy gia sư phù hợp</p>
                <button onClick={clearFilters} className="text-[#2F80ED]">Xóa bộ lọc</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutors.map((tutor) => (
                  <TutorCard key={tutor.id} tutor={tutor} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
