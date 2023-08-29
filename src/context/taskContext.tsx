import React, { createContext, useContext, useState, ReactNode } from "react";
import { NewTask, Task } from "../types";
import {
  createNewTaskAPI,
  deleteTaskAPI,
  updateTaskAPI,
  updateTaskCompletionStatusAPI,
} from "../server/api";
import { mutate } from "swr";
import { cacheKey, tagCacheKey } from "../server";
import { toast } from "react-hot-toast";

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  toggleTaskCompletion: (taskId: string) => void;
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsIncomplete: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  createTask: (newTask: NewTask) => void;
  updateTask: (taskId: string, updatedProperties: Partial<Task>) => void;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTaskContext = (): TaskContextProps => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const createTask = async (newTask: NewTask) => {
    try {
      setTasks((prevTasks) => [
        ...prevTasks,
        { _id: crypto.randomUUID(), ...newTask, tags: [] },
      ]);
      await createNewTaskAPI(newTask);
      mutate(tagCacheKey);
      mutate(cacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while creating task"
      );
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      await deleteTaskAPI(taskId);
      mutate(cacheKey);
      mutate(tagCacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while deleting task"
      );
    }
  };

  const updateTask = async (
    taskId: string,
    updatedProperties: Partial<Task>
  ) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...updatedProperties } : task
        )
      );
      await updateTaskAPI(taskId, updatedProperties);
      mutate(cacheKey);
      mutate(tagCacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating task"
      );
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
      await updateTaskCompletionStatusAPI(taskId, {
        completed: !selectedTask?.completed,
      });

      setSelectedTask((prevSelectedTask: Task | null) => {
        if (prevSelectedTask && prevSelectedTask._id === taskId) {
          return {
            ...prevSelectedTask,
            completed: !prevSelectedTask.completed,
          };
        }
        return prevSelectedTask;
      });

      mutate(cacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating task"
      );
    }
  };

  const markTaskAsCompleted = async (taskId: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: true } : task
        )
      );
      await updateTaskCompletionStatusAPI(taskId, { completed: true });
      mutate(cacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating task"
      );
    }
  };

  const markTaskAsIncomplete = async (taskId: string) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, completed: false } : task
        )
      );
      await updateTaskCompletionStatusAPI(taskId, { completed: false });
      mutate(cacheKey);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred while updating task"
      );
    }
  };

  const value: TaskContextProps = {
    tasks,
    setTasks,
    selectedTask,
    setSelectedTask,
    toggleTaskCompletion,
    markTaskAsCompleted,
    markTaskAsIncomplete,
    removeTask,
    createTask,
    updateTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
