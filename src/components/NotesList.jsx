import React, { useEffect, useRef } from 'react';

function NotesList({ notes, selectedNoteId, onSelectNote, onDeleteNote }) {
    const bottomRef = useRef(null);
    const prevLengthRef = useRef(notes.length);

    // Auto-scroll to bottom when a new note is added
    useEffect(() => {
        if (notes.length > prevLengthRef.current) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
        prevLengthRef.current = notes.length;
    }, [notes.length]);

    if (notes.length === 0) {
        return (
            <div className="notes-empty">
                No notes yet. Click <strong>+ New Note</strong> to begin.
            </div>
        );
    }

    return (
        <div className="notes-list">
            {notes.map(note => (
                <div
                    key={note.id}
                    className={`note-item ${note.id === selectedNoteId ? 'note-item--active' : ''}`}
                    onClick={() => onSelectNote(note.id)}
                >
                    <div className="note-item-title">
                        {note.title.trim() || 'Untitled Note'}
                    </div>
                    <div className="note-item-preview">
                        {note.content.trim()
                            ? note.content.slice(0, 60) + (note.content.length > 60 ? '...' : '')
                            : 'No content yet...'}
                    </div>
                    <button
                        className="note-delete-btn"
                        onClick={e => {
                            e.stopPropagation(); // prevent selecting the note when deleting
                            onDeleteNote(note.id);
                        }}
                    >
                        ✕
                    </button>
                </div>
            ))}

            {/* Invisible anchor — we scroll here when a new note is added */}
            <div ref={bottomRef} />
        </div>
    );
}

export default NotesList;