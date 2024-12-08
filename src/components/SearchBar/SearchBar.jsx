import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => setQuery(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            alert('Please enter a search term!');
            return;
        }
        onSubmit(query);
    };

    return (
        <header className={styles.header}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={query}
                        onChange={handleChange}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.iconButton}>
                        &#128269;
                    </button>
                </div>
            </form>
        </header>
    );
};

export default SearchBar;
