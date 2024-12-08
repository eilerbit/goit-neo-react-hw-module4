import { useState } from 'react';
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

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
        setImages([]);
        await fetchImages(searchQuery, 1);
    };

    const fetchImages = async (searchQuery, pageNum) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://api.unsplash.com/search/photos', {
                params: { query: searchQuery, page: pageNum, per_page: 15 },
                headers: { Authorization: 'Client-ID qxEHf9KRE1bO0opHCyyoymihK_NiUIH4qpRnQ3T7dP0' },
            });
            setImages((prevImages) => [...prevImages, ...response.data.results]);
        } catch (err) {
          console.error(err);
            setError('Failed to fetch images. Error {err.} Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setPage(nextPage);
        await fetchImages(query, nextPage);
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
