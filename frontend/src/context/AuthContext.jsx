import { createContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi, signupApi, logoutApi } from "../api/auth";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const signupMutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Signup successfull.");
    },
    onError: () => {
      toast.error("Signup failed. Try again");
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Login successfull");
    },
    onError: () => toast.error("Login failed. Try again"),
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logout successfull");
    },
    onError: () => toast.error("Logout failed. Try again"),
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        signup: signupMutation.mutate,
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        signupStatus: {
          isLoading: signupMutation.isLoading,
          isError: signupMutation.isError,
          error: signupMutation.error,
        },
        loginStatus: {
          isLoading: loginMutation.isLoading,
          isError: loginMutation.isError,
          error: loginMutation.error,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
