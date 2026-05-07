import React, { useEffect, useRef } from 'react';

function Editor({ note, onUpdateNote }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!note) return;

        // If title is default "Untitled Note", focus title so user can rename it
        if (note.title === 'Untitled Note') {
            titleRef.current?.focus();
            titleRef.current?.select(); // select all so user can type right away
        } else {
            // Switching to an existing note — focus the content area
            contentRef.current?.focus();
        }
    }, [note?.id]); // only re-run when the selected note changes, not on every keystroke

    if (!note) {
        return (
            <div className="editor-panel">
                <div className="empty-state">
                    <h2>No note selected</h2>
                    <p>Create a new note or select one from the sidebar.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="editor-panel">
            <div className="editor">
                <input
                    ref={titleRef}
                    type="text"
                    className="editor-title"
                    value={note.title}
                    onChange={e => onUpdateNote(note.id, 'title', e.target.value)}
                    placeholder="Note title..."
                />
                <textarea
                    ref={contentRef}
                    className="editor-content"
                    value={note.content}
                    onChange={e => onUpdateNote(note.id, 'content', e.target.value)}
                    placeholder="Start writing your note here..."
                />
            </div>
        </div>
    );
}

export default Editor;