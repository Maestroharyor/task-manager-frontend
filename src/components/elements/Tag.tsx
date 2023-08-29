import { BsTag, BsTrash } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Tag } from "../../types";
import { useTagContext } from "../../context/tagContext";
import Rodal from "rodal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSidebarMenuContext } from "../../context/sidebarMenuContext";
import { capitalizeFirstLetter } from "../../utils";

type Props = {
  tag: Tag;
};

const Tag = ({ tag }: Props) => {
  const { setSelectedTag, deleteTag, updateTag } = useTagContext();
  const { menuState, hideSidebar } = useSidebarMenuContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTagEdit, setSelectedTagEdit] = useState<Tag>(tag);
  const handleTagDelete = (taskId: string) => {
    deleteTag(taskId);
    toast.success("Tag Deleted");
  };

  const handleUpdateTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTag(selectedTagEdit._id, {
      name: selectedTagEdit.name,
      color: selectedTagEdit.color,
    });
    toast.success("Tag Updated");
    setIsAddModalOpen(false);
  };
  return (
    <>
      <div
        className="py-2 rounded flex justify-between items-center w-full hover:bg-gray-200 dark:hover:bg-gray-700 px-5 cursor-pointer"
        onClick={() => {
          setSelectedTag(tag);
          if (menuState.isVisible) {
            hideSidebar();
          }
        }}
      >
        <div className="inline-flex gap-2 items-center cursor-pointer">
          <BsTag />
          <p>{capitalizeFirstLetter(tag.name)}</p>
          <div className="h-[18px] w-[18px] rounded-full flex items-center justify-center text-[10px] bg-gray-300 dark:bg-gray-600">
            <p>{tag.count}</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-3">
          <div
            className="p-[5px] h-[5px]  rounded-full"
            style={{ background: tag.color }}
          />
          <button
            className="px-2 py-2  hover:bg-blue-100 dark:hover:bg-yellow-500 dark:hover:text-white  rounded transition-all duration-300 ease-in-out"
            onClick={(e) => {
              e.stopPropagation();
              setIsAddModalOpen(true);
            }}
          >
            <MdOutlineModeEditOutline />
          </button>
        </div>
      </div>
      <Rodal
        visible={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        animation="zoom"
        width={600}
        height={330}
      >
        <div className="p-3 space-y-3">
          <h4 className="text-2xl font-bold text-blue-500 dark:text-yellow-500">
            Update Tag
          </h4>
          <form
            className="flex flex-col gap-3 justify-between"
            onSubmit={handleUpdateTag}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="title">
                Tag Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                className="px-5 py-3 rounded bg-white dark:bg-gray-800"
                autoFocus
                value={selectedTagEdit.name}
                onChange={(e) =>
                  setSelectedTagEdit((prevSelectedTag) => ({
                    ...prevSelectedTag,
                    name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="title">Tag Color</label>
              <input
                type="color"
                required
                className="px-5 py-3 rounded bg-white dark:bg-gray-800 w-full"
                autoFocus
                value={selectedTagEdit.color}
                onChange={(e) =>
                  setSelectedTagEdit((prevSelectedTag) => ({
                    ...prevSelectedTag,
                    color: e.target.value,
                  }))
                }
              />
            </div>
            <div className="py-4 flex justify-between">
              <button
                className="px-2 py-2  hover:text-red-500  rounded transition-all duration-300 ease-in-out text-sm cursor-pointer"
                onClick={() => {
                  handleTagDelete(tag._id);
                }}
              >
                <BsTrash />
              </button>
              <button className="px-5 text-white text-xs py-2 bg-blue-500  hover:bg-blue-600  rounded transition-all duration-300 ease-in-out">
                Update Tag
              </button>
            </div>
          </form>
        </div>
      </Rodal>
    </>
  );
};

export default Tag;
