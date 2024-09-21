import React, { useState } from 'react';

const EventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date) {
      onAddEvent({ title, start: new Date(date), end: new Date(date) });
      setTitle('');
      setDate('');
    }
  };

  return (
    <form className="max-w-xs p-4 mx-auto bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="mb-2 text-lg font-bold">Add Event</h2>
      <div className="mb-3">
        <label className="block mb-1 text-gray-700" htmlFor="title">Title</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1 text-gray-700" htmlFor="date">Date</label>
        <input
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button
        className="w-full py-2 text-white transition duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
        type="submit"
      >
        Add Event
      </button>
    </form>
  );
};

export default EventForm;
