import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TagPane from "./components/TagPane";
import TaskDetail from "./components/TaskDetail";
import TaskView from "./components/TaskView";

const App = () => {
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
