import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import axios from 'axios';
import './App.css';
import secrets from './secrets.json';
import Grid from './grid';

function App() {
    const [photos, setPhotos] = useState('');
    const [page, setPage] = useState(1);
    const unsplashEndpoint = `https://api.unsplash.com/photos/?page=${page}&per_page=10&client_id=${secrets.accessKey}`;

    async function fetchMore() {
        setPage(page + 1);
    }
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(unsplashEndpoint);
            setPhotos(data);
        })();
    }, [page]);
    return (
        <Router>
            <Route
                path='/'
                render={(routeProps) => (
                    <Grid
                        fetchedPhotos={photos}
                        fetchMore={fetchMore}
                        {...routeProps}
                    />
                )}
            ></Route>
        </Router>
    );
}

render(<App />, document.querySelector('#root'));
