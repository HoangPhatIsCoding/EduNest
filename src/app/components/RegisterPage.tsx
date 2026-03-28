import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { GraduationCap, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"parent" | "tutor" | "student">("parent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
            Tham gia cộng đồng EduNest để trải nghiệm nền tảng giáo dục hiện đại, minh bạch và đáng tin cậy nhất Việt Nam.
          </p>
        </div>
      </div>

      {/* Right side – register form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-[420px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <GraduationCap className="w-8 h-8 text-[#2F80ED]" />
            <span className="text-[#2F80ED]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>EduNest</span>
          </div>

          <div className="mb-6">
            <h1 className="text-gray-900 mb-2" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Đăng ký tài khoản</h1>
            <p className="text-gray-500" style={{ fontSize: "0.9375rem" }}>Tạo tài khoản mới để bắt đầu sử dụng EduNest.</p>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Họ và tên</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
            </div>

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
              <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Mật khẩu</label>
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

            {/* Confirm Password */}
            <div>
              <label className="text-gray-700 block mb-1.5" style={{ fontSize: "0.875rem", fontWeight: 500 }}>Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
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
              Tạo tài khoản
            </button>
          </form>

          <p className="text-center mt-6 text-gray-500" style={{ fontSize: "0.9375rem" }}>
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-[#2F80ED] hover:underline" style={{ fontWeight: 500 }}>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}