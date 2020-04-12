import React, { useState, useRef } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from './modal';

function Grid({ photos, fetchMore, history, showBig }) {
    const [selected, setSelected] = useState();
    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null);

    function infiniteScroll(e) {
        const bottom = e.scrollHeight - e.scrollTop <= e.clientHeight;
        if (bottom) {
            fetchMore();
        }
    }

    function closeModal() {
        setShowModal(false);
    }
    function setFocus() {
        // sets focus to where you left off after closing modal
        ref.current.children[selected].children[0].focus();
    }

    const mappedPhotos = photos.map((photo, i) => {
        return (
            <div
                key={i}
                className={`photoCard ${photo.orientation} ${
                    photo.popular && showBig ? 'big' : ''
                }`}
            >
                <Link
                    to={`/photo-${i}`}
                    onClick={() => {
                        setSelected(i);
                        setShowModal(true);
                    }}
                    tabIndex={showModal ? -1 : 2}
                >
                    <img src={photo.urls.small} alt={photo.alt_description} />
                </Link>
            </div>
        );
    });

    return (
        <>
            <div
                className='grid'
                ref={ref}
                onScroll={(e) => infiniteScroll(e.target)}
            >
                {mappedPhotos}
            </div>

            <Route path='/:photo'>
                <Modal
                    photo={photos[selected]}
                    show={showModal}
                    closeModal={closeModal}
                    history={history}
                    setFocus={setFocus}
                />
            </Route>
        </>
    );
}

export default Grid;
