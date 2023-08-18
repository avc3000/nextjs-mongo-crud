import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoDB.js';

export function GET() {
  connectDB();
  
  return NextResponse.json({
    message: "Hello World!",
  });
}