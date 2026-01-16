import AverageMood from "./components/AverageMood";
import MoodScore from "./components/MoodScore";

const Mood = () => {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}

      {/* Main content area */}
      <main className="flex-1 lg:pl-72">
        <div className="flex items-center justify-center mt-24">
          <h1 className="font-bold text-3xl">Your Average Mood Score</h1>
        </div>

        <div className="flex items-center justify-center mt-24">
          <MoodScore />
        </div>

        <div className="flex items-center justify-center mt-24">
          <h1 className="font-bold text-3xl">Your Average Mood</h1>
        </div>

        <div className="flex items-center justify-center mt-24">
          <AverageMood />
        </div>
      </main>
    </div>
  );
};

export default Mood;
