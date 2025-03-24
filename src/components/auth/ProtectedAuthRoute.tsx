import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import React, { JSX } from "react";

type Props = {
  children: React.ReactNode;
};
const ProtectedAuthRoute = ({ children }: Props): JSX.Element => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedAuthRoute;
