import React, { useState } from "react";
import { BsPlus, BsTag } from "react-icons/bs";
import Tag from "./elements/Tag";
import { useTagContext } from "../context/tagContext";
import { MdClose } from "react-icons/md";
import { useTaskContext } from "../context/taskContext";
import { toast } from "react-hot-toast";
import { useSidebarMenuContext } from "../context/sidebarMenuContext";

type Props = {};

const TagPane = (props: Props) => {
  const { menuState, toggleSidebar, hideSidebar } = useSidebarMenuContext();
  const { tags, setSelectedTag, createTag } = useTagContext();
  const { tasks } = useTaskContext();
  const [isAddMode, setIsAddMode] = useState(false);
  const [tagName, setTagName] = useState("");

  const onAddTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagName) {
      const newTag: Tag = {
        _id: crypto.randomUUID(),
        name: tagName,
        count: 0,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      };
      createTag(newTag);
      setTagName("");
    } else {
      toast("Please enter a tag name", {
        icon: "⚠️",
      });
    }
  };
  return (
    <div
      className={`absolute left-0 top-0 w-full h-full md:static md:col-span-4 lg:col-span-3  px-5 overflow-y-scroll h-[calc(100vh-150px) z-10 bg-gray-100 dark:bg-gray-800 transition-all duration-300 ease-in-out ${
        menuState.isVisible ? "" : "left-[-100vw] lg:left-0"
      }`}
    >
      <div
        className={`flex items-center justify-between  top-0 bg-gray-100 dark:bg-gray-800 py-3 border-b border-gray-300 dark:border-gray-600 sticky ${
          isAddMode ? "" : "pl-5 "
        }`}
      >
        {isAddMode ? (
          <form className="w-full flex justify-between" onSubmit={onAddTag}>
            <input
              type="text"
              required
              className="focus:outline-none py-2 pl-2 rounded bg-white dark:bg-gray-800 w-[inherit]"
              autoFocus
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <div className="flex items-center gap-2 flex-1 translate-x-3 pr-2">
              {" "}
              <button
                className="px-3 text-white text-[12px] py-1 bg-blue-500  hover:bg-blue-600  rounded transition-all duration-300 ease-in-out whitespace-nowrap self-center"
                type="submit"
              >
                Add Tag
              </button>
              <button type="button" onClick={() => setIsAddMode(false)}>
                <MdClose />
              </button>
            </div>
          </form>
        ) : (
          <>
            {" "}
            <button
              className="text-2xl px-2 py-2  text-blue-600 dark:text-gray-300  hover:text-white rounded transition-all duration-300 ease-in-out md:hidden"
              onClick={() => toggleSidebar()}
            >
              <MdClose />
            </button>
            <p className="font-bold text-md dark:text-gray-500">Tags</p>
            <button
              className="text-2xl px-2 py-2 bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-yellow-600 hover:text-white rounded transition-all duration-300 ease-in-out"
              onClick={() => setIsAddMode(true)}
            >
              <BsPlus />
            </button>
          </>
        )}
      </div>
      <div className="py-5">
        <button
          className="py-2 rounded flex justify-between items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 px-5"
          onClick={() => {
            setSelectedTag(null);

            if (menuState.isVisible) {
              hideSidebar();
            }
          }}
        >
          <div className="inline-flex gap-2 items-center cursor-pointer">
            <BsTag />
            <p>All</p>
            <div className="h-[18px] w-[18px] rounded-full flex items-center justify-center text-[10px] bg-gray-300 dark:bg-gray-600">
              <p>{tasks.length}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-3"></div>
        </button>
        {tags.map((tag) => {
          return <Tag key={tag._id} tag={tag} />;
        })}
      </div>
    </div>
  );
};

export default TagPane;
