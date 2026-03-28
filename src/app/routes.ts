import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LandingPage } from "./components/LandingPage";
import { TutorListingPage } from "./components/TutorListingPage";
import { TutorDetailPage } from "./components/TutorDetailPage";
import { DashboardPage } from "./components/DashboardPage";
import { DashboardOverviewPage } from "./components/DashboardOverviewPage";
import { DashboardSchedulePage } from "./components/DashboardSchedulePage";
import { DashboardSavedPage } from "./components/DashboardSavedPage";
import { DashboardMessagesPage } from "./components/DashboardMessagesPage";
import { DashboardProfilePage } from "./components/DashboardProfilePage";
import { ChatPage } from "./components/ChatPage";
import { BecomeTutorPage } from "./components/BecomeTutorPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { TutorReviewPage } from "./components/TutorReviewPage";
import { TutorDashboardPage } from "./components/TutorDashboardPage";
import { TutorSchedulePage } from "./components/TutorSchedulePage";
import { TutorStudentsPage } from "./components/TutorStudentsPage";
import { TutorProfilePage } from "./components/TutorProfilePage";
import { TutorChatPage } from "./components/TutorChatPage";
import { LessonDetailPage } from "./components/LessonDetailPage";
import { MaterialPage } from "./components/MaterialPage";
import { ParentManagementPage } from "./components/ParentManagementPage";
import { StudentDashboardPage } from "./components/StudentDashboardPage";
import { StudentSchedulePage } from "./components/StudentSchedulePage";
import { StudentGradesPage } from "./components/StudentGradesPage";
import { StudentDocumentsPage } from "./components/StudentDocumentsPage";
import { StudentChatPage } from "./components/StudentChatPage";
import { StudentProfilePage } from "./components/StudentProfilePage";
import { ClassroomPage } from "./components/ClassroomPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "tutors", Component: TutorListingPage },
      { path: "tutors/:id", Component: TutorDetailPage },
      { path: "tutors/:id/reviews", Component: TutorReviewPage },
      { path: "become-tutor", Component: BecomeTutorPage },
    ],
  },
  { path: "/login", Component: LoginPage },
  { path: "/register", Component: RegisterPage },
  // Parent routes
  {
    path: "/dashboard",
    Component: DashboardPage,
    children: [
      { index: true, Component: DashboardOverviewPage },
      { path: "schedule", Component: DashboardSchedulePage },
      { path: "saved", Component: DashboardSavedPage },
      { path: "messages", Component: DashboardMessagesPage },
      { path: "profile", Component: DashboardProfilePage },
    ],
  },
  { path: "/dashboard/manage", Component: ParentManagementPage },
  { path: "/chat", Component: ChatPage },
  // Tutor routes
  { path: "/tutor-dashboard", Component: TutorDashboardPage },
  { path: "/tutor-dashboard/schedule", Component: TutorSchedulePage },
  { path: "/tutor-dashboard/students", Component: TutorStudentsPage },
  { path: "/tutor-dashboard/profile", Component: TutorProfilePage },
  { path: "/tutor-dashboard/chat", Component: TutorChatPage },
  { path: "/tutor-dashboard/lesson/:id", Component: LessonDetailPage },
  { path: "/tutor-dashboard/materials", Component: MaterialPage },
  { path: "/tutor-dashboard/classroom/:meetingId", Component: ClassroomPage },
  // Student routes
  { path: "/student", Component: StudentDashboardPage },
  { path: "/student/schedule", Component: StudentSchedulePage },
  { path: "/student/grades", Component: StudentGradesPage },
  { path: "/student/documents", Component: StudentDocumentsPage },
  { path: "/student/chat", Component: StudentChatPage },
  { path: "/student/profile", Component: StudentProfilePage },
  { path: "/student/classroom/:meetingId", Component: ClassroomPage },
]);
