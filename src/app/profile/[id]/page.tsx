"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import React from "react";
import { LogOut, MailCheck } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserProfilePage = ({ params }: any) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = axios.get("/api/users/logout");
      await toast.promise(response, {
        loading: "Loading",
        success: "Logout Success",
        error: "Logout Failed",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const response = axios.get("/api/users/verifyemail");
      await toast.promise(response, {
        loading: "Loading",
        success: "Email Sent",
        error: "Problem in sending email",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-screen-md flex flex-col gap-3">
          <Button
            className="self-end"
            variant={"destructive"}
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>
                Profile for user id:{" "}
                <span className="text-blue-600">{params.id}</span>
              </CardTitle>
              <CardDescription>Profile Description</CardDescription>
            </CardHeader>
          </Card>
          <Button
            className="self-center"
            variant={"secondary"}
            onClick={handleVerifyEmail}
          >
            <MailCheck className="mr-2 h-4 w-4" />
            <span>Verify Email</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
