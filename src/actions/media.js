import client from '../util/api-client';

export const getMedia = params => {
    return client.fetch('media', params).then(response => {
        return response.data.data;
    });
};

export const createMedia = (params, options) => {
    return client.create('media', params, options).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error.response.data.errors;
    });
};

export const updateMedia = (id, params) => {
    return client.update(`media/${id}`, params).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error.response.data.errors;
    });
};

export const deleteMedia = id => {
    return client.destroy(`media/${id}`);
};

export default {
    getMedia,
    createMedia,
    updateMedia,
    deleteMedia,
};
