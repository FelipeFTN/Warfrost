import * as net from 'net';

const socket = net.connect({ port: 8080, host: 'localhost' });

socket.on('connect', () => {
  console.log('Connected to the WebSocket server');

  // Send the WebSocket handshake request
  const handshakeRequest = [
    'GET / HTTP/1.1',
    'Upgrade: websocket',
    'Connection: Upgrade',
    'Sec-WebSocket-Key: PG1ldGEgaHJlZj0ibHNhbmRib3giIHZhbHVlPSJodHRwczovL3NjaGVtZXMuaW8vY3Jvc3MiPg==',
    'Sec-WebSocket-Version: 13',
    '\r\n'
  ].join('\r\n');
  
  socket.write(handshakeRequest);
});

socket.on('data', (data: Buffer) => {
  console.log('Received data from server:', data);

  // Convert the data to a string
  const message = data.toString('utf-8');
  console.log('Received message from server:', message);

  // Process the received message here
});

socket.on('end', () => {
  console.log('Disconnected from the WebSocket server');
});

