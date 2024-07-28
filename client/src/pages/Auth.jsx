import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useUser } from "@/contex";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Auth() {
  const navigate = useNavigate();
  const { loading, isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated && !loading) navigate(`/events`, { replace: true });
  }, [isAuthenticated, loading, navigate]);
  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h1 className="text-2xl md:text-5xl font-extrabold">Login / Register</h1>
      <Tabs defaultValue="login" className="w-[300px] sm:w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Register />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
