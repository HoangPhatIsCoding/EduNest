import { Link, Outlet, useLocation } from "react-router";
import {
  LayoutDashboard,
  Calendar,
  Heart,
  MessageCircle,
  User,
  GraduationCap,
} from "lucide-react";

const sidebarItems = [
  { path: "/dashboard", key: "overview", icon: LayoutDashboard, label: "Tổng quan" },
  { path: "/dashboard/schedule", key: "schedule", icon: Calendar, label: "Lịch học" },
  { path: "/dashboard/saved", key: "saved", icon: Heart, label: "Gia sư đã lưu" },
  { path: "/dashboard/messages", key: "messages", icon: MessageCircle, label: "Tin nhắn" },
  { path: "/dashboard/profile", key: "profile", icon: User, label: "Hồ sơ" },
];

export function DashboardPage() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-border flex-shrink-0">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="w-7 h-7 text-[#2F80ED]" />
            <span className="text-[#2F80ED]" style={{ fontSize: "1.125rem", fontWeight: 700 }}>EduNest</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-left ${
                isActive(item.path)
                  ? "bg-[#2F80ED]/10 text-[#2F80ED]"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              style={{ fontSize: "0.875rem" }}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.key === "messages" && (
                <span className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: "0.6875rem" }}>
                  2
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#2F80ED] rounded-full flex items-center justify-center text-white" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
              PH
            </div>
            <div>
              <p className="text-gray-900" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Phụ huynh</p>
              <p className="text-gray-400" style={{ fontSize: "0.75rem" }}>parent@edunest.vn</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden bg-white border-b border-border p-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {sidebarItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0 ${
                  isActive(item.path)
                    ? "bg-[#2F80ED] text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
                style={{ fontSize: "0.8125rem" }}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="p-6 lg:p-8 max-w-[1100px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}