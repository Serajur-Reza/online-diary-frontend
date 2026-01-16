import HomePage from "./components/HomePage";
import Sidebar from "@/components/Sidebar";

const Home = async () => {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}

      {/* Main content area */}
      <main className="flex-1 lg:pl-72">
        <div>
          <HomePage />
        </div>
      </main>
    </div>
  );
};

export default Home;
