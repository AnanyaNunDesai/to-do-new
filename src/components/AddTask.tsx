import { useRef, useState } from "react";
import * as React from 'react'
import Bee1 from './../assets/bee1.png'
import Bee5 from './../assets/bee5.gif'
import Bee6 from './../assets/bee6.gif'

interface AddTaskProps {
  tasks: string[]; 
  setTasks: (tasks: string[]) => void; 
}

const AddTask: React.FC<AddTaskProps> = ({ tasks, setTasks }) => {
  const [task, setTask] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  // add task handler event
  const addTaskHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // post task into server
    taskPosting(task);
    inputRef.current?.blur();
    setTask("");
  };

  // task posting
  // use "text"
  const taskPosting = async (text: string) => {
    const res = await fetch("http://localhost:3001/api/tasks/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    // real-time data updation
    setTasks([...tasks, data]);
  };

  return (
    <div>
      <img
        src={Bee1}
        alt='Bee1'
        className="fixed ml-28 top-28"
      />
      <img
        src={Bee5}
        alt='Bee5'
        className="fixed right-28 top-40 ml-28"
      />
      <div
        className="font-['Open_Sans'] text-yellow-700 bg-yellow-300 mb-20 
            p-5 container mx-auto flex flex-col gap-5 justify-center rounded-lg items-center
             md:justify-between lg:max-w-xl"
      >
        <img
          src={Bee6}
          alt='Bee6'
          className="w-10"
        />
        <h1>Tasks To Be Completed</h1>
      </div>
      <form
        className='bg-orange-300 p-10 container mx-auto flex flex-col gap-5 
                justify-center rounded-lg items-center md:flex-row md:justify-between lg:max-w-4xl'
        onSubmit={addTaskHandler}
      >
        <input
          ref={inputRef}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
          type='text'
          placeholder='Start Typing'
          className='bg-yellow-300 outline-none rounded-lg border-b-2 
                border-yellow-500 py-2 px-5 text-orange-900 text-center 
                md:text-left focus:border-orange-900 duration-300'
        />
        <button
          type='submit'
          className='rounded-lg border-2 border-yellow-500 
                py-2 px-5 bg-orange-200 text-yellow-700 
                hover:bg-orange-500 duration-300 hover:text-yellow-300 '
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
