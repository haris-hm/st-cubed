import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(serverUrl) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io({
      path: serverUrl,
      transports: ['websocket'],
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [serverUrl]);

  return socketRef;
}