import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-7 h-7 text-[#2F80ED]" />
              <span className="text-white" style={{ fontSize: "1.125rem", fontWeight: 700 }}>EduNest</span>
            </div>
            <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>
              Nền tảng kết nối phụ huynh và gia sư uy tín hàng đầu Việt Nam.
            </p>
          </div>
          <div>
            <h4 className="text-white mb-3">Về EduNest</h4>
            <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <li><a href="#" className="hover:text-white transition-colors">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-3">Hỗ trợ</h4>
            <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <li><a href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trung tâm trợ giúp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-3">Liên hệ</h4>
            <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@edunest.vn
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> 0901 234 567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> TP. Hồ Chí Minh, Việt Nam
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 text-center text-gray-500" style={{ fontSize: "0.875rem" }}>
          © 2026 EduNest. Tất cả quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
