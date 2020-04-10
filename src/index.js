import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import secrets from './secrets.json';
import Grid from './grid';
import Nav from './nav';

function App() {
    const [photos, setPhotos] = useState();
    const [page, setPage] = useState(1);
    const [err, setErr] = useState();
    const [showBig, setShowBig] = useState(true);
    const unsplashEndpoint = `https://api.unsplash.com/photos/?page=${page}&per_page=10&client_id=${secrets.accessKey}`;

    function fetchMore() {
        setPage(page + 1);
    }
    function handleShowBig() {
        setShowBig(!showBig);
    }
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(unsplashEndpoint);
                setPhotos(data);
            } catch (err) {
                setErr(err);
            }
        })();
    }, [page, showBig]);
    return (
        <Router>
            <Route
                path='/'
                render={(routeProps) => (
                    <Grid
                        fetchedPhotos={photos}
                        fetchMore={fetchMore}
                        err={err}
                        showBig={showBig}
                        {...routeProps}
                    />
                )}
            ></Route>
            <Nav handleShowBig={handleShowBig} />
        </Router>
    );
}

render(<App />, document.querySelector('#root'));
