/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@/contex";
import { Loader2 } from "lucide-react";

function RequireAuth({ children }) {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate("/auth");
  }, [isAuthenticated, loading]);

  if (loading)
    return (
      <div className="fixed top-10 left-10">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (isAuthenticated) return children;
}

export default RequireAuth;
