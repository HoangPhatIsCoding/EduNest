import { useState } from "react";
import { useParams, Link } from "react-router";
import { Star, ArrowLeft, CheckCircle, ThumbsUp } from "lucide-react";
import { tutors, reviews as allReviews } from "../data/mockData";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function TutorReviewPage() {
  const { id } = useParams();
  const tutor = tutors.find((t) => t.id === Number(id));

  const [reviewList, setReviewList] = useState(
    allReviews.filter((r) => r.tutorId === Number(id))
  );
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!tutor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4" style={{ fontSize: "1.125rem" }}>
            Không tìm thấy gia sư
          </p>
          <Link to="/tutors" className="text-[#2F80ED]">
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const avgRating =
    reviewList.length > 0
      ? (
          reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length
        ).toFixed(1)
      : tutor.rating.toFixed(1);

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviewList.filter((r) => r.rating === star).length,
    percentage:
      reviewList.length > 0
        ? (reviewList.filter((r) => r.rating === star).length /
            reviewList.length) *
          100
        : 0,
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRating || !reviewTitle.trim() || !reviewContent.trim()) return;

    const newReview = {
      id: reviewList.length + 100,
      tutorId: tutor.id,
      parentName: "Bạn",
      parentInitial: "B",
      rating: selectedRating,
      title: reviewTitle,
      comment: reviewContent,
      date: new Date().toISOString().split("T")[0],
    };

    setReviewList([newReview, ...reviewList]);
    setSelectedRating(0);
    setReviewTitle("");
    setReviewContent("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Back nav */}
      <div className="bg-white border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 py-4">
          <Link
            to={`/tutors/${tutor.id}`}
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#2F80ED] transition-colors"
            style={{ fontSize: "0.875rem" }}
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại hồ sơ gia sư
          </Link>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-8">
        {/* Page title */}
        <h1
          className="text-gray-900 mb-6"
          style={{ fontSize: "1.75rem", fontWeight: 700 }}
        >
          Đánh giá gia sư
        </h1>

        {/* Tutor info card */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <ImageWithFallback
              src={tutor.avatar}
              alt={tutor.name}
              className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <h2
                className="text-gray-900 mb-1"
                style={{ fontSize: "1.25rem", fontWeight: 600 }}
              >
                {tutor.name}
              </h2>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {tutor.subjects.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-0.5 bg-blue-50 text-[#2F80ED] rounded-full"
                    style={{ fontSize: "0.75rem", fontWeight: 500 }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span
                    className="text-gray-900"
                    style={{ fontSize: "1.125rem", fontWeight: 700 }}
                  >
                    {avgRating}
                  </span>
                </div>
                <span
                  className="text-gray-400"
                  style={{ fontSize: "0.875rem" }}
                >
                  từ {reviewList.length} đánh giá
                </span>
              </div>
            </div>

            {/* Rating distribution */}
            <div className="hidden md:block w-[220px] flex-shrink-0">
              {ratingDistribution.map((item) => (
                <div
                  key={item.star}
                  className="flex items-center gap-2 mb-1"
                >
                  <span
                    className="text-gray-500 w-6 text-right"
                    style={{ fontSize: "0.8125rem" }}
                  >
                    {item.star}
                  </span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span
                    className="text-gray-400 w-6"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review form */}
        <div className="bg-white rounded-xl border border-border p-6 mb-8 shadow-sm">
          <h3
            className="text-gray-900 mb-5"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Viết đánh giá
          </h3>

          {submitted && (
            <div
              className="flex items-center gap-2 bg-green-50 text-[#27AE60] rounded-lg p-3 mb-5"
              style={{ fontSize: "0.875rem" }}
            >
              <CheckCircle className="w-5 h-5" />
              Đánh giá của bạn đã được gửi thành công!
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-5">
            {/* Star rating input */}
            <div>
              <label
                className="text-gray-700 block mb-2"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Đánh giá của bạn
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setSelectedRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoverRating || selectedRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  </button>
                ))}
                {selectedRating > 0 && (
                  <span
                    className="ml-2 text-gray-500"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {selectedRating === 1 && "Kém"}
                    {selectedRating === 2 && "Trung bình"}
                    {selectedRating === 3 && "Khá"}
                    {selectedRating === 4 && "Tốt"}
                    {selectedRating === 5 && "Xuất sắc"}
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label
                className="text-gray-700 block mb-1.5"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Tiêu đề đánh giá
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Tóm tắt trải nghiệm của bạn"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>

            {/* Content */}
            <div>
              <label
                className="text-gray-700 block mb-1.5"
                style={{ fontSize: "0.875rem", fontWeight: 500 }}
              >
                Nội dung đánh giá
              </label>
              <textarea
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
                rows={4}
                placeholder="Chia sẻ trải nghiệm học với gia sư này..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white resize-none focus:border-[#2F80ED] focus:ring-2 focus:ring-[#2F80ED]/20 transition-all"
                style={{ fontSize: "0.9375rem" }}
              />
            </div>

            <button
              type="submit"
              disabled={!selectedRating || !reviewTitle.trim() || !reviewContent.trim()}
              className="px-8 py-3 bg-[#2F80ED] text-white rounded-xl hover:bg-[#2563d4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-[#2F80ED]/20"
              style={{ fontSize: "0.9375rem" }}
            >
              Gửi đánh giá
            </button>
          </form>
        </div>

        {/* Reviews list */}
        <div>
          <h3
            className="text-gray-900 mb-5"
            style={{ fontSize: "1.125rem", fontWeight: 600 }}
          >
            Tất cả đánh giá ({reviewList.length})
          </h3>

          {reviewList.length === 0 ? (
            <div className="bg-white rounded-xl border border-border p-12 text-center">
              <p className="text-gray-400">Chưa có đánh giá nào</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviewList.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            review.parentInitial === "B"
                              ? "#2F80ED15"
                              : `hsl(${review.parentName.charCodeAt(0) * 37 % 360}, 45%, 92%)`,
                          color:
                            review.parentInitial === "B"
                              ? "#2F80ED"
                              : `hsl(${review.parentName.charCodeAt(0) * 37 % 360}, 55%, 40%)`,
                          fontSize: "0.875rem",
                          fontWeight: 600,
                        }}
                      >
                        {review.parentInitial}
                      </div>
                      <div>
                        <p
                          className="text-gray-900"
                          style={{ fontWeight: 500 }}
                        >
                          {review.parentName}
                        </p>
                        <p
                          className="text-gray-400"
                          style={{ fontSize: "0.75rem" }}
                        >
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <h4
                    className="text-gray-900 mb-1.5"
                    style={{ fontSize: "0.9375rem", fontWeight: 600 }}
                  >
                    {review.title}
                  </h4>
                  <p
                    className="text-gray-600 leading-relaxed"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {review.comment}
                  </p>

                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-4">
                    <button
                      className="flex items-center gap-1.5 text-gray-400 hover:text-[#2F80ED] transition-colors"
                      style={{ fontSize: "0.8125rem" }}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" /> Hữu ích
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
