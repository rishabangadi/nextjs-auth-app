"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Key, LogIn, UserRoundPlus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = axios.post("/api/users/login", user);
      await toast.promise(response, {
        loading: "Loading",
        success: "Login Success",
        error: "Login Failed",
      });
      console.log((await response).data);
      router.push(`/profile/${user.email.split("@")[0]}`);
    } catch (error: any) {
      console.error("Login failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onClickForgotPassword = async () => {
    try {
      setIsLoading(true);
      const response = axios.post("/api/users/forgotpassword", {
        email: user.email,
      });
      await toast.promise(response, {
        loading: "Loading",
        success: "Mail sent to your email",
        error: "Mail was not sent",
      });
    } catch (error: any) {
      console.error("Forgot password action failed", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex justify-center items-center min-h-screen py-2">
        <Card className="w-[350px]">
          <CardHeader className="text-center">
            <CardTitle className="">Login to your Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={user.email}
              disabled={isLoading}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={user.password}
              disabled={isLoading}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              <Link href={isLoading ? "#" : "/signup"}>
                <Button variant="secondary" disabled={isLoading}>
                  <UserRoundPlus className="mr-2 h-4 w-4" />
                  <span>Signup Page</span>
                </Button>
              </Link>
              <Button onClick={onLogin} disabled={buttonDisabled || isLoading}>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Button>
            </div>
            <div className="p-6 pb-0">
              <Button
                onClick={onClickForgotPassword}
                disabled={isLoading || !user.email ? true : false}
              >
                <Key className="mr-2 h-4 w-4" />
                <span>Forgot Password</span>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
