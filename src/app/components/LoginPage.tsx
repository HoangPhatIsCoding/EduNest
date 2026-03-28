import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"parent" | "tutor" | "student">("parent");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "tutor") {
      navigate("/tutor-dashboard");
    } else if (role === "student") {
      navigate("/student");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* Left side – branding & illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2F80ED] to-[#1a5fbb] flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] bg-white/5 rounded-full" />
        <div className="absolute bottom-[-120px] right-[-60px] w-[400px] h-[400px] bg-white/5 rounded-full" />
        <div className="absolute top-[40%] right-[10%] w-[150px] h-[150px] bg-white/5 rounded-full" />

        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <GraduationCap className="w-10 h-10 text-white" />
            <span className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>EduNest</span>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl mb-8">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1765812515298-f299f9e29b68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBjbGFzc3Jvb20lMjBpbGx1c3RyYXRpb24lMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzI2ODUwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Education illustration"
              className="w-full h-[280px] object-cover"
            />
          </div>

          <h2 className="text-white mb-3" style={{ fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.4 }}>
            Kết nối gia đình và gia sư uy tín
          </h2>
          <p className="text-blue-200" style={{ fontSize: "0.9375rem" }}>
            Nền tảng giáo dục hàng đầu Việt Nam giúp phụ huynh tìm gia sư phù hợp cho con một cách dễ dàng và minh bạch.
          </p>

          <div className="flex justify-center gap-6 mt-8 text-blue-100" style={{ fontSize: "0.8125rem" }}>
            <span>500+ Gia sư</span>
            <span>•</span>
            <span>2,500+ Phụ huynh</span>
            <span>•</span>
            <span>4.8★ Đánh giá</span>
          </div>
        </div>
      </div>

      {/* Right side – login form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="w-8 h-8 text-[#2F80ED]" />
            <span className="text-[#2F80ED]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>EduNest</span>
          </div>

          <div className="mb-8">
            <h1 className="text-gray-900 mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Đăng nhập</h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Chào mừng bạn quay lại! Vui lòng đăng nhập để tiếp tục.</p>
          </div>

          {/* Role selection */}
          <div className="flex rounded-xl bg-gray-100 p-1 mb-6">
            <button
              type="button"
              onClick={() => setRole("parent")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                role === "parent"
                  ? "bg-white text-[#2F80ED] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontSize: "0.9375rem", fontWeight: 500 }}
            >
              Phụ huynh
            </button>
            <button
              type="button"
              onClick={() => setRole("tutor")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                role === "tutor"
                  ? "bg-white text-[#27AE60] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontSize: "0.9375rem", fontWeight: 500 }}
            >
              Gia sư
            </button>
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                role === "student"
                  ? "bg-white text-[#F2994A] shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ fontSize: "0.9375rem", fontWeight: 500 }}
            >
              Học sinh
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-700" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Mật khẩu</label>
                <a href="#" className="text-[#2F80ED] hover:underline" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className={`w-full py-3 text-white rounded-xl transition-colors shadow-sm ${
                role === "tutor"
                  ? "bg-[#27AE60] hover:bg-[#219a54] shadow-[#27AE60]/25"
                  : role === "student"
                  ? "bg-[#F2994A] hover:bg-[#e8882f] shadow-[#F2994A]/25"
                  : "bg-[#2F80ED] hover:bg-[#2563d4] shadow-[#2F80ED]/25"
              }`}
              style={{ fontSize: "0.9375rem" }}
            >
              Đăng nhập
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-gray-400" style={{ fontSize: "0.8125rem" }}>hoặc</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
              style={{ fontSize: "0.9375rem" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Đăng nhập với Google
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500" style={{ fontSize: "0.9375rem" }}>
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-[#2F80ED] hover:underline" style={{ fontWeight: 500 }}>
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}