import React, { useState } from "react";
import TaskItem from "./elements/TaskItem";
import { useTaskContext } from "../context/taskContext";
import { BsPlus } from "react-icons/bs";
import Rodal from "rodal";
import { toast } from "react-hot-toast";
import { NewTask } from "../types";
import { useTagContext } from "../context/tagContext";

const TaskView = () => {
  const { tasks, createTask } = useTaskContext();
  const { selectedTag } = useTagContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "todo" | "completed">(
    "todo"
  );
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [taskTag, setTaskTag] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTag(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      // Remove any leading/trailing spaces and ignore empty tags
      const newTag = taskTag.trim();
      if (newTag === "") {
        setTaskTag("");
        return;
      }

      // Check if the maximum number of tags is reached
      if (tagsList.length < 2) {
        setTagsList([...tagsList, newTag]);
        setTaskTag("");
      } else {
        toast.error("Maximum number of tags reached");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTagsList(tagsList.filter((tag) => tag !== tagToRemove));
  };

  const handleTabChange = (tabIndex: "all" | "todo" | "completed") => {
    setActiveTab(tabIndex);
  };

  const handleAddNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTask.title) {
      try {
        const newTaskAdded: NewTask = {
          title: newTask.title,
          description: newTask.description,
          completed: false,
          tags: tagsList,
        };
        await createTask(newTaskAdded);
        setNewTask({
          title: "",
          description: "",
        });
        setTagsList([]);
        setTaskTag("");
        setIsAddModalOpen(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error("Please enter a task name");
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const todoTasks = tasks.filter((task) => !task.completed);
  return (
    <>
      <div className="md:col-span-8 lg:col-span-5 px-5 pb-6  overflow-y-scroll h-[calc(100vh-150px)">
        <div className="flex border-b border-gray-300 dark:border-gray-600 sticky top-[0px]  z-[2] bg-gray-100 dark:bg-gray-800 justify-between">
          <div className="flex ">
            <div
              className={`hidden cursor-pointer px-4 py-5 sm:flex items-center gap-3 ${
                activeTab === "all" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange("all")}
            >
              <span className="xl:hidden">All</span>
              <span className="hidden xl:inline">All Tasks</span>
              <div className="h-[18px] w-[18px] rounded-full flex items-center justify-center text-[10px] bg-gray-300 dark:bg-gray-600">
                <span>{tasks.length}</span>
              </div>
            </div>
            <div
              className={`cursor-pointer px-4 py-5 flex items-center gap-3 ${
                activeTab === "todo" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange("todo")}
            >
              <span>To Do's</span>
              <div className="h-[18px] w-[18px] rounded-full flex items-center justify-center text-[10px] bg-gray-300 dark:bg-gray-600">
                <span>{todoTasks.length}</span>
              </div>
            </div>
            <div
              className={`cursor-pointer px-4 py-5 flex items-center gap-3 ${
                activeTab === "completed" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => handleTabChange("completed")}
            >
              <span>Completed</span>
              <div className="h-[18px] w-[18px] rounded-full flex items-center justify-center text-[10px] bg-gray-300 dark:bg-gray-600">
                <span>{completedTasks.length}</span>
              </div>
            </div>
          </div>

          <button
            className="text-2xl px-2 py-2 bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-yellow-600 hover:text-white rounded transition-all duration-300 ease-in-out self-center justify-self-end"
            onClick={() => setIsAddModalOpen(true)}
          >
            <BsPlus />
          </button>
        </div>
        <div className="mt-4">
          {!tasks.length && <p>No tasks added...</p>}
          {tasks
            .filter((task) => {
              if (
                selectedTag === null ||
                selectedTag.name.toLowerCase() === "all"
              ) {
                if (activeTab === "all") {
                  return true;
                }
                if (activeTab === "todo") {
                  return !task.completed;
                }
                if (activeTab === "completed") {
                  return task.completed;
                }
              } else if (task.tags.some((tag) => tag._id === selectedTag._id)) {
                if (activeTab === "all") {
                  return true;
                }
                if (activeTab === "todo") {
                  return !task.completed;
                }
                if (activeTab === "completed") {
                  return task.completed;
                }
              }
              return false; // If selectedTag is not "all" and task's tags don't match
            })
            .map((task) => {
              return <TaskItem task={task} key={task._id} />;
            })}
        </div>
      </div>
      <Rodal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        animation="flip"
        height={500}
        customStyles={{
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <div className="p-3">
          <form
            className="flex flex-col gap-5 justify-between"
            onSubmit={handleAddNewTask}
          >
            {" "}
            <h4 className="text-2xl font-bold text-blue-500 dark:text-yellow-500">
              Add a new task
            </h4>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                Name of To-do <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="px-5 py-3 rounded bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-300 focus:ring-gray-500 dark:ring-gray-700 dark:focus:ring-gray-500 focus:outline-none"
                autoFocus
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prevTask) => ({
                    ...prevTask,
                    title: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description">Description</label>
              <textarea
                name=""
                id=""
                cols={20}
                rows={2}
                className="resize-none px-5 py-3 rounded bg-gray-100 dark:bg-gray-800 ring-2 ring-gray-300 focus:ring-gray-500 dark:ring-gray-700 dark:focus:ring-gray-500 focus:outline-none"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prevTask) => ({
                    ...prevTask,
                    description: e.target.value,
                  }))
                }
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Tags</label>
              <div className="flex flex-wrap items-center gap-4 p-4   tag-container  px-5 py-3 rounded  bg-gray-100 dark:bg-gray-800 group ring-2 ring-gray-300 focus:ring-gray-500 dark:ring-gray-700 dark:focus:ring-gray-500">
                {tagsList.map((tag) => (
                  <div
                    key={tag}
                    className="bg-gray-200 dark:bg-gray-600  px-4 py-1 rounded-full flex items-center tag gap-3 text-sm"
                  >
                    {tag}
                    <span
                      className=" cursor-pointer text-gray-600 dark:text-gray-400 tag-remove"
                      onClick={() => removeTag(tag)}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                <input
                  type="text"
                  value={taskTag}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyPress}
                  className="focus:outline-none bg-transparent flex-1"
                  placeholder="Press COMMA or ENTER to add..."
                />
              </div>
              <p className="text-gray-600 italic text-xs">
                Enter Maximum of 2 tags to add to your task.
              </p>
            </div>
            <div className="py-4 flex justify-end">
              <button className="px-5 text-white text-xs py-2 bg-blue-500  hover:bg-blue-600  rounded transition-all duration-300 ease-in-out">
                Add To-do
              </button>
            </div>
          </form>
        </div>
      </Rodal>
    </>
  );
};

export default TaskView;
