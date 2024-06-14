'use client';

import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, wordCount: parseInt(wordCount) }),
      });
      const data = await response.json();
      setParagraph(data.paragraph);
    } catch (error) {
      console.error('Error:', error);
      setParagraph('An error occurred while generating the paragraph.');
    }
    setIsLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full max-w-[28rem] bg-white shadow-lg">
        <div className="p-8 h-full flex flex-col">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">AI Paragraph Generator</h1>
          <p className="text-gray-600 mb-8">Powered by cutting-edge AI technology</p>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
              <input
                id="topic"
                name="topic"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="wordCount" className="block text-sm font-medium text-gray-700">Word Count</label>
              <input
                id="wordCount"
                name="wordCount"
                type="number"
                required
                className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Desired word count"
                value={wordCount}
                onChange={(e) => setWordCount(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? 'Generating...' : 'Generate Paragraph'}
              </button>
            </div>
          </form>
          
          <div className="mt-auto pt-6 text-center text-sm text-gray-500">
            © 2023 AI Paragraph Generator. All rights reserved.
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col p-8 bg-gradient-to-br from-indigo-500 to-purple-600 overflow-hidden">
        <div className="flex-grow flex flex-col bg-white rounded-xl shadow-lg p-8 overflow-hidden">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Paragraph:</h2>
          <div className="flex-grow overflow-auto">
            {paragraph ? (
              <div className="h-full flex flex-col animate-fade-in">
                <p className="flex-grow text-gray-700 bg-gray-50 p-4 rounded-md shadow-inner overflow-auto">
                  {paragraph}
                </p>
                <p className="text-sm text-gray-500 mt-2">Word count: {paragraph.split(/\s+/).length}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">Your generated paragraph will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}