import React, { useEffect, useRef } from 'react';
import useTimeAgo from '../useTimeAgo';

function Editor({ note, onUpdateNote }) {
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const timeAgo = useTimeAgo(note?.lastEdited);

    useEffect(() => {
        if (!note) return;

        if (note.title === 'Untitled Note') {
            titleRef.current?.focus();
            titleRef.current?.select();
        } else {
            contentRef.current?.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [note?.id]);

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
                <div className="editor-footer">
                    🕐 Last edited {timeAgo}
                </div>
            </div>
        </div>
    );
}

export default Editor;