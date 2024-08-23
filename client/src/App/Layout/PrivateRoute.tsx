import { Navigate, Outlet } from "react-router";
import { useappselectore } from "../store/configureStore";
export default function PrivateRoute() {
  const { user } = useappselectore((state) => state.Account);
  return user ? <Outlet /> : <Navigate to="Login" />;
}
