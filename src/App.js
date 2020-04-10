import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import secrets from './secrets.json';
import Grid from './grid';
import Nav from './nav';

function App() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [err, setErr] = useState();
    const [showBig, setShowBig] = useState(true);

    useEffect(() => {
        (async () => {
            const unsplashEndpoint = `https://api.unsplash.com/photos/?page=${page}&per_page=10&client_id=${secrets.accessKey}`;
            try {
                let { data } = await axios.get(unsplashEndpoint);
                data = addOrientation(data);
                data = addPopularity(data);
                setPhotos((state) => [...state, ...data]);
            } catch (err) {
                setErr(err);
            }
        })();
    }, [page]);

    function fetchMore() {
        setPage(page + 1);
    }

    function handleShowBig() {
        setShowBig(!showBig);
    }

    function addOrientation(photos) {
        photos.map((photo) => {
            return (photo.orientation =
                photo.width > photo.height ? 'horizontal' : 'vertical');
        });
        return photos;
    }

    function addPopularity(photos) {
        const mostLikes = photos.sort((a, b) => {
            return b.likes - a.likes;
        })[0].id;
        photos.map((photo, i) => {
            return (photo.popular = mostLikes === photo.id);
        });
        return photos;
    }

    if (!photos.length) {
        if (err) {
            return <p className='error'>{err.message} :(</p>;
        }
        return <p className='loading'>Loading...</p>;
    } else {
        return (
            <Router>
                <Route
                    path='/'
                    render={(routeProps) => (
                        <Grid
                            photos={photos}
                            fetchMore={fetchMore}
                            showBig={showBig}
                            {...routeProps}
                        />
                    )}
                />
                <Nav showBig={showBig} handleShowBig={handleShowBig} />
            </Router>
        );
    }
}

export default App;
