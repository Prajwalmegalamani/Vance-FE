import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import loginApi from "../api/login";
import { storage } from "../lib/storage";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {
    mutate: login,
    isPending,
    error: loginError,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi().login,
    onSuccess: (data) => {
      handleLogin(data);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    const user = storage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSignIn = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    login({ email, password });
  };

  return (
    <div className="h-full w-full flex flex-col flex-1 justify-center items-center bg-[#111111] overflow-hidden">
      <p className="text-[2rem] font-bold text-white mb-2">
        Sign in to Access Dashboard
      </p>
      <form
        onSubmit={(e) => handleSignIn(e)}
        className="relative w-1/4 h-auto flex flex-col items-center justify-center gap-4 text-white text-center shadow-2xl
        bg-[#222222] bg-opacity-45  p-6 rounded-xl"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          className="w-full bg-[#333333] text-white p-4 rounded-md tracking-tight focus:outline-none focus:ring-1 focus:ring-green-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          className="w-full bg-[#333333] text-white p-4 rounded-md tracking-tight focus:outline-none focus:ring-1 focus:ring-green-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="text-sm flex justify-start items-start pt-1 text-red-500">
            {error}
          </div>
        )}
        <p className="text-base text-white text-opacity-50 mt-6 z-10">
          By creating an account or signing in, you agree to our{" "}
          <span className="font-semibold underline">Terms and Conditions</span>
        </p>
        <button
          onClick={(e) => handleSignIn(e)}
          className="w-full flex flex-row justify-center items-center gap-4 bg-[#333333] text-white font-semibold py-4 px-8 rounded-full hover:bg-[#efedfa3a] z-10"
        >
          <MdOutlineLogin className="text-xl" />
          {isPending ? <p>Signing in...</p> : <p>Sign in</p>}
        </button>
      </form>
    </div>
  );
};

export default SignInPage;
