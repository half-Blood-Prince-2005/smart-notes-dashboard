import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import './App.css';

function generateId() {
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('smart-notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedNoteId, setSelectedNoteId] = useState(() => {
    try {
      const saved = localStorage.getItem('smart-notes');
      const parsed = saved ? JSON.parse(saved) : [];
      return parsed.length > 0 ? parsed[0].id : null;
    } catch {
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('smart-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    const newNote = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      lastEdited: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = (id, field, value) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id
          ? { ...note, [field]: value, lastEdited: Date.now() }
          : note
      )
    );
  };

  const deleteNote = (id) => {
    const remaining = notes.filter(note => note.id !== id);
    setNotes(remaining);
    if (selectedNoteId === id) {
      setSelectedNoteId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const selectedNote = notes.find(note => note.id === selectedNoteId) || null;

  const filteredNotes = notes.filter(note => {
    const q = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(q) ||
      note.content.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app-container">
      <Sidebar
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        onAddNote={addNote}
        onSearch={setSearchQuery}
        onSelectNote={setSelectedNoteId}
        onDeleteNote={deleteNote}
      />
      <Editor
        note={selectedNote}
        onUpdateNote={updateNote}
      />
    </div>
  );
}

export default App;