import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
    closeByEscape = e => {
        if (e.code === 'Escape') {
            this.props.closeModal();
        }
    };
    componentDidMount() {
        window.addEventListener('keydown', this.closeByEscape);
    }
    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.closeModal();
        }
    };
    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByEscape);
    }

    render() {
        const {
            currentImg: { largeImageURL, tags },
        } = this.props;
        // console.log(alt.tags);
        return (
            <div className={css.overlay} onClick={this.handleBackdropClick}>
                <div className={css.modal}>
                    <img
                        className={css.image}
                        src={largeImageURL}
                        alt={tags}
                    />
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    currentImg: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
    }),
};
