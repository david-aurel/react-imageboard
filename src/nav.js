import React, { useState } from 'react';

function Nav({ handleShowBig }) {
    const [imgSize, setImgSize] = useState(1);
    const [gapSize, setGapSize] = useState(5);

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
            Image Size
            <button onClick={() => handleImgSize(-0.1)}>-</button>
            <button onClick={() => handleImgSize(0.1)}>+</button>
            Gap Size
            <button onClick={() => handleGapSize(-2)}>-</button>
            <button onClick={() => handleGapSize(2)}>+</button>
            Make popular Images big
            <input type='checkbox' checked onChange={handleShowBig} />
        </nav>
    );
}

export default Nav;
