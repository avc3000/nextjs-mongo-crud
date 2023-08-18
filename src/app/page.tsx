import { connectDB } from '@/utils/mongoDB.js';
import Task from '@/models/Task';
import TaskCard from '@/components/TaskCard';

async function loadTask() {
  connectDB();
  const tasks = await Task.find();

  return tasks;
}

 async function Home() {
  const tasks = await loadTask();

  return (
    <div className='grid grid-cols-3 gap-2 mt-4'>
      {
        tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))
      }
    </div>
  )
}

export default Home;