import { useTaskContext } from "../context/taskContext";
import { BsPlus, BsTrash } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import EmptyTaskDetail from "./EmptyTaskDetail";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { Task } from "../types";
import { useTagContext } from "../context/tagContext";

const TaskDetail = () => {
  const {
    selectedTask,
    setSelectedTask,
    toggleTaskCompletion,
    removeTask,
    updateTask,
  } = useTaskContext();
  const { tags } = useTagContext();
  const [availableTags, setAvailableTags] = useState(tags);
  const [addTagMode, setAddTagMode] = useState(false);
  const [selectedTaskEdit, setSelectedTaskEdit] = useState<Task>(
    selectedTask || {
      _id: "",
      title: "",
      description: "",
      completed: false,
      tags: [],
    }
  );
  const handleTagSelect = (selectedTagId: string) => {
    const selectedTag = availableTags.find((tag) => tag._id === selectedTagId);

    if (selectedTag) {
      const updatedTags = [...selectedTaskEdit.tags, selectedTag];
      if (updatedTags.length > 2) {
        toast.error("Maximum number of tags reached");
        return;
      }
      setSelectedTaskEdit((prevTask) => ({ ...prevTask, tags: updatedTags }));

      const updatedAvailableTags = availableTags.filter(
        (tag) => tag._id !== selectedTagId
      );
      setAvailableTags(updatedAvailableTags);
    }
  };

  const handleTagRemove = (selectedTagId: string) => {
    const updatedTags = selectedTaskEdit.tags.filter(
      (tag) => tag._id !== selectedTagId
    );
    setSelectedTaskEdit((prevTask) => ({ ...prevTask, tags: updatedTags }));
    setAvailableTags(
      tags.filter(() =>
        selectedTaskEdit.tags.some((tag) => tag._id === tag._id)
      )
    );
  };

  useEffect(() => {
    if (selectedTask) {
      setSelectedTaskEdit(selectedTask);
    }
  }, [selectedTask]);

  const handleTaskToggle = (taskId: string, _completed: boolean) => {
    toggleTaskCompletion(taskId);
  };

  const handleTaskDelete = (taskId: string) => {
    removeTask(taskId);
    setSelectedTask(null);
    toast.success("Task Deleted");
  };

  const handleTaskUpdate = () => {
    updateTask(selectedTaskEdit._id, selectedTaskEdit);
    toast.success("Task Updated");
    setSelectedTask(selectedTaskEdit);
  };
  return (
    <section
      className={`absolute  top-0 right-0 max-w-[500px] shadow-lg lg:shadow-none shadow-gray-950 lg:col-span-4 pb-10 lg:relative overflow-y-scroll overflow-x-hidden w-full h-full bg-gray-100 dark:bg-gray-800 z-[9] transition-all duration-300 ease-in-out ${
        selectedTask ? "" : "right-[-100vw] lg:right-0 hidden lg:block"
      }`}
    >
      {selectedTask ? (
        <div className="divide-y divide-gray-300 dark:divide-gray-700  flex flex-col h-full px-5">
          <div className="  pt-5 pb-4 lg:pt-5 lg:pb-2 flex items-center gap-3 ">
            <button className=" text-lg " onClick={() => setSelectedTask(null)}>
              <MdClose />
            </button>
            <div className="">
              <input
                className="hidden"
                type="checkbox"
                id={selectedTask._id}
                checked={selectedTask.completed}
                onChange={(e) =>
                  handleTaskToggle(selectedTask._id, e.target.checked)
                }
              />
              <label
                className="flex items-center h-10 px-2 rounded cursor-pointer"
                htmlFor={selectedTask._id}
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
                <span className="ml-4 text-xs text-gray-500">
                  {selectedTask.completed ? "Marked" : "Mark"} as Completed
                </span>
              </label>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-10 h-full  flex-1">
            <div className="flex-1 flex flex-col gap-4">
              <div className="w-full relative">
                <input
                  type="text"
                  value={selectedTaskEdit?.title}
                  className="w-full py-2 text-xl bg-transparent outline-none focus:outline-none font-bold"
                  onChange={(e) =>
                    setSelectedTaskEdit((prevSelectedTask) => ({
                      ...prevSelectedTask,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedTaskEdit.tags.map((tag) => (
                  <div
                    key={tag._id}
                    className="bg-gray-200 dark:bg-gray-600  px-4 py-1 rounded-full flex items-center tag gap-3 text-sm"
                  >
                    {tag.name}
                    <span
                      className=" cursor-pointer text-gray-600 dark:text-gray-400 tag-remove"
                      onClick={() => {
                        handleTagRemove(tag._id);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ))}
                {selectedTaskEdit.tags.length < 2 && (
                  <>
                    {addTagMode ? (
                      <select
                        value=""
                        onChange={(e) => handleTagSelect(e.target.value)}
                        className="text-sm bg-gray-200 dark:bg-gray-600 px-5 py-1 rounded-full cursor-pointer"
                      >
                        <option value="" disabled>
                          Select a tag
                        </option>
                        {availableTags
                          .filter(
                            (aTag) =>
                              !selectedTaskEdit.tags.some(
                                (selectedTag) => selectedTag._id === aTag._id
                              )
                          )
                          .map((tag) => (
                            <option key={tag._id} value={tag._id}>
                              {tag.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <button
                        className="text-[15px] rounded-full border px-4 py-1 border-dashed border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500"
                        onClick={() => setAddTagMode(true)}
                      >
                        <BsPlus />
                      </button>
                    )}
                  </>
                )}
              </div>
              <div className="flex-1">
                <textarea
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                  className="h-full w-full bg-transparent placeholder:text-gray-500 text-base resize-none focus:outline-none"
                  value={selectedTaskEdit.description}
                  onChange={(e) =>
                    setSelectedTaskEdit((prevSelectedTask) => ({
                      ...prevSelectedTask,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
                <p className="italic text-xs text-gray-400 dark:text-gray-500">
                  Changes are not saved until you{" "}
                  <span className="font-bold">"Save Changes"</span>
                </p>
              </div>
            </div>
            <div className=" flex justify-between">
              <button
                className="px-2 py-2  hover:text-red-500  rounded transition-all duration-300 ease-in-out text-lg"
                onClick={() => handleTaskDelete(selectedTask._id)}
              >
                <BsTrash />
              </button>
              <button
                className="px-5 text-white text-xs py-2 bg-blue-500  hover:bg-blue-600  rounded transition-all duration-300 ease-in-out"
                onClick={() => handleTaskUpdate()}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyTaskDetail />
      )}
    </section>
  );
};

export default TaskDetail;
