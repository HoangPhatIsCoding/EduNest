import { Search, CheckCircle, Calendar, UserCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { tutors } from "../data/mockData";
import { TutorCard } from "./TutorCard";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LandingPage() {
  const navigate = useNavigate();
  const featuredTutors = tutors.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#2F80ED]/5 via-white to-[#27AE60]/5 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-gray-900 mb-4" style={{ fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2 }}>
                Tìm gia sư uy tín cho con bạn{" "}
                <span className="text-[#2F80ED]">chỉ trong vài phút</span>
              </h1>
              <p className="text-gray-500 mb-8" style={{ fontSize: "1.125rem" }}>
                Minh bạch thông tin – Giá rõ ràng – Đặt lịch dễ dàng
              </p>

              {/* Search Bar */}
              <div className="bg-white rounded-xl shadow-lg border border-border p-2 flex flex-wrap gap-2">
                <select className="flex-1 min-w-[120px] px-4 py-3 rounded-lg bg-gray-50 border-none text-gray-600 appearance-none cursor-pointer" style={{ fontSize: "0.875rem" }}>
                  <option>Môn học</option>
                  <option>Toán</option>
                  <option>Lý</option>
                  <option>Hóa</option>
                  <option>Tiếng Anh</option>
                  <option>Văn</option>
                </select>
                <select className="flex-1 min-w-[120px] px-4 py-3 rounded-lg bg-gray-50 border-none text-gray-600 appearance-none cursor-pointer" style={{ fontSize: "0.875rem" }}>
                  <option>Lớp</option>
                  <option>Lớp 6</option>
                  <option>Lớp 7</option>
                  <option>Lớp 8</option>
                  <option>Lớp 9</option>
                  <option>Lớp 10</option>
                  <option>Lớp 11</option>
                  <option>Lớp 12</option>
                </select>
                <select className="flex-1 min-w-[120px] px-4 py-3 rounded-lg bg-gray-50 border-none text-gray-600 appearance-none cursor-pointer" style={{ fontSize: "0.875rem" }}>
                  <option>Khu vực</option>
                  <option>Quận 1</option>
                  <option>Quận 3</option>
                  <option>Quận 7</option>
                  <option>Quận 10</option>
                  <option>Bình Thạnh</option>
                  <option>Tân Bình</option>
                </select>
                <button
                  onClick={() => navigate("/tutors")}
                  className="px-6 py-3 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Tìm kiếm
                </button>
              </div>

              <div className="flex items-center gap-6 mt-6 text-gray-400" style={{ fontSize: "0.875rem" }}>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#27AE60]" /> 500+ gia sư</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#27AE60]" /> Đã xác thực</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#27AE60]" /> Miễn phí đăng ký</span>
              </div>
            </div>

            <div className="hidden md:block relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758687126482-4b4b35926f33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJlbnQlMjBjaGlsZCUyMHN0dWR5aW5nJTIwaG9tZXdvcmslMjB0b2dldGhlcnxlbnwxfHx8fDE3NzI2NDE5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Phụ huynh và con cùng học"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-3 border border-border">
                <div className="w-10 h-10 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#27AE60]" />
                </div>
                <div>
                  <p style={{ fontSize: "0.75rem" }} className="text-gray-400">Phụ huynh tin tưởng</p>
                  <p style={{ fontSize: "1.125rem", fontWeight: 600 }} className="text-gray-900">2,500+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-gray-900 mb-2" style={{ fontSize: "1.875rem", fontWeight: 700 }}>Cách hoạt động</h2>
            <p className="text-gray-500">Chỉ 3 bước đơn giản để tìm gia sư phù hợp</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-7 h-7 text-[#2F80ED]" />,
                step: "01",
                title: "Tìm kiếm gia sư",
                desc: "Lọc theo môn học, khu vực, giá cả và hình thức học phù hợp với nhu cầu của bạn.",
              },
              {
                icon: <UserCheck className="w-7 h-7 text-[#2F80ED]" />,
                step: "02",
                title: "Xem hồ sơ & đánh giá",
                desc: "Tham khảo thông tin chi tiết, kinh nghiệm và đánh giá từ phụ huynh khác.",
              },
              {
                icon: <Calendar className="w-7 h-7 text-[#2F80ED]" />,
                step: "03",
                title: "Đặt lịch học",
                desc: "Chọn thời gian phù hợp, xác nhận và bắt đầu học ngay.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-[#F8FAFC] rounded-xl p-8 text-center hover:shadow-md transition-shadow border border-border"
              >
                <span className="absolute top-4 right-4 text-[#2F80ED]/10" style={{ fontSize: "3rem", fontWeight: 800 }}>
                  {item.step}
                </span>
                <div className="w-14 h-14 bg-[#2F80ED]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-gray-900 mb-1" style={{ fontSize: "1.875rem", fontWeight: 700 }}>Gia sư nổi bật</h2>
              <p className="text-gray-500">Những gia sư được đánh giá cao nhất trên nền tảng</p>
            </div>
            <button
              onClick={() => navigate("/tutors")}
              className="hidden md:block px-5 py-2.5 border border-[#2F80ED] text-[#2F80ED] rounded-lg hover:bg-[#2F80ED] hover:text-white transition-colors"
              style={{ fontSize: "0.875rem" }}
            >
              Xem tất cả
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => navigate("/tutors")}
              className="px-6 py-3 border border-[#2F80ED] text-[#2F80ED] rounded-lg"
            >
              Xem tất cả gia sư
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#2F80ED]">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { num: "500+", label: "Gia sư" },
              { num: "2,500+", label: "Phụ huynh" },
              { num: "10,000+", label: "Giờ học" },
              { num: "4.8★", label: "Đánh giá TB" },
            ].map((stat) => (
              <div key={stat.label}>
                <p style={{ fontSize: "2.25rem", fontWeight: 700 }}>{stat.num}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
