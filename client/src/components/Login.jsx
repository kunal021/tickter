import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { z } from "zod";
import Error from "./Error";
import { Loader } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://tickter.onrender.com/login",
        formData
      );

      if (response.status === 200) {
        const { user } = response.data.data;
        const session = response.data.session;

        sessionStorage.setItem("session", JSON.stringify(session));
        sessionStorage.setItem("user", JSON.stringify(user));
        toast.success("Login Successful");
        navigate("/events");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setErrors({});
    try {
      loginSchema.parse(formData);
      await login();
    } catch (validationErrors) {
      if (validationErrors instanceof z.ZodError) {
        const fieldErrors = {};
        validationErrors.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ form: "Something went wrong, please try again." });
      }
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {errors && <Error message={errors.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            name="email"
            type="email"
            placeholder="Enter Email"
            onChange={handleInputChange}
          />
        </div>
        {errors.email && <Error message={errors.email} />}
        <div className="space-y-1">
          <Input
            name="password"
            type="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
          />
        </div>
        {errors.password && <Error message={errors.password} />}
      </CardContent>
      <CardFooter>
        <Button onClick={handleLogin} className="w-full">
          {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
