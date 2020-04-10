import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Route, Link } from 'react-router-dom';
import Modal from './modal';

function Grid({ fetchedPhotos, fetchMore, loadModal, history, err }) {
    const [photos, setPhotos] = useState([]);
    const [selected, setSelected] = useState();
    const [showModal, setShowModal] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (fetchedPhotos) {
            addOrientation(fetchedPhotos);
            addPopularity(fetchedPhotos);
            setPhotos([...photos, ...fetchedPhotos]);
            if (
                document.querySelector('.grid').scrollHeight <
                document.querySelector('#root').clientHeight
            ) {
                fetchMore();
            }
        }
    }, [fetchedPhotos, selected]);

    function addOrientation(photos) {
        if (photos) {
            photos.map((photo) => {
                return (photo.orientation =
                    photo.width > photo.height ? 'horizontal' : 'vertical');
            });
        }
    }
    function addPopularity(photos) {
        if (photos) {
            const mostLikes = photos.sort((a, b) => {
                return b.likes - a.likes;
            })[0].id;
            photos.map((photo, i) => {
                return (photo.popular = mostLikes === photo.id);
            });
        }
    }
    function handleScroll(e) {
        const bottom = e.scrollHeight - e.scrollTop === e.clientHeight;
        if (bottom) {
            fetchMore();
        }
    }

    function closeModal() {
        setShowModal(false);
    }

    function setFocus() {
        ref.current.children[selected].children[0].focus();
    }

    if (!fetchedPhotos) {
        if (err) {
            return <p className='error'>{err.message} :(</p>;
        }
        return <p className='loading'>Loading...</p>;
    }

    const mappedPhotos = photos.map((photo, i) => {
        return (
            <div
                key={i}
                className={`photoCard ${photo.orientation} ${
                    photo.popular ? 'big' : 'small'
                }`}
            >
                <Link
                    to={`/photo-${i}`}
                    onClick={() => {
                        setSelected(i);
                        setShowModal(true);
                    }}
                    tabIndex={showModal ? -1 : 0}
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
                onScroll={(e) => handleScroll(e.target)}
                ref={ref}
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
