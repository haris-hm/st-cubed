import './styles/input.css'

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div className="absolute rounded-full bg-red-500 w-48 h-48"></div>
        <div className="absolute rounded-full bg-white w-32 h-32"></div>
        <div className="absolute rounded-full bg-red-500 w-16 h-16"></div>
        <div className="absolute rounded-full bg-white w-6 h-6"></div>
      </div>
    </div>
  )
}

export default App
