import React, { useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const WhatsAppButton = ({ isOverlayOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const phoneNumber = '+923097320061';
  const defaultMessage = "Hello! I'm interested in your products and have a question.";

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const finalMessage = message || defaultMessage;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(finalMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Chat Popup Window */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-80 rounded-lg bg-gray-900/80 backdrop-blur-md shadow-2xl shadow-primary/30 border border-primary/50 transition-all duration-300 ease-out ${
          isOverlayOpen ? 'z-40' : 'z-50'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-primary rounded-t-lg">
            <h3 className="font-bold text-white">Chat with Vape Alley</h3>
            <button onClick={toggleChat} className="text-white hover:text-gray-300">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Message Area */}
          <div className="p-4 text-sm text-gray-300">
            <p>Hi there! 👋<br />How can we help you today?</p>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-primary/30">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow bg-gray-800 text-white rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="bg-primary text-white p-2 rounded-full hover:bg-primary-hover">
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-110 ${
          isOverlayOpen ? 'z-40' : 'z-50'
        }`}
        aria-label="Contact us on WhatsApp"
      >
        {/* WhatsApp Icon SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-white" fill="currentColor">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.1-8.5-44-27.1-16.3-14.5-27.3-32.5-30.4-38.1-3.1-5.6-.3-8.8 2.5-11.6 2.5-2.5 5.5-6.5 8.3-9.8 2.8-3.2 3.7-5.6 5.6-9.4 1.9-3.7.9-6.9-1.9-9.7-2.8-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </button>
    </>
  );
};

export default WhatsAppButton;