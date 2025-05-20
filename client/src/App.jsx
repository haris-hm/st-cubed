import { useEffect, useState } from 'react';
import { useSocket } from './hooks/SocketConnection';

import './styles/input.css'

function App() {
  const socketRef = useSocket('http://localhost:3001');
  const [boardState, setBoardState] = useState(null);

  useEffect(() => {
    const socket = socketRef.current;
    
    // Listen for board-state updates
    socket.on('board-state', (state) => {
      setBoardState(state);
      console.log('Received board state:', state);
    });

    // Create a room
    socket.emit('create-room', (roomId) => {
      console.log('Created room:', roomId);
      // Save roomId in state if needed
      socket.emit('make-move', 3, 5, (moveMade) => {
        console.log('Move made:', moveMade);
      });
    });

    // Cleanup listener on unmount
    return () => {
      socket.off('board-state');
    };
  }, [socketRef]);

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
