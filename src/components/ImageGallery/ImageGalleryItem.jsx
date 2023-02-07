import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
export const ImageGalleryItem = ({ src, tags }) => {
    return (
        <>
            <img
                className={css.imageGalleryItemImage}
                src={src}
                alt={tags}
                loading="lazy"
            />
        </>
    );
};

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};
