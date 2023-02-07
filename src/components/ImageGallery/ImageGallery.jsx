import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../services/getImages';
import { Loader } from '../Loader/Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Button } from '../Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
    state = {
        images: [],
        loading: false,
        error: '',
        status: 'idle',
        page: 1,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({ images: [], page: 1, status: 'pending' });
        }
        if (
            prevProps.value !== this.props.value ||
            prevState.page !== this.state.page
        ) {
            getImages(this.props.value, this.state.page)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (!parseInt(data.total) > 0) {
                        // Promise.reject(new Error());
                        throw new Error();
                    }
                    this.setState(prevState => ({
                        images: [...prevState.images, ...data.hits],
                        status: 'resolved',
                    }));
                })
                .catch(error => this.setState({ error, status: 'rejected' }));
        }
    }
    loadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    };

    render() {
        const { images, status } = this.state;
        const { showImg } = this.props;
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
                        {images &&
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
                    <Button clickHandler={this.loadMore} text="Load More">
                        Load More
                    </Button>
                </div>
            );
        }
    }
}

ImageGallery.propTypes = {
    showMore: PropTypes.func.isRequired,
};

