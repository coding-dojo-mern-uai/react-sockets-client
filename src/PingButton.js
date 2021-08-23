import React, { useEffect, useState, useRef } from 'react'
import socketIOClient from 'socket.io-client'

const PingButton = () => {
  const [socketClient, setSocketClient] = useState()
  const [message, setMessage] = useState()
  const [messages, setMessages] = useState()

  //Actualizar el chat en el client
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8001')
    socket.on('new-message', (data) => setMessages(data))
    setSocketClient(socket)
    return () => socket.disconnect(true)
    //
  }, [])

  const onClickHandler = () => {
    socketClient.emit('new-message', {
      body: message,
      senderId: socketClient.id
    })
  }

  return (
    <div>
      <h1>Ping Button</h1>
      <p>Message</p>

      {messages &&
        messages.map((message, key) => (
          <p key={key}>
            {message.senderId}: {message.body}
          </p>
        ))}
      <input type="text" name="message" onChange={(e) => setMessage(e.target.value)} />
      <button onClick={onClickHandler}>Send</button>
    </div>
  )
}

export default PingButton
