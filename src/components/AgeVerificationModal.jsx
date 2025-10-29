import React, { useState } from 'react';

const AgeVerificationModal = ({ onVerify }) => {
  const [isRejected, setIsRejected] = useState(false);

  const handleReject = () => {
    setIsRejected(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-900/80 border border-primary rounded-xl shadow-lg p-8 text-center max-w-sm mx-4">
        <img src="/logo.png" alt="Vape Alley" className="w-24 h-24 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Age Verification</h2>
        
        {isRejected ? (
          <>
            <p className="text-red-400 mb-6">We're sorry, you must be 18 years or older to enter this site.</p>
            <p className="text-gray-400 text-sm">This site contains age-restricted products.</p>
          </>
        ) : (
          <>
            <p className="text-gray-300 mb-6">You must be 18 years or older to enter this site.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={onVerify}
                className="px-8 py-3 rounded-full bg-primary text-white font-bold hover:bg-primary-hover transition-colors"
              >
                Yes, I am 18+
              </button>
              <button
                onClick={handleReject}
                className="px-8 py-3 rounded-full bg-gray-700 text-white font-bold hover:bg-gray-600 transition-colors"
              >
                No, I am not
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AgeVerificationModal;