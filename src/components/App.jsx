import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from '../services/getImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';

export class App extends Component {
    state = {
        images: [],
        searchText: '',
        currentImg: null,
        error: '',
        status: 'idle',
        page: 1,
        visibleButton: true,
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchText !== this.state.searchText) {
            this.setState({
                status: 'pending',
                visibleButton: true,
            });
        }
        if (prevState.searchText !== this.state.searchText ||
            prevState.page !== this.state.page
        ) {
            getImages(this.state.searchText, this.state.page)
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
    handleSubmit = searchText => {
        if (searchText === this.state.searchText) {
            return;
        }
        this.setState({ searchText, images: [], page: 1 });
    };
    showMore = data => {
        this.setState({ currentImg: data });
    };
    closeModal = () => {
        this.setState({ currentImg: null });
    };
    loadMore = () => {
        this.setState(prevState => ({ page: prevState.page + 1 }));
    };

    render() {
        const {
            currentImg,
            searchText,
            images,
            status,
            visibleButton,
        } = this.state;
        return (
            <div>
                <Toaster position="top-right" toastOption={{ duration: 500 }} />
                <Searchbar onSearch={this.handleSubmit} />
                <ImageGallery
                    value={searchText}
                    showImg={this.showMore}
                    images={images}
                    status={status}
                    visibleButton={visibleButton}
                    loadMore={this.loadMore}
                />
                {currentImg && (
                    <Modal
                        currentImg={currentImg}
                        closeModal={this.closeModal}
                    />
                )}
            </div>
        );
    }
}
