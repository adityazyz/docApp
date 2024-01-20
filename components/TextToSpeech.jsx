import React, { useState, useEffect } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

const SpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const { listen, stop } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
    },
  });

  useEffect(() => {
    if (isListening) {
      listen();
    } else {
      stop();
    }
  }, [isListening, listen, stop]);

  const handleStartListening = () => {
    setIsListening(true);
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">
        Speech-to-Text Converter using React and Tailwind CSS
      </h1>
      <div className="w-full max-w-xl bg-gray-200 rounded-lg p-4">
        <div className="h-40 bg-white overflow-y-scroll border border-gray-300 rounded p-2 mb-4">
          {transcript}
        </div>
        <div className="flex justify-center">
          {isListening ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleStopListening}
            >
              Stop Listening
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleStartListening}
            >
              Start Listening
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;