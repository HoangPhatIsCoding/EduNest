import { Calendar, Video, MapPin, ChevronRight } from "lucide-react";
import { upcomingSessions } from "../data/mockData";

export function DashboardSchedulePage() {
  return (
    <>
      <h1 className="text-gray-900 mb-6" style={{ fontSize: "1.5rem", fontWeight: 700 }}>Lịch học</h1>
      <div className="bg-white rounded-xl border border-border divide-y divide-border">
        {upcomingSessions.map((session) => (
          <div key={session.id} className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2F80ED]/10 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#2F80ED]" />
              </div>
              <div>
                <p className="text-gray-900" style={{ fontWeight: 500 }}>{session.subject} - {session.tutorName}</p>
                <p className="text-gray-400" style={{ fontSize: "0.875rem" }}>{session.date} • {session.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full ${session.format === "Online" ? "bg-blue-50 text-[#2F80ED]" : "bg-green-50 text-[#27AE60]"}`} style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                {session.format}
              </span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
