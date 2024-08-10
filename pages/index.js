import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [language, setLanguage] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/infer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setSuggestions(data.suggestions);
      setError(null);
    } catch (err) {
      console.error('Error fetching suggestions:', err);
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Code Suggestion AI</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </label>
        <label>
          Language:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </label>
        <button type="submit">Get Suggestions</button>
      </form>
      {error && <p>Error: {error}</p>}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}
