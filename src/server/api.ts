import { AxiosResponse } from "axios";
import { taskService } from ".";
import {
  ApiResponse,
  ApiTagDeleteResponse,
  NewTag,
  NewTask,
  Tag,
  Task,
} from "../types";

export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response: AxiosResponse<ApiResponse<Task[]>> = await taskService.get(
    "/tasks"
  );
  return response.data;
};

export const getTaskByIdAPI = async (
  taskId: string
): Promise<ApiResponse<Task>> => {
  const response: AxiosResponse<ApiResponse<Task>> = await taskService.get(
    `/tasks/${taskId}`
  );
  return response.data;
};

export const createNewTaskAPI = async (
  taskData: Partial<NewTask>
): Promise<ApiResponse<Task>> => {
  const response: AxiosResponse<ApiResponse<Task>> = await taskService.post(
    "/tasks",
    taskData
  );
  return response.data;
};

export const updateTaskAPI = async (
  taskId: string,
  taskData: Partial<Task>
): Promise<ApiResponse<Task>> => {
  const response: AxiosResponse<ApiResponse<Task>> = await taskService.put(
    `/tasks/${taskId}`,
    taskData
  );
  return response.data;
};

export const updateTaskCompletionStatusAPI = async (
  taskId: string,
  { completed }: { completed: boolean }
): Promise<ApiResponse<Task>> => {
  const response: AxiosResponse<ApiResponse<Task>> = await taskService.patch(
    `/tasks/${taskId}/status`,
    { completed }
  );
  return response.data;
};

export const deleteTaskAPI = async (taskId: string): Promise<void> => {
  await taskService.delete(`/tasks/${taskId}`);
};

export const getTags = async (): Promise<ApiResponse<Tag[]>> => {
  const response: AxiosResponse<ApiResponse<Tag[]>> = await taskService.get(
    "/tags"
  );
  return response.data;
};

export const getTagByIdAPI = async (
  tagId: string
): Promise<ApiResponse<Tag>> => {
  const response: AxiosResponse<ApiResponse<Tag>> = await taskService.get(
    `/tags/${tagId}`
  );
  return response.data;
};

export const createTagAPI = async (
  tagData: Partial<NewTag>
): Promise<ApiResponse<Tag>> => {
  const response: AxiosResponse<ApiResponse<Tag>> = await taskService.post(
    "/tags",
    tagData
  );
  return response.data;
};

export const updateTagAPI = async (
  tagId: string,
  tagData: Partial<Tag>
): Promise<ApiResponse<Tag>> => {
  const response: AxiosResponse<ApiResponse<Tag>> = await taskService.put(
    `/tags/${tagId}`,
    tagData
  );
  return response.data;
};

export const deleteTagAPI = async (
  tagId: string
): Promise<ApiTagDeleteResponse> => {
  const response: AxiosResponse<ApiTagDeleteResponse> =
    await taskService.delete(`/tags/${tagId}`);
  return response.data;
};
