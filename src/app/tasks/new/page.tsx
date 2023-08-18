"use client"
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

const FormPage = () => {
  const [newTask, setNewTask] = useState({title: "", description: ""});
  const router = useRouter();
  const params = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewTask({ ...newTask, [e.target.name]: e.target.value });
  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (params.id) getTask();
  }, []);  

  const createTask = async () => {
    try {
      const res = await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(newTask), headers: { "Content-Type": "application/json" } });
      if (res.status === 200) {
        router.push('/');
        router.refresh();
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  const updateTask = async () => {
    await fetch(`/api/tasks/${params.id}`, { method: 'PUT', body: JSON.stringify(newTask), headers: { "Content-Type": "application/json" }});
    router.push('/');
    router.refresh();
  };

  const handleSubmit = async (e: FormEvent) => { 
    e.preventDefault(); 
    
    if (!params.id) {
      await createTask();
    } else {
      await updateTask();
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/api/tasks/${params.id}`, { method: 'DELETE' });
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className='flex justify-center'>
          <h1 className='font-bold text-3xl text-center my-3'>
          {
            !params.id ? "CREATE NEW TASK" : "UPDATE NEW TASK"
          }
          </h1>
        </header>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} value={newTask.title} className="bg-gray-800 border-2 w-full p-4 rounded-lg my-2" />
        <textarea name="description" placeholder="Description" rows={3} onChange={handleChange} value={newTask.description} className="bg-gray-800 border-2 w-full p-4 rounded-lg my-2"></textarea>
        <button type='submit' className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 w-full rounded-lg my-2">
          {
            !params.id ? "Create" : "Update"
          }
        </button>
        {
          params.id ? <button type='button' onClick={handleDelete} className='bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 w-full rounded-lg my-3'>Delete</button> : null
        }
      </form>
    </div>
  )
}

export default FormPage;