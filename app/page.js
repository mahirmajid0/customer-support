'use client'

import { useState, useEffect, useRef } from 'react'
import './page.css'

export default function Home() {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const sendMessage = async () => {
    if (!message.trim()) return;  // Don't send empty messages

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: message },
      { role: 'assistant', content: '' },
    ])

    // Simulate an API call with hardcoded responses
    setIsLoading(true)
    setTimeout(() => {
      setMessages((messages) => [
        ...messages,
        { role: 'assistant', content: getResponse(message) }
      ])
      setMessage('')
      setIsLoading(false)
    }, 1000)  // Simulate a delay
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  const handlePredefinedQuestion = (question) => {
    setMessage(question)
  }

  const getResponse = (message) => {
    const responses = {
      'What is the HeadstarterAI fellowship?': 'The HeadstarterAI fellowship is a program designed to help aspiring AI professionals by providing resources, mentorship, and hands-on projects.',
      'How can I apply for the fellowship?': 'To apply for the HeadstarterAI fellowship, visit our website and fill out the application form. Make sure to provide all required documents and information.',
      'What are the benefits of joining the fellowship?': 'Joining the HeadstarterAI fellowship offers benefits such as access to exclusive workshops, networking opportunities with industry experts, and support for your AI projects.',
      'What skills are required for the fellowship?': 'The fellowship is ideal for individuals with a background in computer science, data science, or a related field, along with a strong interest in AI and machine learning.',
      'Is there a fee to join the fellowship?': 'No, the HeadstarterAI fellowship is free of charge. We aim to support talented individuals regardless of their financial situation.',
      'How long does the fellowship last?': 'The fellowship program typically lasts for 3 months over the summer, during which fellows will work on various projects and participate in workshops and mentoring sessions.',
      'Can international students apply for the fellowship?': 'Yes, the HeadstarterAI fellowship is open to international students. We welcome applications from talented individuals worldwide.',
      'Where can I find more information about the fellowship?': 'For more information, please visit our website: https://headstarter.co/.'
    }
    return responses[message] || 'Sorry, I don\'t have an answer for that question.'
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="container">
      <div className="chat-box">
        <div className="header">
          <h1>Headstarter AI FAQ Chat Bot</h1>
          <button className="go-back-button">Go Back</button>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role}`}
            >
              {message.content}
            </div>
          ))}
          {/* The ref to control scroll behavior */}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="Type your message here"
          />
          <button onClick={sendMessage} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>

      <div className="questions-container">
        <button onClick={() => handlePredefinedQuestion('What is the HeadstarterAI fellowship?')}>What is the HeadstarterAI fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('How can I apply for the fellowship?')}>How can I apply for the fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('What are the benefits of joining the fellowship?')}>What are the benefits of joining the fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('What skills are required for the fellowship?')}>What skills are required for the fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('Is there a fee to join the fellowship?')}>Is there a fee to join the fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('How long does the fellowship last?')}>How long does the fellowship last?</button>
        <button onClick={() => handlePredefinedQuestion('Can international students apply for the fellowship?')}>Can international students apply for the fellowship?</button>
        <button onClick={() => handlePredefinedQuestion('Where can I find more information about the fellowship?')}>Where can I find more information about the fellowship?</button>
      </div>
    </div>
  )
}
