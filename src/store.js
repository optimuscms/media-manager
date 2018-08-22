const defaultOpenFolders = () => {
    return [{ id: null, name: 'Home' }];
}

const state = {
    media: {},
    focusedMedia: [],
    selectedMedia: [],

    folders: {},
    focusedFolders: [],
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
    allMedia: state => {
        return state.media;
    },

    currentMedia: (state, getters) => {
        return state.media.hasOwnProperty(getters.activeFolderId)
            ? state.media[getters.activeFolderId]
            : [];
    },

    focusedMedia: state => {
        return state.focusedMedia;
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

    focusedFolders: state => {
        return state.focusedFolders;
    },

    firstFocusedFolder: state => {
        return state.focusedFolders.length ? state.focusedFolders[0] : null;
    },

    openFolders: state => {
        return state.openFolders;
    },

    activeMedia: state => mediaIds => { // todo rename active
        return state.activeMedia.filter(media => mediaIds.includes(media.id));
    },




    
    



    getActiveMedia: state => mediaIds => { // todo delete
        return state.activeMedia.filter(media => mediaIds.includes(media.id));
    },

    getMoveFolders: state => {
        return state.move.folders;
    },

    getMoveOpenFolders: state => {
        return state.move.openFolders;
    },

    getIcon: state => extension => {
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
    reset({ commit }) {
        commit('clearSelectedMedia');
        commit('clearFocusedMedia');
        commit('clearFocusedFolders');
        commit('resetOpenFolders');
    },

    setSelectedMedia({ commit, getters }, mediaIds) {
        commit('setSelectedMedia', (Array.isArray(mediaIds) && mediaIds.length)
            ? getters.activeMedia(mediaIds)
            : []);
    },

    selectMedia({ commit, getters }) {
        let newlySelectedMedia = getters.focusedMedia.filter(id => {
            return ! getters.selectedMediaIds.includes(id);
        });

        if (newlySelectedMedia.length) {
            commit('addSelectedMedia', getters.currentMedia.filter(({ id }) => {
                return newlySelectedMedia.includes(id);
            }));
        }

        commit('clearFocusedMedia');
    },

    moveFocusedMediaTo({ commit, getters }, folderId) {
        if (folderId !== getters.activeFolderId) {
            let movedMedia = getters.currentMedia.filter(({ id }) => {
                return getters.focusedMedia.includes(id);
            });

            commit('addMedia', {
                parent: folderId,
                media: movedMedia
            });

            commit('removeMedia', {
                parent: getters.activeFolderId,
                media: movedMedia
            });
        }

        commit('clearFocusedMedia');
    },

    removeFocusedMedia({ commit, getters }) {
        let removedMedia = getters.currentMedia.filter(({ id }) => {
            return getters.focusedMedia.includes(id);
        });

        commit('removeMedia', {
            parent: getters.activeFolderId,
            folders: removedMedia
        });

        commit('clearFocusedFolders');
    },

    moveFocusedFoldersTo({ commit, getters }, folderId) {
        if (folderId !== getters.activeFolderId) {
            let movedFolders = getters.currentFolders.filter(({ id }) => {
                return getters.focusedFolders.includes(id);
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

        commit('clearFocusedFolders');
    },

    removeFocusedFolders({ commit, getters }) {
        // todo remove media in removed folders
        let removedFolders = getters.currentFolders.filter(({ id }) => {
            return getters.focusedFolders.includes(id);
        });

        commit('removeFolders', {
            parent: getters.activeFolderId,
            folders: removedFolders
        });

        commit('clearFocusedFolders');
    }
};

const mutations = {
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
        if (! state.focusedMedia.includes(mediaId)) {
            state.focusedMedia.push(mediaId);
        } else {
            state.focusedMedia = state.focusedMedia.filter(id => id !== mediaId);
        }
    },

    clearFocusedMedia(state) {
        state.focusedMedia = [];
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
        if (! state.focusedFolders.includes(folderId)) {
            state.focusedFolders.push(folderId);
        } else {
            state.focusedFolders = state.focusedFolders.filter(id => id !== folderId);
        }
    },

    clearFocusedFolders(state) {
        state.focusedFolders = [];
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

    setMoveFolders(state, folders) {
        state.move.folders = folders;
    },

    addMoveOpenFolder(state, id) {
        if (state.move.openFolders.includes(id)) {
            let index = state.move.openFolders.findIndex(openId => openId === id);

            if (index !== -1) {
                state.move.openFolders.splice(index);
            }
        } else {
            state.move.openFolders.push(id);
        }
    },

    clearMoveOpenFolders(state) {
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
