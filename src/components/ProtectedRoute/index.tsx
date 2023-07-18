import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  children: ReactNode;
};

export default function ProtectedRoute(props: Props): any {
  const { isLoggedIn, children } = props;

  return isLoggedIn ? children : <Navigate to="/login" />;
}
