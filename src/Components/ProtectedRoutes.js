import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const profile = JSON.parse(sessionStorage.getItem("profile"));
    if (profile) {
        return (
            <Outlet />
        );
    } else {
        return <Navigate to="/" />;
    }
}
export default ProtectedRoutes;