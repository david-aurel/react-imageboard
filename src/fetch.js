import axios from 'axios';
const accessKey = 'MBpZXiRtXgsPjZkmm9cD4m9fBOzYUk3-bzS6sfb5FE8';

const fetch = async (endpoint, page) => {
    try {
        let { data } = await axios.get(
            `https://api.unsplash.com${endpoint}page=${page}&per_page=10&client_id=${accessKey}`
        );
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
    const mostLikes = photos.sort((a, b) => b.likes - a.likes)[0].id;
    photos.map((photo, i) => (photo.popular = mostLikes === photo.id));
    return photos;
}

export default fetch;
