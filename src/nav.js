import React, { useState } from 'react';

function Nav({ showBig, handleShowBig, handleEndpoint }) {
    const [imgSize, setImgSize] = useState(1);
    const [gapSize, setGapSize] = useState(5);
    const [search, setSearch] = useState('');

    // changing CSS root variables
    function handleImgSize(val) {
        document.documentElement.style.setProperty('--size', imgSize + val);
        setImgSize(imgSize + val);
    }
    function handleGapSize(val) {
        document.documentElement.style.setProperty(
            '--gap',
            gapSize + val + 'px'
        );
        setGapSize(gapSize + val);
    }
    return (
        <nav>
            <div className='search'>
                <input
                    type='text'
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Keywords'
                />
                <button onClick={() => handleEndpoint(search)}>Search</button>
            </div>
            <div className='settings'>
                <div className='popular'>
                    <p>Highlight Popular</p>
                    <input
                        type='checkbox'
                        checked={showBig}
                        onChange={handleShowBig}
                    />
                </div>
                <div className='imageSize'>
                    <button onClick={() => handleImgSize(-0.1)}>
                        <i className='fas fa-arrow-down'></i>
                    </button>
                    <p>Size</p>
                    <button onClick={() => handleImgSize(0.1)}>
                        <i className='fas fa-arrow-up'></i>
                    </button>
                </div>
                <div className='gapSize'>
                    <button onClick={() => handleGapSize(-2)}>
                        <i className='fas fa-arrow-down'></i>
                    </button>
                    <p>Spacing</p>
                    <button onClick={() => handleGapSize(2)}>
                        <i className='fas fa-arrow-up'></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
