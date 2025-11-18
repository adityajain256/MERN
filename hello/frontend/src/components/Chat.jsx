"use client"
import React, { useEffect, useRef, useState } from 'react'
import { wsConnect } from '@/ws'

export default function Chat() {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [user, setUser] = useState('Anonymous')
  const listRef = useRef(null)

  useEffect(() => {
    let mounted = true
    let s = null
    // if( typeof window === 'undefined' ) return
    ;(async () => {
      s = await wsConnect()
      if (!mounted || !s) return
      setSocket(s)

      const handleConnect = () => setConnected(true)
      const handleDisconnect = () => setConnected(false)
            const handleChat = (msg) => {
                setMessages((prev) => {
                    if (!msg || !msg.id) {
                        // if message has no id, just append
                        return [...prev, msg]
                    }
                    const exists = prev.some((x) => x.id === msg.id)
                    return exists ? prev : [...prev, msg]
                })
            }

      // remove any previously registered handlers (idempotent)
      try { s.off && s.off('connect', handleConnect) } catch {}
      try { s.off && s.off('disconnect', handleDisconnect) } catch {}
      try { s.off && s.off('chat message', handleChat) } catch {}

      s.on('connect', handleConnect)
      s.on('disconnect', handleDisconnect)
      s.on('chat message', handleChat)
    })()

    return () => {
      mounted = false
      // remove handlers but DO NOT disconnect the shared socket here.
      try { s && s.off && s.off('connect') } catch {}
      try { s && s.off && s.off('disconnect') } catch {}
      try { s && s.off && s.off('chat message') } catch {}
    }
  }, [])

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const send = (e) => {
    e?.preventDefault()
    if (!text || !socket) return
    const payload = {
      user,
      text,
      ts: Date.now(),
      id: `${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    }
    socket.emit('chat message', payload)
    setMessages((m) => [...m, payload])
    setText('')
  }

return (
    <div className="max-w-2xl mx-auto my-6 p-5 shadow-md rounded-lg bg-white">
        <div className="flex justify-between items-center mb-3">
            <h2 className="m-0 text-xl text-black font-semibold">Chat Room</h2>
            <div className={`text-sm ${connected ? 'text-green-600' : 'text-red-600'}`}>
                {connected ? 'Connected' : 'Disconnected'}
            </div>
        </div>

        <div className="flex gap-3 mb-3">
            <input
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your name"
                className="flex-shrink-0 w-40 p-2 rounded-md border border-gray-300"
            />
            <div className="flex-1 text-right text-sm text-gray-500">
                Messages: {messages.length}
            </div>
        </div>

        <div
            ref={listRef}
            className="h-72 overflow-y-auto border border-gray-200 p-3 rounded-md bg-gray-50"
        >
            {messages.length === 0 && (
                <div className="text-gray-500">No messages yet. Say hi 👋</div>
            )}
            {messages.map((m) => (
                <div key={m.id || m.ts} className="mb-2">
                    <div className="flex gap-2 items-baseline">
                        <strong className="text-sm">{m.user}</strong>
                        <span className="text-xs text-black" suppressHydrationWarning>
                            {new Date(m.ts).toLocaleTimeString()}
                        </span>
                    </div>
                    <div className="mt-1 text-base text-black">{m.text}</div>
                </div>
            ))}
        </div>

        <form onSubmit={send} className="flex gap-2 mt-3">
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 rounded-md border border-gray-300 text-black"
            />
            <button
                type="submit"
                className="px-4 py-2 rounded-md border-none bg-gray-900 text-white"
            >
                Send
            </button>
        </form>
    </div>
)

}
