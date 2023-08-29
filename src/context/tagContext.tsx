import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tagsData } from "../data/tags";
import { NewTag, Tag } from "../types";
import { toast } from "react-hot-toast";
import { createTagAPI, deleteTagAPI, updateTagAPI } from "../server/api";
import { mutate } from "swr";
import { tagCacheKey } from "../server";

interface TagContextProps {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  selectedTag: Tag | null;
  setSelectedTag: React.Dispatch<React.SetStateAction<Tag | null>>;
  createTag: (newTag: Tag) => void;
  deleteTag: (tagId: string) => void;
  updateTag: (tagId: string, updatedProperties: Partial<Tag>) => void;
}

const TagContext = createContext<TagContextProps | undefined>(undefined);

export const useTagContext = (): TagContextProps => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTagContext must be used within a TagProvider");
  }
  return context;
};

export const TagProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const createTag = async (newTag: Tag) => {
    try {
      setTags((prevTags) => [...prevTags, newTag]);
      await createTagAPI(newTag);
      mutate(tagCacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while creating the tag"
      );
    }
  };

  const updateTag = async (
    tagId: string,
    updatedProperties: Partial<NewTag>
  ) => {
    try {
      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === tagId ? { ...tag, ...updatedProperties } : tag
        )
      );
      await updateTagAPI(tagId, updatedProperties);
      mutate(tagCacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating the tag"
      );
    }
  };

  const deleteTag = async (tagId: string) => {
    try {
      const updatedTags = tags.filter((tag) => tag._id !== tagId);
      setTags(updatedTags);
      await deleteTagAPI(tagId);
      mutate(tagCacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting the tag"
      );
    }
  };

  const value: TagContextProps = {
    tags,
    setTags,
    selectedTag,
    setSelectedTag,
    createTag,
    deleteTag,
    updateTag,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
