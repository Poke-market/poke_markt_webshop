import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import React, { JSX } from "react";
import { selectIsAuthenticated } from "../../store/authSlice";
type Props = {
  children: React.ReactNode;
};
const ProtectedAuthRoute = ({ children }: Props): JSX.Element => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedAuthRoute;
