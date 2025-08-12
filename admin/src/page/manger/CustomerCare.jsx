import React, { useEffect, useState } from 'react'
import { MessageSquare, Send, AlertTriangle, ArrowUpRight } from 'lucide-react'
// Mock data for chat history
const initialChats = [
  {
    id: '1',
    customer: 'Customer #12345',
    lastMessage: 'I need help with my recent order',
    timestamp: '10:30 AM',
    unread: true,
  },
  {
    id: '2',
    customer: 'Customer #67890',
    lastMessage: 'When will my refund be processed?',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: '3',
    customer: 'Customer #54321',
    lastMessage: 'Thank you for your help!',
    timestamp: '2 days ago',
    unread: false,
  },
]
// Mock messages for the first chat
const initialMessages = [
  {
    id: '1',
    sender: 'customer',
    text: 'Hello, I need help with my recent order #ORD-12345',
    timestamp: '10:25 AM',
  },
  {
    id: '2',
    sender: 'customer',
    text: "It was supposed to arrive yesterday but I haven't received it yet",
    timestamp: '10:26 AM',
  },
  {
    id: '3',
    sender: 'bot',
    text: "I understand you're concerned about your order. Let me check the status for you.",
    timestamp: '10:27 AM',
  },
  {
    id: '4',
    sender: 'bot',
    text: 'According to our system, your order has been shipped and is currently out for delivery. It should arrive by the end of today.',
    timestamp: '10:28 AM',
  },
  {
    id: '5',
    sender: 'customer',
    text: "That's good to know. Can you provide me with a tracking number?",
    timestamp: '10:30 AM',
  },
]
const CustomerCare = () => {
  const [chats, setChats] = useState(initialChats)
  const [selectedChat, setSelectedChat] = useState(initialChats[0].id)
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState(
    'The tracking number is TRK-98765432. Would you like me to send you the tracking link as well?',
  )
  // Mark chat as read when selected
  useEffect(() => {
    if (selectedChat) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === selectedChat
            ? {
                ...chat,
                unread: false,
              }
            : chat,
        ),
      )
    }
  }, [selectedChat])
  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId)
  }
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedChat) return
    // Add new message
    const newMsg = {
      id: Date.now().toString(),
      sender: 'agent',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    setMessages((prev) => [...prev, newMsg])
    // Update last message in chat list
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChat
          ? {
              ...chat,
              lastMessage: newMessage,
              timestamp: 'Just now',
            }
          : chat,
      ),
    )
    // Clear input
    setNewMessage('')
    // Generate new AI suggestion (simulated)
    setTimeout(() => {
      setAiSuggestion('Is there anything else I can help you with today?')
    }, 1000)
  }
  const handleUseAiSuggestion = () => {
    setNewMessage(aiSuggestion)
  }
  const handleEscalate = () => {
    alert('This conversation would be escalated to the admin team.')
  }
  return (
    <div className="h-[calc(100vh-10rem)] space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Customer Care</h2>
        <p className="mt-1 text-sm text-gray-500">
          Handle customer inquiries and support requests. Use AI suggestions to
          help with responses.
        </p>
      </div>
      <div className="grid h-[calc(100%-6rem)] grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chat list */}
        <div className="overflow-hidden rounded-lg bg-white shadow lg:col-span-1">
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Conversations
            </h3>
          </div>
          <ul
            className="divide-y divide-gray-200 overflow-y-auto"
            style={{
              maxHeight: 'calc(100% - 57px)',
            }}
          >
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`cursor-pointer p-4 hover:bg-gray-50 ${selectedChat === chat.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleSelectChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 ${chat.unread ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      <MessageSquare size={20} className="text-gray-500" />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {chat.customer}
                      {chat.unread && (
                        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          New
                        </span>
                      )}
                    </p>
                    <p className="truncate text-sm text-gray-500">
                      {chat.lastMessage}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{chat.timestamp}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Chat window */}
        <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow lg:col-span-2">
          {selectedChat ? (
            <>
              {/* Chat header */}
              <div className="border-b border-gray-200 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {chats.find((c) => c.id === selectedChat)?.customer}
                    </h3>
                  </div>
                  <button
                    onClick={handleEscalate}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                    Escalate
                  </button>
                </div>
              </div>
              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4"
                style={{
                  maxHeight: 'calc(100% - 132px)',
                }}
              >
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'agent' ? 'bg-blue-100 text-blue-800' : message.sender === 'bot' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="mt-1 text-right text-xs text-gray-500">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* AI suggestion */}
              {aiSuggestion && (
                <div className="border-t border-gray-200 bg-blue-50 px-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 text-xs font-medium text-blue-600">
                        AI Suggestion:
                      </span>
                      <p className="text-sm text-gray-800">{aiSuggestion}</p>
                    </div>
                    <button
                      onClick={handleUseAiSuggestion}
                      className="ml-2 rounded-md bg-blue-100 p-1 text-blue-600 hover:bg-blue-200"
                      title="Use this suggestion"
                    >
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              )}
              {/* Message input */}
              <div className="border-t border-gray-200 px-4 py-4">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Type your message..."
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${newMessage.trim() ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
                  >
                    <Send size={16} className="mr-2" />
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-6">
              <MessageSquare size={48} className="text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No conversation selected
              </h3>
              <p className="mt-1 text-center text-gray-500">
                Select a conversation from the list to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default CustomerCare
