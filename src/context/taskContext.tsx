import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { tasksData } from "../data/tasks";
import { Task } from "../types";

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  selectedTask: Task | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<Task | null>>;
  toggleTaskCompletion: (taskId: string) => void;
  markTaskAsCompleted: (taskId: string) => void;
  markTaskAsIncomplete: (taskId: string) => void;
  removeTask: (taskId: string) => void;
  createTask: (newTask: Task) => void;
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
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const createTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const updateTask = (taskId: string, updatedProperties: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, ...updatedProperties } : task
      )
    );
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: !task.completed } : task
      )
    );

    setSelectedTask((prevSelectedTask: Task | null) => {
      if (prevSelectedTask && prevSelectedTask._id === taskId) {
        return { ...prevSelectedTask, completed: !prevSelectedTask.completed };
      }
      return prevSelectedTask;
    });
  };

  const markTaskAsCompleted = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const markTaskAsIncomplete = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, completed: false } : task
      )
    );
  };

  const loadTasksFromLocalStorage = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  const loadSelectedTaskFromLocalStorage = () => {
    const storedSelectedTask = localStorage.getItem("selectedTask");
    if (storedSelectedTask) {
      setSelectedTask(JSON.parse(storedSelectedTask));
    }
  };

  useEffect(() => {
    loadTasksFromLocalStorage();
    loadSelectedTaskFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log("Changed");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("selectedTask", JSON.stringify(selectedTask));
  }, [selectedTask]);

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
