import React from 'react';
import SearchBar from './SearchBar';
import NotesList from './NotesList';

function Sidebar({ notes, selectedNoteId, onAddNote, onSearch, onSelectNote, onDeleteNote }) {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="sidebar-title">📝 Notes</div>
                <button className="add-note-btn" onClick={onAddNote}>
                    + New Note
                </button>
            </div>

            <SearchBar onSearch={onSearch} />

            <NotesList
                notes={notes}
                selectedNoteId={selectedNoteId}
                onSelectNote={onSelectNote}
                onDeleteNote={onDeleteNote}
            />
        </div>
    );
}

export default Sidebar;