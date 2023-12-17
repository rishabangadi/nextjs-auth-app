import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not found" }, { status: 404 });
    }
    //verify password
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword)
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 400 }
      );

    // create a token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
