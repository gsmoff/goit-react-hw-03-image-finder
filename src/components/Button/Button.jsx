import React from 'react';
import css from './Button.module.css';
export const Button = ({ clickHandler, text }) => {
    return (
        <button onClick={clickHandler} className={css.loadMore}>
            {text}
        </button>
    );
};
