import { Link } from "react-router";
import { tutors } from "../data/mockData";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function DashboardSavedPage() {
  const savedTutors = tutors.slice(0, 3);

  return (
    <>
      <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Gia sư đã lưu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTutors.map((tutor) => (
          <div key={tutor.id} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <ImageWithFallback src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-gray-900" style={{ fontWeight: 500 }}>{tutor.name}</p>
                <p className="text-gray-400" style={{ fontSize: "0.8125rem" }}>{tutor.subjects.join(", ")}</p>
              </div>
            </div>
            <Link to={`/tutors/${tutor.id}`} className="block text-center py-2 border border-[#2F80ED] text-[#2F80ED] rounded-lg hover:bg-[#2F80ED] hover:text-white transition-colors" style={{ fontSize: "0.875rem" }}>
              Xem hồ sơ
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
