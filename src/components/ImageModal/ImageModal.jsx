import Modal from 'react-modal';
import styles from './ImageModal.module.css';

const ImageModal = ({ image, onClose }) => {
    return (
        <Modal
            isOpen={true}
            onRequestClose={onClose}
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
        >
            <button className={styles.closeButton} onClick={onClose}>
                &times;
            </button>
            <img className={styles.image} src={image.urls.regular} alt={image.alt_description} />
            <p>Author: {image.user.name}</p>
            <p>Description: {image.alt_description || 'No description available'}</p>
        </Modal>
    );
};

export default ImageModal;
