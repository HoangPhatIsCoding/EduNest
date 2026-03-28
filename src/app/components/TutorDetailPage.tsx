import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, MapPin, Monitor, ArrowLeft, Calendar, CheckCircle } from "lucide-react";
import { tutors, reviews } from "../data/mockData";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TutorDetailPage() {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));
  const [activeTab, setActiveTab] = useState("intro");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [booked, setBooked] = useState(false);

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4" style={{ fontSize: "1.125rem" }}>Không tìm thấy gia sư</p>
          <Link to="/tutors" className="text-[#2F80ED]">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  const tutorReviews = reviews.filter((r) => r.tutorId === tutor.id);

  const tabs = [
    { key: "intro", label: "Giới thiệu" },
    { key: "experience", label: "Kinh nghiệm" },
    { key: "reviews", label: `Đánh giá (${tutorReviews.length})` },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Back nav */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
          <Link to="/tutors" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2F80ED] transition-colors" style={{ fontSize: "0.875rem" }}>
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách gia sư
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1">
            {/* Profile header */}
            <div className="bg-white rounded-xl border border-border p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <ImageWithFallback
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-28 h-28 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-gray-900 mb-2" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{tutor.name}</h1>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span style={{ fontWeight: 600 }}>{tutor.rating}</span>
                      <span className="text-gray-400" style={{ fontSize: "0.875rem" }}>({tutor.reviewCount} đánh giá)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {tutor.subjects.map((s) => (
                      <span key={s} className="px-3 py-1 bg-blue-50 text-[#2F80ED] rounded-full" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                        {s}
                      </span>
                    ))}
                    {tutor.grades.map((g) => (
                      <span key={g} className="px-3 py-1 bg-green-50 text-[#27AE60] rounded-full" style={{ fontSize: "0.8125rem", fontWeight: 500 }}>
                        {g}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-gray-500" style={{ fontSize: "0.875rem" }}>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {tutor.location}</span>
                    <span className="flex items-center gap-1"><Monitor className="w-4 h-4" /> {tutor.format.join(" / ")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-3.5 transition-colors ${
                      activeTab === tab.key
                        ? "text-[#2F80ED] border-b-2 border-[#2F80ED]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    style={{ fontSize: "0.875rem", fontWeight: 500 }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {activeTab === "intro" && (
                  <div>
                    <h3 className="text-gray-900 mb-3">Giới thiệu bản thân</h3>
                    <p className="text-gray-600 leading-relaxed">{tutor.bio}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-[#F8FAFC] rounded-lg p-4">
                        <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Môn giảng dạy</p>
                        <p className="text-gray-900" style={{ fontWeight: 500 }}>{tutor.subjects.join(", ")}</p>
                      </div>
                      <div className="bg-[#F8FAFC] rounded-lg p-4">
                        <p className="text-gray-400 mb-1" style={{ fontSize: "0.8125rem" }}>Lớp dạy</p>
                        <p className="text-gray-900" style={{ fontWeight: 500 }}>{tutor.grades.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "experience" && (
                  <div>
                    <h3 className="text-gray-900 mb-3">Kinh nghiệm giảng dạy</h3>
                    <p className="text-gray-600 leading-relaxed">{tutor.experience}</p>
                    <div className="mt-6 space-y-3">
                      {["Phương pháp giảng dạy sinh động", "Kiên nhẫn với học sinh", "Theo sát tiến độ học tập", "Tài liệu bổ sung phong phú"].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#27AE60]" />
                          <span style={{ fontSize: "0.875rem" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {tutorReviews.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">Chưa có đánh giá nào</p>
                    ) : (
                      <>
                        {tutorReviews.map((review) => (
                          <div key={review.id} className="border-b border-border pb-4 last:border-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-[#2F80ED]/10 rounded-full flex items-center justify-center text-[#2F80ED]" style={{ fontSize: "0.8125rem", fontWeight: 600 }}>
                                  {review.parentName[0]}
                                </div>
                                <span style={{ fontWeight: 500 }}>{review.parentName}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                  <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-600" style={{ fontSize: "0.875rem" }}>{review.comment}</p>
                            <p className="text-gray-400 mt-1" style={{ fontSize: "0.75rem" }}>{review.date}</p>
                          </div>
                        ))}
                        <div className="pt-2 text-center">
                          <Link
                            to={`/tutors/${tutor.id}/reviews`}
                            className="inline-flex items-center gap-1.5 text-[#2F80ED] hover:underline"
                            style={{ fontSize: "0.875rem", fontWeight: 500 }}
                          >
                            Xem tất cả đánh giá & viết đánh giá
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking card */}
          <div className="lg:w-[360px] flex-shrink-0">
            <div className="bg-white rounded-xl border border-border p-6 lg:sticky lg:top-24">
              <div className="mb-4">
                <span className="text-[#2F80ED]" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                  {tutor.price.toLocaleString("vi-VN")}đ
                </span>
                <span className="text-gray-400" style={{ fontSize: "0.875rem" }}> /khóa</span>
                <span className="text-gray-500 block" style={{ fontSize: "0.875rem", fontStyle: "italic" }}>(gồm 20 giờ học)</span>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-gray-700 mb-1.5 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    <Calendar className="w-4 h-4 inline mr-1" /> Chọn ngày học
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                <div>
                  <label className="text-gray-700 mb-1.5 block" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    <Monitor className="w-4 h-4 inline mr-1" /> Hình thức học
                  </label>
                  <div className="flex gap-2">
                    {tutor.format.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFormat(f)}
                        className={`flex-1 py-2.5 rounded-lg border transition-colors ${
                          selectedFormat === f
                            ? "bg-[#2F80ED] text-white border-[#2F80ED]"
                            : "border-gray-200 text-gray-600 hover:border-[#2F80ED]"
                        }`}
                        style={{ fontSize: "0.875rem" }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {booked ? (
                <div className="bg-green-50 text-[#27AE60] rounded-lg p-4 text-center" style={{ fontSize: "0.875rem" }}>
                  <CheckCircle className="w-6 h-6 mx-auto mb-2" />
                  Đặt lịch thành công! Gia sư sẽ liên hệ với bạn sớm.
                </div>
              ) : (
                <button
                  onClick={() => setBooked(true)}
                  className="w-full py-3 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors"
                >
                  Đặt lịch
                </button>
              )}

              <p className="text-gray-400 text-center mt-3" style={{ fontSize: "0.75rem" }}>
                Miễn phí hủy trong 24 giờ
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}