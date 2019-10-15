import client from '../util/api-client';

export const getFolders = () => {
    return client.fetch('media-folders').then(response => {
        return response.data.data;
    });
};

export const createFolder = params => {
    return client.create('media-folders', params).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error.response.data.errors;
    });
};

export const updateFolder = (id, params) => {
    return client.update(`media-folders/${id}`, params).then(response => {
        return response.data.data;
    }).catch(error => {
        throw error.response.data.errors;
    });
};

export const deleteFolder = id => {
    return client.destroy(`media-folders/${id}`);
};

export default {
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder,
};
