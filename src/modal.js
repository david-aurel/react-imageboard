import React, { useEffect, useState } from 'react';

function Modal({ photo, show, closeModal, history, setFocus }) {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) {
            setRender(true);
        }
    }, [show]);

    function onAnimationEnd() {
        if (!show) {
            setRender(false);
            history.push('/');
        }
    }

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            closeModal();
            setFocus();
        }
    }

    return (
        render && (
            <>
                <div
                    className='background'
                    style={{
                        animation: `${
                            show ? 'backgroundIn' : 'backgroundOut'
                        } 300ms`,
                    }}
                />
                <div
                    className='modal'
                    style={{
                        animation: `${show ? 'modalIn' : 'modalOut'} 300ms`,
                    }}
                    onAnimationEnd={onAnimationEnd}
                >
                    <img
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        className='modalImg'
                        onClick={closeModal}
                        onKeyPress={handleKeyPress}
                        tabIndex='0'
                    />
                    <div className='authorCard'>
                        <a
                            href={photo.user.links.html}
                            className='author'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <img
                                src={photo.user.profile_image.small}
                                alt={`${photo.user.name}'s profile`}
                            />
                            <p className='name'>{photo.user.name}</p>
                        </a>
                        <div className='links'>
                            <a
                                href={photo.links.download}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <i className='fas fa-download'></i>
                            </a>
                            <a
                                href={photo.links.html}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <i className='fas fa-external-link-alt'></i>
                            </a>
                        </div>
                    </div>
                </div>
            </>
        )
    );
}

export default Modal;
