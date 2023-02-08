import { Component } from 'react';
import PropTypes from 'prop-types';
import { getImages } from '../../services/getImages';
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
        visibleButton: true,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                images: [],
                page: 1,
                status: 'pending',
                visibleButton: true,
            });
        }
        if (
            prevProps.value !== this.props.value ||
            prevState.page !== this.state.page
        ) {
            getImages(this.props.value, this.state.page)
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    if (!data.total) {
                        // Promise.reject(new Error());
                        throw new Error();
                    }
                    if (data.hits.length < 12) {
                        this.setState({ visibleButton: false });
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
        const { images, status, visibleButton } = this.state;
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
                        <Button clickHandler={this.loadMore} text="Load More">
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

