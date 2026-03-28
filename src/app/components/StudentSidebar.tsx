import { Link, useLocation } from "react-router";
import {
  GraduationCap,
  Home,
  Calendar,
  FileText,
  MessageSquare,
  BarChart3,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: Home, label: "Trang chủ", path: "/student" },
  { icon: Calendar, label: "Lịch học", path: "/student/schedule" },
  { icon: BarChart3, label: "Điểm số", path: "/student/grades" },
  { icon: FileText, label: "Tài liệu", path: "/student/documents" },
  { icon: MessageSquare, label: "Tin nhắn", path: "/student/chat" },
  { icon: User, label: "Hồ sơ", path: "/student/profile" },
];

export function StudentSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[260px] bg-white border-r border-border flex flex-col h-screen flex-shrink-0 sticky top-0">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-border">
        <Link to="/" className="flex items-center gap-2.5">
          <GraduationCap className="w-8 h-8 text-[#2F80ED]" />
          <span className="text-[#2F80ED]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            EduNest
          </span>
        </Link>
      </div>

      {/* Student info */}
      <div className="px-6 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-[#F2994A]/10 flex items-center justify-center text-[#F2994A]"
            style={{ fontWeight: 600 }}
          >
            A
          </div>
          <div>
            <p className="text-gray-900" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              Nguyễn Minh Anh
            </p>
            <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>
              Học sinh • Lớp 11
            </p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-auto">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/student"
              ? location.pathname === "/student"
              : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-[#F2994A]/10 text-[#F2994A]"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              style={{ fontSize: "0.9375rem", fontWeight: isActive ? 500 : 400 }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-border">
        <Link
          to="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          style={{ fontSize: "0.9375rem" }}
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </Link>
      </div>
    </aside>
  );
}
