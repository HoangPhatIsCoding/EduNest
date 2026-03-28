import { Star, MapPin, Monitor } from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface TutorCardProps {
  tutor: {
    id: number;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    subjects: string[];
    price: number;
    location: string;
    format: string[];
  };
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <ImageWithFallback
            src={tutor.avatar}
            alt={tutor.name}
            className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-gray-900 truncate">{tutor.name}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{tutor.rating}</span>
              <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>({tutor.reviewCount} đánh giá)</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {tutor.subjects.map((s) => (
            <span
              key={s}
              className="px-2.5 py-0.5 bg-blue-50 text-[#2F80ED] rounded-full"
              style={{ fontSize: "0.75rem", fontWeight: 500 }}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: "0.875rem" }}>
            <MapPin className="w-3.5 h-3.5" />
            <span>{tutor.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500" style={{ fontSize: "0.875rem" }}>
            <Monitor className="w-3.5 h-3.5" />
            <span>{tutor.format.join(" / ")}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div>
            <span className="text-[#2F80ED]" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              {tutor.price.toLocaleString("vi-VN")}đ
            </span>
            <span className="text-gray-400" style={{ fontSize: "0.75rem" }}> /giờ</span>
          </div>
          <Link
            to={`/tutors/${tutor.id}`}
            className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors"
            style={{ fontSize: "0.875rem" }}
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </div>
  );
}
