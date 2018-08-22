const defaultOpenFolders = () => {
    return [{ id: null, name: 'Home' }];
};

const state = {
    isLoading: true,

    media: {},
    focusedMediaIds: [],
    selectedMedia: [],

    folders: {},
    focusedFolderIds: [],
    openFolders: defaultOpenFolders(),

    activeMedia: [],

    move: {
        folders: [],
        openFolders: []
    },

    icons: {
        'file-image': ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg'],
        'file-pdf': ['pdf'],
        'file-word': ['doc', 'docx'],
        'file-excel': ['xls', 'xlsx'],
        'file-video': ['mp4', 'mov'],
        'file-audio': ['mp3'],
        'file-archive': ['zip'],
        'file-power-point': ['ppt', 'pptx'],
    },
    
    imageExtensions: [
        'bmp', 'gif', 'jpg', 'jpeg', 'png'
    ],
};

const getters = {
    isLoading: state => {
        return state.isLoading;
    },

    allMedia: state => {
        return state.media;
    },

    currentMedia: (state, getters) => {
        return state.media.hasOwnProperty(getters.activeFolderId)
            ? state.media[getters.activeFolderId]
            : [];
    },

    focusedMediaIds: state => {
        return state.focusedMediaIds;
    },

    selectedMedia: state => {
        return state.selectedMedia;
    },

    selectedMediaIds: state => {
        return state.selectedMedia.map(({ id }) => id);
    },

    allFolders: state => {
        return state.folders;
    },

    currentFolders: (state, getters) => {
        return state.folders.hasOwnProperty(getters.activeFolderId)
            ? state.folders[getters.activeFolderId]
            : [];
    },

    activeFolderId: state => {
        return state.openFolders[state.openFolders.length - 1].id;
    },

    focusedFolderIds: state => {
        return state.focusedFolderIds;
    },

    firstFocusedFolder: state => {
        return state.focusedFolderIds.length ? state.focusedFolderIds[0] : null;
    },

    openFolders: state => {
        return state.openFolders;
    },

    activeMedia: state => mediaIds => {
        return state.activeMedia.filter(media => mediaIds.includes(media.id));
    },



    getMoveFolders: state => { // todo rename
        return state.move.folders;
    },

    getMoveOpenFolders: state => { // todo rename
        return state.move.openFolders;
    },




    icon: state => extension => {
        let icon = 'file-alt';

        Object.keys(state.icons).some(key => {
            if (state.icons[key].includes(extension)) {
                return icon = key;
            }
        });

        return icon;
    },

    imageExtensions: state => {
        return state.imageExtensions;
    },

    isImage: state => extension => {
        return state.imageExtensions.includes(extension);
    },
};

const actions = {
    getMediaAndFolders({ commit, getters }) {
        let requests = [];

        if (! getters.allMedia.hasOwnProperty(getters.activeFolderId)) {
            requests.push(axios.get('/api/media', {
                params: { folder: getters.activeFolderId || 'root' }
            }));
        }

        if (! getters.allFolders.hasOwnProperty(getters.activeFolderId)) {
            requests.push(axios.get('/api/media-folders', {
                params: { parent: getters.activeFolderId || 'root' }
            }));
        }

        if (requests.length) {
            commit('setLoading', true);

            axios.all(requests).then(axios.spread((media, folders) => {
                commit('setMedia', {
                    folder: getters.activeFolderId,
                    media: media.data.data
                });

                commit('setFolders', {
                    parent: getters.activeFolderId,
                    folders: folders.data.data
                });

                commit('setLoading', false);
            }));
        } else {
            commit('setLoading', false);
        }
    },

    setSelectedMedia({ commit, getters }, mediaIds) {
        commit('setSelectedMedia', (Array.isArray(mediaIds) && mediaIds.length)
            ? getters.activeMedia(mediaIds)
            : []);
    },

    selectMedia({ commit, getters }) {
        let newlySelectedMedia = getters.focusedMediaIds.filter(id => {
            return ! getters.selectedMediaIds.includes(id);
        });

        if (newlySelectedMedia.length) {
            let media = getters.currentMedia.filter(({ id }) => {
                return newlySelectedMedia.includes(id);
            });

            commit('addSelectedMedia', media);
            commit('addActiveMedia', media);
        }

        commit('clearFocusedMediaIds');
    },

    moveFocusedMediaTo({ commit, getters }, folderId) {
        if (folderId !== getters.activeFolderId) {
            let movedMedia = getters.currentMedia.filter(({ id }) => {
                return getters.focusedMediaIds.includes(id);
            });

            commit('addMedia', {
                folder: folderId,
                media: movedMedia
            });

            commit('removeMedia', {
                folder: getters.activeFolderId,
                media: movedMedia
            });
        }

        commit('clearFocusedMediaIds');
    },

    removeFocusedMedia({ commit, getters }) {
        let removedMedia = getters.currentMedia.filter(({ id }) => {
            return getters.focusedMediaIds.includes(id);
        });

        commit('removeMedia', {
            folder: getters.activeFolderId,
            media: removedMedia
        });

        commit('clearFocusedMediaIds');
    },

    moveFocusedFoldersTo({ commit, getters }, folderId) {
        if (folderId !== getters.activeFolderId) {
            let movedFolders = getters.currentFolders.filter(({ id }) => {
                return getters.focusedFolderIds.includes(id);
            });

            commit('addFolders', {
                parent: folderId,
                folders: movedFolders
            });

            commit('removeFolders', {
                parent: getters.activeFolderId,
                folders: movedFolders
            });
        }

        commit('clearFocusedFolderIds');
    },

    removeFocusedFolders({ commit, getters }) {
        // todo remove media in removed folders
        let removedFolders = getters.currentFolders.filter(({ id }) => {
            return getters.focusedFolderIds.includes(id);
        });

        commit('removeFolders', {
            parent: getters.activeFolderId,
            folders: removedFolders
        });

        commit('clearFocusedFolderIds');
    },

    deleteFocusedItems({ commit, dispatch, getters }) {
        let focusedMediaIds = getters.focusedMediaIds; // todo rename to Ids
        let focusedFolderIds = getters.focusedFolderIds; // todo rename to Ids

        dispatch('removeFocusedMedia');
        dispatch('removeFocusedFolders');

        commit('removeActiveMedia', focusedMediaIds);

        if (focusedMediaIds.length) {
            Vue.mediaManager.bus.$emit('media-deleted', focusedMediaIds);

            focusedMediaIds.forEach(mediaId => {
                commit('removeSelectedMediaItem', mediaId);
                axios.delete('/api/media/' + mediaId);
            });
        }

        if (focusedFolderIds.length) {
            // todo remove all media in deleted folders
            focusedFolderIds.forEach(folderId => {
                axios.delete('/api/media-folders/' + folderId);
            });
        }
    },

    reset({ commit }) {
        commit('clearSelectedMedia');
        commit('clearFocusedMediaIds');
        commit('clearFocusedFolderIds');
        commit('resetOpenFolders');
    }
};

const mutations = {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setMedia(state, { folder, media }) {
        Vue.set(state.media, folder, media);
    },

    setSelectedMedia(state, media) {
        state.selectedMedia = media;
    },

    addSelectedMedia(state, media) {
        state.selectedMedia = state.selectedMedia.concat(media);
    },

    removeSelectedMediaItem(state, mediaId) {
        state.selectedMedia = state.selectedMedia.filter(({ id }) => id !== mediaId);
    },

    clearSelectedMedia(state) {
        state.selectedMedia = [];
    },

    addMedia(state, { folder, media }) {
        if (state.media.hasOwnProperty(folder)) {
            state.media[folder] = state.media[folder].concat(media);
        }
    },

    updateMediaItem(state, { folder, id, properties }) {
        if (state.media.hasOwnProperty(folder)) {
            state.media[folder].map(media => {
                if (media.id === id) {
                    Object.entries(properties).forEach(([key, value]) => {
                        media[key] = value;
                    });
                }
            });
        }
    },

    addMediaItem(state, { folder, media }) {
        if (state.media.hasOwnProperty(folder)) {
            state.media[folder].push(media);
        }
    },

    removeMedia(state, { folder, media }) {
        if (state.media.hasOwnProperty(folder)) {
            let mediaIds = media.map(({ id }) => id);

            state.media[folder] = state.media[folder].filter(({ id }) => {
                return ! mediaIds.includes(id);
            });
        }
    },

    focusMedia(state, mediaId) {
        if (! state.focusedMediaIds.includes(mediaId)) {
            state.focusedMediaIds.push(mediaId);
        } else {
            state.focusedMediaIds = state.focusedMediaIds.filter(id => id !== mediaId);
        }
    },

    clearFocusedMediaIds(state) {
        state.focusedMediaIds = [];
    },

    setActiveMedia(state, media) {
        state.activeMedia = media;
    },

    addActiveMedia(state, media) {
        let activeIds = state.activeMedia.map(media => media.id);
        
        let add = media.filter(media => {
            return ! activeIds.includes(media.id);
        });
        
        if (add.length) {
            state.activeMedia = state.activeMedia.concat(add);
        }
    },

    updateActiveMedia(state, { id, properties }) {
        state.activeMedia.map(file => {
            if (file.id === id) {
                Object.entries(properties).forEach(([key, value]) => {
                    file[key] = value;
                });
            }
        });
    },

    removeActiveMedia(state, mediaIds) {
        state.activeMedia = state.activeMedia.filter(({ id }) => ! mediaIds.includes(id));
    },

    clearActiveMedia(state) {
        state.activeMedia = [];
    },

    setFolders(state, { parent, folders }) {
        Vue.set(state.folders, parent, folders);
    },

    addFolders(state, { parent, folders }) {
        if (state.folders.hasOwnProperty(parent)) {
            state.folders[parent] = state.folders[parent].concat(folders);
        }
    },

    addFolder(state, { parent, folder }) {
        if (state.folders.hasOwnProperty(parent)) {
            state.folders[parent].push(folder);
        }
    },

    updateFolder(state, { parent, id, properties }) {
        if (state.folders.hasOwnProperty(parent)) {
            state.folders[parent].map(folder => {
                if (folder.id === id) {
                    Object.entries(properties).forEach(([key, value]) => {
                        folder[key] = value;
                    });
                }
            });
        }
    },

    removeFolders(state, { parent, folders }) {
        if (state.folders.hasOwnProperty(parent)) {
            let folderIds = folders.map(({ id }) => id);

            state.folders[parent] = state.folders[parent].filter(({ id }) => {
                return ! folderIds.includes(id);
            });
        }
    },

    focusFolder(state, folderId) {
        if (! state.focusedFolderIds.includes(folderId)) {
            state.focusedFolderIds.push(folderId);
        } else {
            state.focusedFolderIds = state.focusedFolderIds.filter(id => id !== folderId);
        }
    },

    clearFocusedFolderIds(state) {
        state.focusedFolderIds = [];
    },

    resetOpenFolders(state) {
        state.openFolders = defaultOpenFolders();
    },

    openFolder(state, folder) {
        let openFolderIds = state.openFolders.map(folder => folder.id);

        if (openFolderIds.includes(folder.id)) {
            state.openFolders.splice(openFolderIds.findIndex(id => id === folder.id) + 1);
        } else {
            state.openFolders.push(folder);
        }
    },




    setMoveFolders(state, folders) { // todo rename
        state.move.folders = folders;
    },

    addMoveOpenFolder(state, id) { // todo rename
        if (state.move.openFolders.includes(id)) {
            let index = state.move.openFolders.findIndex(openId => openId === id);

            if (index !== -1) {
                state.move.openFolders.splice(index);
            }
        } else {
            state.move.openFolders.push(id);
        }
    },

    clearMoveOpenFolders(state) { // todo rename
        state.move.openFolders = [];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
