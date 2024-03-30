import React, { createContext, useEffect, useState, FC, FormEvent} from "react";
import AddTask from "./components/AddTask.tsx";
import TaskList from "./components/TaskList.tsx";
import Footer from "./components/Footer.js";

interface Task {
  id: number;
  text: string;
  isEditable: boolean;
}

interface AppProps { }

export const DeleteHandlerContext = createContext<any>(null);
export const EditHandlerContext = createContext<any>(null);

const App: FC<AppProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [editedText, setEditedText] = useState<string>("");
  const [toggleEditMode, setToggleEditMode] = useState<boolean>(true);

  useEffect(() => {
    // getting data from the server
    fetchingData();
  }, []);

  // fetching data
  const fetchingData = async () => {
    try {
      const res = await fetch("http://localhost:3002/api/tasks");
      if (!res.ok) throw new Error("Something went wrong!");
      const data: Task[] = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete event
  const handleDelete = (id: number) => {
    // delete data
    deleteData(id);
    // set updated tasks
    setTasks(tasks.filter((task) => id !== task.id));
  };

  // Editing Event
  const handleEdit = (id: number) => {
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = true;
    setEditedText(editableTarget.text);
    setTasks([...tasks]);
    setToggleEditMode(false);

    // Re-arrange
    tasks
      .filter((task) => task.id !== id)
      .map((targetedEl) => (targetedEl.isEditable = false));
  };

  const deleteData = async (id: number) => {
    await fetch(`http://localhost:3002/api/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  // Editing task form handler
  const handleEditSubmitter = (e: FormEvent, id: number) => {
    e.preventDefault();
    setToggleEditMode(!toggleEditMode);

    // Persist data
    const editPersistance = {
      text: editedText,
      id: id,
    };

    // Putting request
    puttingRequest(id, editPersistance);

    // Real-time update
    const [editableTarget] = tasks.filter((task) => id === task.id);
    editableTarget.isEditable = false;
    editableTarget.text = editPersistance.text;
    setTasks([...tasks]);
  };

  const puttingRequest = async (id: number, newData: any) => {
    fetch(`http://localhost:3002/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newData),
    });
  };

  return (
    <div className='wrapper bg-gradient-to-t from-blue-200 to-blue-900 min-h-screen text-xl text-gray-100 flex flex-col py-10'>
      <DeleteHandlerContext.Provider value={handleDelete}>
        <EditHandlerContext.Provider value={handleEdit}>
          <AddTask tasks={tasks} setTasks={setTasks} />
          <TaskList
            tasks={tasks}
            error={error}
            loading={loading}
            handleEditSubmitter={handleEditSubmitter}
            editedText={editedText}
            setEditedText={setEditedText}
          />
          <Footer />
        </EditHandlerContext.Provider>
      </DeleteHandlerContext.Provider>
    </div>
  );
};

export default App;
