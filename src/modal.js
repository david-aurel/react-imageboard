import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Modal({ photo, show, closeModal }) {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) {
            setRender(true);
        }
    }, [show]);

    const onAnimationEnd = () => {
        if (!show) setRender(false);
    };

    return (
        render && (
            <div
                className='modal'
                style={{ animation: `${show ? 'fadeIn' : 'fadeOut'} 300ms` }}
                onAnimationEnd={onAnimationEnd}
            >
                <button to='/' onClick={closeModal}>
                    click
                </button>
            </div>
        )
    );
}

export default Modal;
