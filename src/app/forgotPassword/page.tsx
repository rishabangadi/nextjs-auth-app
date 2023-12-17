"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link, UserRoundPlus, LogIn, Key, SendHorizonal } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";

const Page = () => {
  const [isVerified, setIsVerified] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    id: "",
    password: "",
  });

  const verifyUser = async (token: string) => {
    try {
      const response = await axios.post("/api/users/forgotPasswordToken", {
        token,
      });
      console.log(response.data.userId);
      setIsVerified(true);
      setUser({
        id: response.data.userId,
        password: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    verifyUser(token);
  }, []);

  const onSubmit = async () => {
    try {
      const response = axios.post("/api/users/changePassword", {
        userId: user.id,
        password: user.password,
      });
      await toast.promise(response, {
        loading: "Loading",
        success: "Password changed",
        error: "Failed",
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
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
        {!isVerified ? (
          <ScaleLoader color="#111827" loading speedMultiplier={1} />
        ) : (
          <Card className="w-[350px]">
            <CardHeader className="text-center">
              <CardTitle className="">Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                type="password"
                placeholder="Password"
                value={user.password}
                disabled={isLoading}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex justify-end w-full">
                <Button
                  onClick={onSubmit}
                  disabled={user.password ? false : true || isLoading}
                >
                  <SendHorizonal className="mr-2 h-4 w-4" />
                  <span>Submit</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
};

export default Page;
