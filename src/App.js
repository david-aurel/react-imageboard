import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import secrets from './secrets.json';
import Navbar from './navbar';
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
        <>
            <Navbar />
            <Grid fetchedPhotos={photos} fetchMore={fetchMore} />
        </>
    );
}

export default App;
