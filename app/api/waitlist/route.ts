import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
const redis = Redis.fromEnv();
export async function POST(req: Request){
  const { email } = await req.json();
  await redis.sadd("waitlist", email);
  return NextResponse.json({success:true});
}
export async function GET(){
  const emails = await redis.smembers("waitlist");
  return NextResponse.json({count: emails.length, emails});
}
