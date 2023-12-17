"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ScaleLoader } from "react-spinners";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const router = useRouter();

  const verifyEmail = async function (token: string) {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      toast.success("Email Verified");
      router.push("/profile");
    } catch (error) {
      console.error("Email verification failed", error);
      toast.error("Email Verification Failed");
    } finally {
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    if (urlToken?.length > 0) verifyEmail(urlToken);
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="flex min-h-screen justify-center items-center">
        <ScaleLoader color="#111827" loading speedMultiplier={1} />
      </div>
    </>
  );
}
