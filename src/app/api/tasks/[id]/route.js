import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoDB.js';
import Task from '@/models/Task';

export async function GET(req, { params }) {
  try {
    connectDB();
    const taskFound = await Task.findById(params.id);

    if (!taskFound) 
      return NextResponse.json({ message: 'Task not found' }, { status: 404 });
    
    return NextResponse.json(taskFound);
  }
  catch (err) {
    return NextResponse.json(err.message, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id);

    if (!taskDeleted)
      return NextResponse.json({ message: "Task not Found" }, { status: 404 });

    return NextResponse.json(taskDeleted);
  }
  catch (err) {
    return NextResponse.json(err.message, { status: 400 });
  }
}

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const updatedTask = await Task.findByIdAndUpdate(params.id, data, { new: true });

    return NextResponse.json(updatedTask);
  }
  catch (err) {
    return NextResponse.json(err.message, { status: 400 });
  }
}