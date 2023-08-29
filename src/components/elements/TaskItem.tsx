import { BsTrash } from "react-icons/bs";
import { Task } from "../../types";
import { useTaskContext } from "../../context/taskContext";
import { toast } from "react-hot-toast";

type Props = {
  task: Task;
};

const TaskItem = ({ task }: Props) => {
  const { setSelectedTask, toggleTaskCompletion, removeTask } =
    useTaskContext();

  const handleTaskToggle = (taskId: string, completed: boolean) => {
    toggleTaskCompletion(taskId);

    if (completed) {
      toast.success("Task Completed");
    } else {
      toast("Task Moved to Todo", {
        icon: "ℹ️",
      });
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    await removeTask(taskId);
    setSelectedTask(null);
    toast.success("Task Deleted");
  };
  return (
    <div
      className="items-center text-zinc-900 dark:text-gray-400 flex text-sm px-5 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out relative align-middle overflow-hidden cursor-pointer  justify-between"
      onClick={() => setSelectedTask(task)}
    >
      <div className="">
        <input
          className="hidden"
          type="checkbox"
          id={task._id}
          checked={task.completed}
          onChange={(e) => handleTaskToggle(task._id, e.target.checked)}
        />
        <label
          className="flex items-center h-10 px-2 rounded cursor-pointer"
          htmlFor={task._id}
        >
          <span className="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-300 rounded-full">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex flex-grow overflow-hidden">
          <div className="flex-grow mr-3 overflow-hidden">
            <div
              className="py-2 whitespace-pre-wrap overflow-hidden"
              style={{
                wordBreak: "break-word",
              }}
            >
              <span className=" whitespace-pre break-words overflow-hidden cursor-pointer">
                {task.title}
              </span>
            </div>
          </div>
          <div className="items-center flex overflow-hidden">
            <button
              className="px-2 py-2  hover:text-red-500  rounded transition-all duration-300 ease-in-out text-sm cursor-pointer"
              onClick={(e) => {
                handleTaskDelete(task._id);
                e.stopPropagation();
              }}
            >
              <BsTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
