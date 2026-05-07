import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');

    // Debounce: only call onSearch 300ms after the user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(inputValue);
        }, 300);

        // Cleanup: cancel the timer if user types again before 300ms
        return () => clearTimeout(timer);
    }, [inputValue, onSearch]);

    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="🔍 Search notes..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;