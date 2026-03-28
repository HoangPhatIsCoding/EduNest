import { Link, useLocation } from "react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/tutors", label: "Tìm gia sư" },
    { to: "/become-tutor", label: "Trở thành gia sư" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-[#2F80ED]" />
          <span className="text-[#2F80ED]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>EduNest</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors ${
                isActive(link.to)
                  ? "text-[#2F80ED]"
                  : "text-gray-600 hover:text-[#2F80ED]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-600 hover:text-[#2F80ED] transition-colors"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors"
          >
            Đăng ký
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-border px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block py-2 text-gray-600 hover:text-[#2F80ED]"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link to="/login" className="py-2 text-gray-600" onClick={() => setMobileOpen(false)}>
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="py-2 bg-[#2F80ED] text-white rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}