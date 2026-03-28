import { CheckCircle, DollarSign, Users, Clock } from "lucide-react";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BecomeTutorPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#27AE60]/5 via-white to-[#2F80ED]/5 py-16 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-gray-900 mb-4" style={{ fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.2 }}>
                Trở thành gia sư trên{" "}
                <span className="text-[#27AE60]">EduNest</span>
              </h1>
              <p className="text-gray-500 mb-6" style={{ fontSize: "1.125rem" }}>
                Chia sẻ kiến thức, tạo thu nhập linh hoạt và kết nối với hàng ngàn phụ huynh đang tìm kiếm gia sư uy tín.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Tự do sắp xếp lịch dạy",
                  "Thu nhập hấp dẫn, thanh toán minh bạch",
                  "Hỗ trợ từ đội ngũ EduNest",
                  "Xây dựng thương hiệu cá nhân",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#27AE60]" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
              <button className="px-8 py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219a54] transition-colors" style={{ fontSize: "1rem" }}>
                Đăng ký ngay
              </button>
            </div>
            <div className="hidden md:block">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1588912914074-b93851ff14b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBlZHVjYXRpb24lMjBsYXB0b3AlMjBsZWFybmluZ3xlbnwxfHx8fDE3NzI2MTIzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Online education"
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-center text-gray-900 mb-10" style={{ fontSize: "1.875rem", fontWeight: 700 }}>
            Tại sao chọn EduNest?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <DollarSign className="w-7 h-7 text-[#27AE60]" />,
                title: "Thu nhập linh hoạt",
                desc: "Tự đặt giá dạy, nhận thanh toán nhanh chóng. Thu nhập trung bình 8-15 triệu/tháng.",
              },
              {
                icon: <Users className="w-7 h-7 text-[#2F80ED]" />,
                title: "Tiếp cận phụ huynh",
                desc: "Kết nối với hơn 2,500 phụ huynh đang tìm gia sư trên nền tảng.",
              },
              {
                icon: <Clock className="w-7 h-7 text-[#EB5757]" />,
                title: "Linh hoạt thời gian",
                desc: "Tự sắp xếp lịch dạy phù hợp với thời gian biểu cá nhân.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-[#F8FAFC] rounded-xl p-8 text-center border border-border">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-lg mx-auto px-6">
          <h2 className="text-center text-gray-900 mb-8" style={{ fontSize: "1.875rem", fontWeight: 700 }}>
            Đăng ký làm gia sư
          </h2>
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <div className="space-y-4">
              {[
                { label: "Họ và tên", placeholder: "Nhập họ và tên", type: "text" },
                { label: "Email", placeholder: "example@email.com", type: "email" },
                { label: "Số điện thoại", placeholder: "0901 234 567", type: "tel" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
              ))}
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Môn giảng dạy</label>
                <select className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600" style={{ fontSize: "0.875rem" }}>
                  <option>Chọn môn học</option>
                  <option>Toán</option>
                  <option>Lý</option>
                  <option>Hóa</option>
                  <option>Tiếng Anh</option>
                  <option>Văn</option>
                </select>
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Giới thiệu bản thân</label>
                <textarea
                  rows={4}
                  placeholder="Mô tả kinh nghiệm và phương pháp giảng dạy của bạn..."
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white resize-none"
                  style={{ fontSize: "0.875rem" }}
                />
              </div>
              <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219a54] transition-colors">
                Gửi đăng ký
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
