import { Component } from 'react';
import PropTypes from 'prop-types';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {

    render() {
        const { showImg, images, status, visibleButton, loadMore } = this.props;
        if (status === 'rejected') {
            return (
                <h2
                    className={css.colum}
                >{`${this.props.value} is not defined`}</h2>
            );
        }
        if (status === 'pending') {
            return (
                <div className={css.colum}>
                    <Loader />
                </div>
            );
        }
        if (status === 'resolved') {
            return (
                <div className={css.colum}>
                    <ul className={css.imageGallery}>
                        {images.length &&
                            images.map(
                                ({ id, webformatURL, largeImageURL, tags }) => (
                                    <li
                                        key={id}
                                        className={css.imageGalleryItem}
                                        onClick={() =>
                                            showImg({
                                                largeImageURL,
                                                tags,
                                            })
                                        }
                                    >
                                        <ImageGalleryItem
                                            src={webformatURL}
                                            tags={tags}
                                        />
                                    </li>
                                )
                            )}
                    </ul>
                    {images.length !== 0 && visibleButton === true && (
                        <Button clickHandler={loadMore} text="Load More">
                            Load More
                        </Button>
                    )}
                </div>
            );
        }
    }
}

ImageGallery.propTypes = {
    showImg: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};

