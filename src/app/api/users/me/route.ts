import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    console.log(userId);
    const user = await User.findOne({ _id: userId }).select("-password ");
    console.log(user);
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
