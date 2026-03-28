import { useState } from "react";
import { User, Mail, Phone, MapPin, BookOpen, Save, Camera, GraduationCap } from "lucide-react";
import { StudentSidebar } from "./StudentSidebar";

export function StudentProfilePage() {
  const [name, setName] = useState("Nguyễn Minh Anh");
  const [email, setEmail] = useState("minhanh.nguyen@email.com");
  const [phone, setPhone] = useState("0912 345 678");
  const [school, setSchool] = useState("THPT Lê Hồng Phong");
  const [grade, setGrade] = useState("Lớp 11");
  const [address, setAddress] = useState("Quận 1, TP.HCM");
  const [bio, setBio] = useState("Em thích học Toán và Tiếng Anh. Mục tiêu của em là đỗ vào Đại học Bách Khoa TP.HCM.");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <StudentSidebar />

      <main className="flex-1 overflow-auto">
        <div className="max-w-[800px] mx-auto px-6 sm:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-gray-900 mb-1" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Hồ sơ cá nhân</h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Quản lý thông tin cá nhân của em</p>
          </div>

          {/* Avatar */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#F2994A]/10 flex items-center justify-center text-[#F2994A]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                  A
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#F2994A] text-white rounded-full flex items-center justify-center shadow-md hover:bg-[#e8882f] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <p className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>{name}</p>
                <p className="text-gray-500" style={{ fontSize: "0.875rem" }}>Học sinh • {grade} • {school}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6 mb-6">
            <h2 className="text-gray-900 mb-5" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>Thông tin cá nhân</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <User className="w-4 h-4 inline mr-1.5" />Họ và tên
                </label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }} />
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <Mail className="w-4 h-4 inline mr-1.5" />Email
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }} />
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <Phone className="w-4 h-4 inline mr-1.5" />Số điện thoại
                </label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }} />
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <GraduationCap className="w-4 h-4 inline mr-1.5" />Trường
                </label>
                <input type="text" value={school} onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }} />
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <BookOpen className="w-4 h-4 inline mr-1.5" />Lớp
                </label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] appearance-none"
                  style={{ fontSize: "0.9375rem" }}>
                  {["Lớp 6","Lớp 7","Lớp 8","Lớp 9","Lớp 10","Lớp 11","Lớp 12"].map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  <MapPin className="w-4 h-4 inline mr-1.5" />Địa chỉ
                </label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }} />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Giới thiệu bản thân</label>
              <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#F2994A] focus:ring-1 focus:ring-[#F2994A]/20 transition-all resize-none"
                style={{ fontSize: "0.9375rem" }} />
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#F2994A] text-white rounded-xl hover:bg-[#e8882f] transition-colors shadow-sm"
                style={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                <Save className="w-4 h-4" /> Lưu thay đổi
              </button>
              {saved && (
                <span className="text-[#27AE60]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Đã lưu thành công!
                </span>
              )}
            </div>
          </div>

          {/* My tutors */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-6">
            <h2 className="text-gray-900 mb-4" style={{ fontSize: "1.0625rem", fontWeight: 600 }}>Gia sư của em</h2>
            <div className="space-y-3">
              {[
                { name: "Nguyễn Thị Mai", subject: "Toán, Lý", sessions: 24, initial: "M" },
                { name: "Trần Văn Hùng", subject: "Tiếng Anh", sessions: 18, initial: "H" },
              ].map((t) => (
                <div key={t.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2F80ED]/10 flex items-center justify-center text-[#2F80ED]" style={{ fontWeight: 600 }}>
                      {t.initial}
                    </div>
                    <div>
                      <p className="text-gray-900" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>{t.name}</p>
                      <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>{t.subject} • {t.sessions} buổi</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
