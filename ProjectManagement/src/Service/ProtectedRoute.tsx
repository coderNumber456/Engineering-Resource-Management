import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { service } from "./service";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

 

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await service.getCurrentUser();
        if (user && user.data.role === "manager") {  
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

  

    checkUser();
  }, []);

  if (isLoading) {
    return <div className="text-white text-center mt-10">Checking authentication...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
