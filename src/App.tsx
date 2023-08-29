import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TagPane from "./components/TagPane";
import TaskDetail from "./components/TaskDetail";
import TaskView from "./components/TaskView";
import PageLoader from "./components/PageLoader";
import useSWR from "swr";
import { cacheKey, tagCacheKey } from "./server";
import { getTags, getTasks } from "./server/api";
import PageError from "./components/PageError";
import { useTaskContext } from "./context/taskContext";
import { useEffect } from "react";
import { useTagContext } from "./context/tagContext";

const App = () => {
  const { setTasks } = useTaskContext();
  const { setTags } = useTagContext();
  const {
    isLoading: isTaskLoading,
    error: taskError,
    data: todos,
  } = useSWR(cacheKey, getTasks);
  const { data: tags } = useSWR(tagCacheKey, getTags);

  useEffect(() => {
    if (todos?.data) setTasks(todos.data);
  }, [todos]);

  useEffect(() => {
    if (tags?.data) setTags(tags.data);
  }, [tags]);

  if (isTaskLoading) return <PageLoader />;
  if (taskError) return <PageError />;
  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-800 min-h-screen dark:text-gray-400 accent-blue-500 dark:accent-yellow-500 overflow-x-hidden w-full">
        <Header />
        <section className="grid grid-cols-1 md:grid-cols-12 max-w-[1400px]  md:px-5  h-[calc(100vh-120px)] lg:h-[calc(100vh-130px)]  mx-auto overflow-y-hidden md:divide-x dark:divide-gray-600 overflow-x-hidden">
          <TagPane />
          <TaskView />
          <TaskDetail />
        </section>
        <Footer />
      </main>
      <Toaster />
    </>
  );
};

export default App;
