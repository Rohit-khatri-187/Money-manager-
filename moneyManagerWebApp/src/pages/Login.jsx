import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { assets } from "../assets/assets";
import { validateEmail } from "../util/validation";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../util/axiosUtil";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!email.trim()) {
      setError("Please Enter your email Address :");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please Enter your valid email Address: ");
      setIsLoading(false);
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password");
      setIsLoading(false);
      return;
    }

    setError("");

    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      console.log(response);

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        console.error('Something went wrong',error);
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background image with blur */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back
          </h3>

          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="JohnDoe@example.com"
                type="email"
              />

              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="*********"
                type="password"
              />
            </div>

            {error && (
              <p className="text-red-800 text-sm bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className="flex items-center justify-center bg-blue-500 rounded-md text-white w-full py-3 text-lg font-medium hover:scale-102 transition ease-in hover:bg-blue-700 "
              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5 " />
                  Logging in...
                </>
              ) : (
                "LOGIN"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have create an account?
              <Link
                to="/signup"
                className="font-medium text-blue-500 underline hover:text-blue-700 transition-colors"
              >
                signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
