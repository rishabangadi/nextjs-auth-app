"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
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
import { LogIn, UserRoundPlus } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.password.length > 0 &&
      user.email.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup Success", response);
      toast.success("Signup Success");
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 500)
      );
      router.push("/login");
    } catch (error) {
      console.error("SignUp failed: ", error);
      toast.error("Signup Failed");
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
        {isLoading ? (
          <ScaleLoader color="#111827" loading speedMultiplier={1} />
        ) : (
          <Card className="w-[350px]">
            <CardHeader className="text-center">
              <CardTitle className="">Create New Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <Input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Input
                type="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/login">
                <Button variant="secondary">
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Login Page</span>
                </Button>
              </Link>
              <Button onClick={onSignup} disabled={buttonDisabled}>
                <UserRoundPlus className="mr-2 h-4 w-4" />
                <span>Signup Page</span>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
