"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

export const UserProfilePage = () => {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    isAdmin: false,
    isVerified: false,
  });

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("/api/users/me");
      console.log(data.data.data);
      setUser({
        id: data.data.data._id,
        username: data.data.data.username,
        email: data.data.data.email,
        isAdmin: data.data.data.isAdmin,
        isVerified: data.data.data.isVerified,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md flex flex-col gap-3">
        {user.id ? (
          <Card className="">
            <CardHeader>
              <CardTitle className="text-center mb-4">User Details</CardTitle>

              <h2>
                ID : <span className="text-blue-600">{user.id}</span>
              </h2>
              <h2>
                Username :{" "}
                <span className="text-blue-600">{user.username}</span>
              </h2>
              <h2>
                Email : <span className="text-blue-600">{user.email}</span>
              </h2>
            </CardHeader>
          </Card>
        ) : (
          <ScaleLoader color="#111827" loading speedMultiplier={1} />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
