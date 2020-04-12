import axios from 'axios';
const accessKey = 'MBpZXiRtXgsPjZkmm9cD4m9fBOzYUk3-bzS6sfb5FE8';

const fetch = async (endpoint, page) => {
    try {
        let { data } = await axios.get(
            `https://api.unsplash.com${endpoint}page=${page}&per_page=50&client_id=${accessKey}`
        );
        // console.log('fetch data', data);

        if (endpoint.includes('search')) {
            data = data.results;
        }
        if (data.length) {
            data = addOrientation(data);
            data = addPopularity(data);
        } else {
            throw Error('No results');
        }
        return data;
    } catch (err) {
        throw Error(err);
    }
};

function addOrientation(photos) {
    photos.map(
        (photo) =>
            (photo.orientation =
                photo.width > photo.height ? 'horizontal' : 'vertical')
    );
    return photos;
}

function addPopularity(photos) {
    // unsplash already sorts lists of photos by likes
    const factor = photos.length / 10;
    const mostLikes = photos.sort((a, b) => b.likes - a.likes).slice(0, factor);
    const without = photos.slice(factor);
    let newPhotos = [];
    mostLikes.forEach((photo) => {
        photo.popular = true;
    });
    // distribute the popular ones evenly in sets of 10
    for (let i = 0; i <= factor - 1; i++) {
        newPhotos.push(mostLikes[i]);
        newPhotos.push(...without.slice(i * 9, (i + 1) * 9));
    }
    return newPhotos;
}

export default fetch;
