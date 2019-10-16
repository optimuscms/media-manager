const client = axios.create({
    baseURL: '/admin/api/',
});

export default {
    // Make a get request
    fetch(uri, params = {}) {
        return client.get(uri, { params });
    },

    // Make a post request
    create(uri, params = {}) {
        return client.post(uri, params);
    },

    // Make a patch request
    update(uri, params = {}) {
        return client.patch(uri, params);
    },

    // Make a delete request
    destroy(uri) {
        return client.delete(uri);
    },
};
