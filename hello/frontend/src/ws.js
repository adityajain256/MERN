

let socket = null;

// keep the socket on the global object so HMR / React Strict Mode remounts
// reuse the same connection instead of creating new ones.
const GLOBAL_KEY = '__SOCKET_IO_CLIENT__'
if (typeof globalThis !== 'undefined' && globalThis[GLOBAL_KEY]) {
  socket = globalThis[GLOBAL_KEY]
}

export const wsConnect = async () => {
  if (typeof window === 'undefined') return null;
  if (socket) return socket;
  const { io } = await import('socket.io-client');
  socket = io('http://localhost:8090', { transports: ['websocket', 'polling'] });
  try { if (typeof globalThis !== 'undefined') globalThis[GLOBAL_KEY] = socket } catch {}
  return socket;
}

export const wsDisconnect = () => {
  if (socket) {
    try {
      socket.disconnect();
    } catch {}
    try { if (typeof globalThis !== 'undefined') globalThis[GLOBAL_KEY] = null } catch {}
    socket = null;
  }
}

export const wsInstance = () => socket;
