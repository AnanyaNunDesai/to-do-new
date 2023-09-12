import * as React from 'react'
import { useContext, useState } from "react";
import { DeleteHandlerContext, EditHandlerContext } from "../App.tsx";

interface TaskItemProps {
  task: {
    id: number; 
    text: string; 
    isEditable: boolean; 
  };
  handleEditSubmitter: (e: React.FormEvent, id: number) => void;
  editedText: string;
  setEditedText: React.Dispatch<React.SetStateAction<string>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleEditSubmitter, editedText, setEditedText }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handleDelete = useContext<typeof DeleteHandlerContext | undefined>(DeleteHandlerContext);
  const handleEdit = useContext<typeof EditHandlerContext | undefined>(EditHandlerContext);

  return (
    <div 
      className='task-item flex justify-between items-center bg-gradient-to-r from-yellow-500 to-gray-950 p-5 rounded hover:from-orange-700 hover:to-yellow-800 group'
    >
      <div 
        className='task-item-left flex gap-3'
      >
        <span 
          className='self-center'
        >
          <input
            type='checkbox'
            className='accent-violet-400 cursor-pointer'
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </span>

        {task.isEditable && (
          <form onSubmit={(e) => handleEditSubmitter(e, task.id)}>
            <input
              className='bg-transparent outline-none border-b-2 border-yellow-500 pb-1 w-full focus:border-orange-500'
              type='text'
              required
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
          </form>
        )}

        {!task.isEditable && (
          <p
            className={`group-hover:text-yellow-400 ${
              isChecked
                ? "line-through text-gray-500 group-hover:text-orange-300"
                : ""
            }`}
          >
            {task.text}
          </p>
        )}
      </div>

      <div 
        className='task-item-right flex gap-3 text-yellow-200'
      >
        <button onClick={() => handleEdit && handleEdit(task.id)}>
          edit
        </button>
        <p>/</p>
        <button onClick={() => handleDelete && handleDelete(task.id)}>
          delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

