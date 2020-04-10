import React, { useState } from 'react';

function Nav({ showBig, handleShowBig }) {
    const [imgSize, setImgSize] = useState(1);
    const [gapSize, setGapSize] = useState(5);

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
            <div className='popular'>
                <p>Highlight Popular</p>
                <input
                    type='checkbox'
                    checked={showBig}
                    onChange={handleShowBig}
                />
            </div>
        </nav>
    );
}

export default Nav;
