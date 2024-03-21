import React, { useEffect, useRef } from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useListenMessage from '../hooks/useListenMessage';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessage();
  const messagesEndRef = useRef();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id}>
            <Message message={message} />
          </div>
        ))}
      {loading &&
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      }
      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-400'>Send a message to start the conversation</p>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;