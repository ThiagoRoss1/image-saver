import './index.css'

function App() {

  return (
    <div className="flex flex-col w-100 h-50 bg-[#16171d]">
      <div className="w-full h-fit flex items-center justify-center mt-6 mb-2">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl text-white font-bold">Image Saver</h1>
          <span className="text-lg text-white font-semibold">Save your favorite images easily</span>
        </div>
      </div>

      <div className="w-full h-fit flex items-center justify-center mt-2 mb-6">
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-lg text-white font-semibold opacity-70">App still in progress...</span>
          <span className="text-lg text-white font-semibold opacity-70">Check later for updates!</span>
        </div>
      </div>
    </div>
  );
}

export default App
