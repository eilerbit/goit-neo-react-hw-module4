import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import axios from 'axios';
import styles from './App.module.css';

const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        if (!query) return;

        const fetchImages = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: { query, page, per_page: 15 },
                    headers: { Authorization: 'Client-ID qxEHf9KRE1bO0opHCyyoymihK_NiUIH4qpRnQ3T7dP0' },
                });
                setImages((prevImages) => page === 1
                    ? response.data.results 
                    : [...prevImages, ...response.data.results]); 
            } catch (err) {
                console.error(err);
                setError(`Failed to fetch images. Please try again.`);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, [query, page]);

    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        setImages([]);
    };

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };


    const handleImageClick = (image) => setSelectedImage(image);

    const closeModal = () => setSelectedImage(null);

    return (
        <div className={styles.container}>
            <SearchBar onSubmit={handleSearch} />
            {error && <ErrorMessage message={error} />}
            <ImageGallery images={images} onImageClick={handleImageClick} />
            {loading && <Loader />}
            {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
            {selectedImage && <ImageModal image={selectedImage} onClose={closeModal} />}
        </div>
    );
};

export default App;
