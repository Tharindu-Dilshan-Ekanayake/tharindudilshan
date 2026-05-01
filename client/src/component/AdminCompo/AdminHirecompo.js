import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminHirecompo() {
  const [readMessages, setReadMessages] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const readResponse = await axios.get('/hiring/getreadmessage');
      const unreadResponse = await axios.get('/hiring/getunreadmessage');
      
      setReadMessages(readResponse.data);
      setUnreadMessages(unreadResponse.data);
      toast.success('Messages fetched successfully');
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('Failed to fetch messages');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`/hiring/deletemessage/${id}`);
      fetchMessages();
      toast.success('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const openMessagePopup = (message) => {
    setSelectedMessage(message);
    setShowPopup(true);
  };

  const closeMessagePopup = async () => {
    if (selectedMessage && !selectedMessage.read) {
      try {
        await axios.put(`/hiring/putread/${selectedMessage._id}`);
        fetchMessages();
        toast.success('Message marked as read');
      } catch (error) {
        console.error('Error marking message as read:', error);
        toast.error('Failed to mark message as read');
      }
    }
    setShowPopup(false);
    setSelectedMessage(null);
  };

  const renderMessages = (messages, title, isUnread) => (
    <div className="w-1/2 px-4">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {messages.map((message) => (
        <div key={message._id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
          <p className="font-semibold">Name: {message.name_user}</p>
          <p>Email: {message.email}</p>
          <p>Mobile: {message.mobile}</p>
          <p>Sent: {formatDate(message.createdAt)}</p>
          <button
            onClick={() => openMessagePopup(message)}
            className="px-4 py-2 mt-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            View
          </button>
          <button
            onClick={() => deleteMessage(message._id)}
            className="px-4 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );

  const renderPopup = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
      <div className="w-full max-w-2xl p-8 m-4 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold">Message from {selectedMessage.name_user}</h2>
        <p><span className="font-semibold">Email:</span> {selectedMessage.email}</p>
        <p><span className="font-semibold">Mobile:</span> {selectedMessage.mobile}</p>
        <p><span className="font-semibold">Message:</span> {selectedMessage.message}</p>
        <p><span className="font-semibold">Sent:</span> {formatDate(selectedMessage.createdAt)}</p>
        <button
          onClick={closeMessagePopup}
          className="px-4 py-2 mt-4 text-white bg-gray-500 rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );

  return (
    <div className="container p-4 mx-auto">
      <Toaster position="top-right" />
      <div className="flex flex-wrap -mx-4">
        {renderMessages(unreadMessages, "Unread Messages", true)}
        {renderMessages(readMessages, "Read Messages", false)}
      </div>
      {showPopup && renderPopup()}
    </div>
  );
}