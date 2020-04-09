import React, { useEffect, useState } from 'react';

function Modal({ photo, show, closeModal, history }) {
    const [render, setRender] = useState(show);

    useEffect(() => {
        if (show) {
            setRender(true);
        }
        console.log(photo);
    }, [show]);

    const onAnimationEnd = () => {
        if (!show) {
            setRender(false);
            history.push('/');
        }
    };

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
                    onClick={closeModal}
                >
                    <img
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        className='modalImg'
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
