import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tagsData } from "../data/tags";
import { Tag } from "../types";

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

  const createTag = (newTag: Tag) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const updateTag = (tagId: string, updatedProperties: Partial<Tag>) => {
    setTags((prevTags) =>
      prevTags.map((tag) =>
        tag._id === tagId ? { ...tag, ...updatedProperties } : tag
      )
    );
  };

  const deleteTag = (tagId: string) => {
    const updatedTags = tags.filter((tag) => tag._id !== tagId);
    setTags(updatedTags);
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
