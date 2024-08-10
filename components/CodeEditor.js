import React, { useState } from 'react';

export default function CodeEditor() {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleChange = (event) => {
    setCode(event.target.value);
  };

  const getSuggestions = async () => {
    if (code.trim() === '') return;

    try {
      const response = await fetch('/api/model', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: code }),
      });

      const data = await response.json();
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions('Error fetching suggestions. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <textarea
        rows="20"
        cols="80"
        className="p-4 bg-gray-800 text-white border border-gray-600 rounded w-full max-w-4xl"
        value={code}
        onChange={handleChange}
      />
      <button
        onClick={getSuggestions}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Get Suggestions
      </button>
      <div className="mt-4 p-4 bg-gray-800 rounded w-full max-w-4xl text-white">
        <h3 className="text-lg font-bold mb-2">Suggestions:</h3>
        <p>{suggestions}</p>
      </div>
    </div>
  );
}
