export function DashboardProfilePage() {
  return (
    <>
      <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Hồ sơ</h1>
      <div className="bg-white rounded-xl border border-border p-6 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center text-white" style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            PH
          </div>
          <div>
            <p className="text-gray-900" style={{ fontSize: "1.125rem", fontWeight: 600 }}>Nguyễn Văn An</p>
            <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>Phụ huynh</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { label: "Email", value: "parent@edunest.vn" },
            { label: "Số điện thoại", value: "0901 234 567" },
            { label: "Địa chỉ", value: "Quận 1, TP. Hồ Chí Minh" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-gray-400 block mb-1" style={{ fontSize: "0.8125rem", fontWeight: 400 }}>{field.label}</label>
              <input
                type="text"
                defaultValue={field.value}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white"
                style={{ fontSize: "0.875rem" }}
              />
            </div>
          ))}
        </div>
        <button className="mt-6 px-6 py-2.5 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563d4] transition-colors" style={{ fontSize: "0.875rem" }}>
          Lưu thay đổi
        </button>
      </div>
    </>
  );
}
