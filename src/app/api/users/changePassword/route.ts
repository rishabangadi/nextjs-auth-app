import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const { userId, password } = await request.json();
    const hashedPassword = await bcryptjs.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    return NextResponse.json(
      { message: "Password changed successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
