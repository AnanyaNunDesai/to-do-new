import React from "react";
import TaskItem from "./TaskItem.tsx";

interface TaskListProps {
  tasks: Array<{
    id: number;
    text: string;
    isEditable: boolean;
  }>;
  error: string | null;
  loading: boolean;
  handleEditSubmitter: (e: React.FormEvent, id: number) => void;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  error,
  loading,
  handleEditSubmitter,
  editedText,
  setEditedText,
}) => {
  return (
    <div
      className='rounded-lg mt-10 task-list flex flex-col gap-3 p-10 container bg-yellow-400 mx-auto text-black lg:max-w-4xl'
    >
      {loading ? (
        <p
          className='text-center'
        >{error ? error : "Loading..."}
        </p>
      ) : (
        tasks.length === 0 && <p className='text-center'>No task to show</p>
      )}
      {tasks.map((task) => (
        <TaskItem
          task={task}
          key={task.id}
          handleEditSubmitter={handleEditSubmitter}
          editedText={editedText}
          setEditedText={setEditedText}
        />
      ))}
    </div>
  );
};

export default TaskList;
