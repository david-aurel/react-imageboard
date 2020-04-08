import React, { useEffect, useState } from 'react';

function Grid({ fetchedPhotos, fetchMore }) {
    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        if (fetchedPhotos) {
            addOrientation(fetchedPhotos);
            addPopularity(fetchedPhotos);
            setPhotos([...photos, ...fetchedPhotos]);
        }
    }, [fetchedPhotos]);

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
            console.log('bottom');
            fetchMore();
        }
    }

    if (!photos) {
        return <p className='loading'>Loading...</p>;
    }

    console.log('grid rerendered', photos);
    const mappedPhotos = photos.map((photo, i) => {
        return (
            <div key={i} className='photoCard'>
                <img
                    src={photo.urls.small}
                    className={`${photo.orientation} ${
                        photo.popular ? 'big' : 'small'
                    }`}
                    alt={photo.alt_description}
                />
            </div>
        );
    });
    return (
        <div className='grid' onScroll={(e) => handleScroll(e.target)}>
            {mappedPhotos}
            <button onClick={() => fetchMore()}>Fetch more</button>
        </div>
    );
}

export default Grid;
