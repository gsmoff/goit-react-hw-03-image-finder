import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Toaster } from 'react-hot-toast';
import { Modal } from './Modal/Modal';

export class App extends Component {
    state = {
        searchText: '',
        currentImg: null,
    };

    handleSubmit = searchText => {
        if (searchText === this.state.searchText) {
            return;
        }
        this.setState({ searchText });
    };
    showMore = data => {
        this.setState({ currentImg: data });
    };
    closeModal = () => {
        this.setState({ currentImg: null });
    };

    render() { 
        const { currentImg, searchText } = this.state;
        return (
            <div>
                <Toaster position="top-right" toastOption={{ duration: 500 }} />
                <Searchbar onSearch={this.handleSubmit} />
                <ImageGallery value={searchText} showImg={this.showMore} />
                
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
