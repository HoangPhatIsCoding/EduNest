import { useState } from "react";
import {
  Camera,
  Save,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Star,
  Users,
} from "lucide-react";
import { TutorSidebar } from "./TutorSidebar";

export function TutorProfilePage() {
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Nguyễn Thị Mai");
  const [email, setEmail] = useState("mai.nguyen@edunest.vn");
  const [phone, setPhone] = useState("0909 123 456");
  const [location, setLocation] = useState("Quận 1, TP. Hồ Chí Minh");
  const [bio, setBio] = useState(
    "Giáo viên Toán - Lý với hơn 8 năm kinh nghiệm giảng dạy tại các trường THPT hàng đầu TP.HCM. Tốt nghiệp Đại học Sư phạm TP.HCM, chuyên ngành Sư phạm Toán."
  );
  const [subjects] = useState(["Toán", "Lý"]);
  const [price, setPrice] = useState("250000");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <TutorSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 py-8">
          <h1 className="text-gray-900 mb-8" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
            Hồ sơ cá nhân
          </h1>

          {saved && (
            <div
              className="flex items-center gap-2 bg-green-50 text-[#27AE60] rounded-xl p-4 mb-6"
              style={{ fontSize: "0.875rem" }}
            >
              <CheckCircle className="w-5 h-5" />
              Thông tin đã được lưu thành công!
            </div>
          )}

          {/* Profile stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { icon: Star, label: "Đánh giá", value: "4.9 ★", color: "#F59E0B" },
              { icon: Users, label: "Học sinh", value: "4", color: "#2F80ED" },
              { icon: BookOpen, label: "Buổi dạy", value: "86", color: "#27AE60" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl border border-border p-4 flex items-center gap-3 shadow-sm"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color + "15" }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                    {stat.label}
                  </p>
                  <p className="text-gray-900" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Avatar section */}
          <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-sm">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]"
                  style={{ fontSize: "2rem", fontWeight: 700 }}
                >
                  M
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2F80ED] rounded-full flex items-center justify-center text-white shadow-sm">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <p className="text-gray-900 mb-0.5" style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                  {name}
                </p>
                <div className="flex items-center gap-2">
                  {subjects.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-0.5 bg-blue-50 text-[#2F80ED] rounded-full"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm">
            <h2 className="text-gray-900 mb-5" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              Thông tin cá nhân
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    <Mail className="w-4 h-4 inline mr-1.5" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    <Phone className="w-4 h-4 inline mr-1.5" />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
                <div>
                  <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    <MapPin className="w-4 h-4 inline mr-1.5" />
                    Khu vực
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                    style={{ fontSize: "0.9375rem" }}
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Giá dạy (VNĐ/giờ)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full max-w-[200px] px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Giới thiệu bản thân
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>

              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors shadow-sm"
                style={{ fontSize: "0.9375rem" }}
              >
                <Save className="w-4 h-4" />
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
