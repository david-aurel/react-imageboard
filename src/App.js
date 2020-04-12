import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Grid from './grid';
import Nav from './nav';
import fetch from './fetch';

function App() {
    const [photos, setPhotos] = useState([]);
    const [endpoint, setEndpoint] = useState(`/photos/?`);
    const [page, setPage] = useState(1);
    const [err, setErr] = useState();
    const [showBig, setShowBig] = useState(true);

    useEffect(() => {
        getPhotos(`/photos/?`, 1);
    }, []);

    async function getPhotos(endpoint, page) {
        try {
            let data = await fetch(endpoint, page);
            setPhotos((state) => [...state, ...data]);
        } catch (err) {
            setErr(err);
        }
    }

    // TODO: refactor fetchMore() and handleEndpoint()
    function fetchMore() {
        setPage(page + 1);
        getPhotos(endpoint, page + 1);
    }

    function handleEndpoint(val) {
        setPhotos([]);
        setPage(1);
        if (val === '') {
            getPhotos(`/photos/?`, 1);
            setEndpoint(`/photos/?`);
        } else {
            getPhotos(`/search/photos/?query=${val}&`, 1);
            setEndpoint(`/search/photos/?query=${val}&`);
        }
    }

    function handleShowBig() {
        setShowBig(!showBig);
    }

    function renderGrid() {
        if (!photos.length) {
            if (err) {
                return <p className='error'>{err.message}</p>;
            }
            return <p className='loading'>Loading...</p>;
        } else {
            return (
                <Route
                    path='/'
                    render={(routeProps) => (
                        <Grid
                            photos={photos}
                            fetchMore={fetchMore}
                            showBig={showBig}
                            err={err}
                            {...routeProps}
                        />
                    )}
                />
            );
        }
    }

    return (
        <Router>
            {renderGrid()}
            <Nav
                showBig={showBig}
                handleShowBig={handleShowBig}
                handleEndpoint={handleEndpoint}
            />
        </Router>
    );
}

export default App;
