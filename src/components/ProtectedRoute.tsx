import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { storage } from "../lib/storage";
import { AuthContext } from "../context/AuthContext";

/**
 * TODO 3 :: Add a better way to handle the central storage for authenticated user throughout the application
 *
 * - Context API
 * - DONE
 */
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
