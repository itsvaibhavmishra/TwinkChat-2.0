import { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import { DEFAULT_AUTH, DEFAULT_DOCS, DEFAULT_PATH } from "../config";
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";
import DocsLayout from "../layouts/docs";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/docs",
      element: <DocsLayout />,
      children: [
        { element: <Navigate to={DEFAULT_DOCS} replace />, index: true },
        { path: "tnc", element: <TnCPage /> },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { element: <Navigate to={DEFAULT_AUTH} replace />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "verify", element: <VerifyPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "contact", element: <ContactPage /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
// app pages
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const ProfilePage = Loadable(lazy(() => import("../pages/dashboard/Profile")));
const ContactPage = Loadable(lazy(() => import("../pages/dashboard/Contact")));

// auth pages
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
const ForgotPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

// docs pages
const TnCPage = Loadable(lazy(() => import("../pages/docs/TnC")));

const Page404 = Loadable(lazy(() => import("../pages/404")));
