const defaultOpenFolders = () => {
    return [{ id: null, name: 'Home' }];
};

const state = {
    isOpen: false,
    isLoading: true,

    limit: 0,
    pickerId: null,
    acceptedExtensions: [],

    media: {},
    selectedMedia: {},
    focusedMediaIds: [],

    folders: {},
    focusedFolderIds: [],
    openFolders: defaultOpenFolders(),

    move: {
        folders: [],
        openFolders: []
    },

    mediaEditorIsOpen: false,
    mediaEditorItem: null,

    folderManagerIsOpen: false,
    folderManagerItem: false,

    mediaMoverIsOpen: false,
    confirmationIsOpen: false,

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
    isOpen: state => {
        return state.isOpen;
    },

    isLoading: state => {
        return state.isLoading;
    },

    limit: state => {
        return state.limit;
    },

    pickerId: state => {
        return state.pickerId;
    },

    acceptedExtensions: state => {
        return state.acceptedExtensions;
    },

    allMedia: state => {
        return state.media;
    },

    currentMedia: (state, getters) => {
        let currentMedia = state.media.hasOwnProperty(getters.activeFolderId)
            ? state.media[getters.activeFolderId]
            : [];

        return currentMedia;
    },

    selectableMediaIds(state, getters) {
        if (state.acceptedExtensions.length) {
            return getters.currentMedia.filter(({ extension }) => {
                return state.acceptedExtensions.includes(extension);
            }).map(({ id }) => id);
        }

        return getters.currentMedia.map(({ id }) => id);
    },

    focusedMediaIds: state => {
        return state.focusedMediaIds;
    },

    selectedMedia: state => pickerId => {
        pickerId || state.pickerId;

        return pickerId && state.selectedMedia.hasOwnProperty(pickerId)
            ? state.selectedMedia[pickerId]
            : [];
    },

    selectedMediaIds: (state, getters) => {
        let selectedMedia = getters.selectedMedia(state.pickerId);
        
        return selectedMedia && selectedMedia.length
            ? selectedMedia.map(({ id }) => id)
            : [];
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

    openFolders: state => {
        return state.openFolders;
    },


    // getMoveFolders: state => { // todo rename
    //     return state.move.folders;
    // },

    // getMoveOpenFolders: state => { // todo rename
    //     return state.move.openFolders;
    // },


    mediaEditorIsOpen: state => {
        return state.mediaEditorIsOpen;
    },

    mediaEditorItem: state => {
        return state.mediaEditorItem;
    },

    folderManagerIsOpen: state => {
        return state.folderManagerIsOpen;
    },

    folderManagerItem: state => {
        return state.folderManagerItem;
    },

    mediaMoverIsOpen: state => {
        return state.mediaMoverIsOpen;
    },

    confirmationIsOpen: state => {
        return state.confirmationIsOpen;
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
    }
};

const mutations = {
    open(state) {
        state.isOpen = true;
    },

    close(state) {
        state.isOpen = false;
    },

    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setLimit(state, limit) {
        state.limit = limit;
    },

    setPickerId(state, pickerId) {
        state.pickerId = pickerId;
    },

    setAcceptedExtensions(state, extensions) {
        state.acceptedExtensions = extensions;
    },

    setMedia(state, { folder, media }) {        
        Vue.set(state.media, folder, media);
    },

    setPickerMedia(state, { pickerId, media }) {
        Vue.set(state.selectedMedia, pickerId, media);
    },

    addPickerMedia(state, media) {
        state.selectedMedia[state.pickerId] = state.selectedMedia[state.pickerId].concat(media);
    },

    removePickerMediaItem(state, { pickerId, id }) {
        state.selectedMedia[pickerId] = state.selectedMedia[pickerId].filter(media => {
            return media.id !== id;
        });
    },

    clearPickerMedia(state, pickerId) {
        pickerId || state.pickerId;

        if (state.selectedMedia.hasOwnProperty(pickerId)) {
            delete state.selectedMedia[pickerId];
        }
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

    updateSelectedMediaItem(state, { id, properties }) {
        Object.keys(state.selectedMedia).forEach(pickerId => {
            state.selectedMedia[pickerId].map(media => {
                if (media.id === id) {
                    Object.entries(properties).forEach(([key, value]) => {
                        media[key] = value;
                    });
                }
            });
        });
    },

    removeSelectedMedia(state, mediaIds) {
        Object.keys(state.selectedMedia).forEach(pickerId => {
            state.selectedMedia[pickerId] = state.selectedMedia[pickerId].filter(({ id }) => {
                return ! mediaIds.includes(id);
            })
        });
    },

    addMediaItem(state, { folder, media }) {
        if (state.media.hasOwnProperty(folder)) {
            state.media[folder].push(media);
        }
    },

    removeMedia(state, { folderId, mediaIds }) {
        if (state.media.hasOwnProperty(folderId)) {
            state.media[folderId] = state.media[folderId].filter(({ id }) => {
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

    removeFolders(state, { parentId, folderIds }) {
        if (state.folders.hasOwnProperty(parentId)) {

            state.folders[parentId] = state.folders[parentId].filter(({ id }) => {
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

    openMediaEditor(state) {
        state.mediaEditorIsOpen = true;
    },

    setMediaEditorItem(state, item) {
        state.mediaEditorItem = item;
    },

    closeMediaEditor(state) {
        state.mediaEditorIsOpen = false;
    },

    openFolderManager(state) {
        state.folderManagerIsOpen = true;
    },

    setFolderManagerItem(state, item) {
        state.folderManagerItem = item;
    },

    closeFolderManager(state) {
        state.folderManagerIsOpen = false;
    },

    openMediaMover(state) {
        state.mediaMoverIsOpen = true;
    },

    closeMediaMover(state) {
        state.mediaMoverIsOpen = false;
    },

    // setMoveFolders(state, folders) { // todo rename
    //     state.move.folders = folders;
    // },

    // addMoveOpenFolder(state, id) { // todo rename
    //     if (state.move.openFolders.includes(id)) {
    //         let index = state.move.openFolders.findIndex(openId => openId === id);

    //         if (index !== -1) {
    //             state.move.openFolders.splice(index);
    //         }
    //     } else {
    //         state.move.openFolders.push(id);
    //     }
    // },

    // clearMoveOpenFolders(state) { // todo rename
    //     state.move.openFolders = [];
    // },

    openConfirmation(state) {
        state.confirmationIsOpen = true;
    },

    closeConfirmation(state) {
        state.confirmationIsOpen = false;
    }
};

const actions = {
    open({ commit, dispatch }, { pickerId, limit, acceptedExtensions } = {}) {
        commit('setPickerId', pickerId !== undefined ? pickerId : null);
        commit('setLimit', limit !== undefined ? limit : 0);

        commit('setAcceptedExtensions', Array.isArray(acceptedExtensions)
            ? acceptedExtensions
            : []
        );

        commit('open');
        dispatch('getMediaAndFolders');
    },

    setPickerMedia({ commit }, { pickerId, media }) {
        commit('setPickerMedia', { pickerId, media });
    },

    removePickerMediaItem({ commit }, { pickerId, id }) {
        commit('removePickerMediaItem', { pickerId, id });
    },

    clearPickerMedia({ commit }, pickerId) {
        commit('clearPickerMedia', pickerId);
    },

    getMediaAndFolders({ commit, getters }) {
        let requests = [];

        if (! getters.allMedia.hasOwnProperty(getters.activeFolderId)) {
            requests.push(axios.get('/admin/media', {
                params: { folder: getters.activeFolderId || 'root' }
            }));
        }

        if (! getters.allFolders.hasOwnProperty(getters.activeFolderId)) {
            requests.push(axios.get('/admin/media-folders', {
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

    selectMedia({ commit, getters }) {
        let newlySelectedMedia = getters.focusedMediaIds.filter(id => {
            return ! getters.selectedMediaIds.includes(id)
                && getters.selectableMediaIds.includes(id)
        });

        if (newlySelectedMedia.length) {
            let media = getters.currentMedia.filter(({ id }) => {
                return newlySelectedMedia.includes(id);
            });

            commit('addPickerMedia', media);
        }

        commit('clearFocusedMediaIds');
    },

    openMediaEditor({ commit }, item) {
        commit('setMediaEditorItem', item);
        commit('openMediaEditor');
    },

    openFolderManager({ commit }, item = null) {
        commit('setFolderManagerItem', item);
        commit('openFolderManager');
    },

    // moveFocusedMediaTo({ commit, getters }, folderId) {
    //     if (folderId !== getters.activeFolderId) {
    //         let movedMedia = getters.currentMedia.filter(({ id }) => {
    //             return getters.focusedMediaIds.includes(id);
    //         });

    //         commit('addMedia', {
    //             folder: folderId,
    //             media: movedMedia
    //         });

    //         commit('removeMedia', {
    //             folderId: getters.activeFolderId,
    //             mediaIds: getters.focusedMediaIds
    //         });
    //     }

    //     commit('clearFocusedMediaIds');
    // },

    removeFocusedMedia({ commit, getters }) {
        commit('removeMedia', {
            folderId: getters.activeFolderId,
            mediaIds: getters.focusedMediaIds
        });

        commit('removeSelectedMedia', getters.focusedMediaIds);
        commit('clearFocusedMediaIds');
    },

    // moveFocusedFoldersTo({ commit, getters }, folderId) {
    //     if (folderId !== getters.activeFolderId) {
    //         let movedFolders = getters.currentFolders.filter(({ id }) => {
    //             return getters.focusedFolderIds.includes(id);
    //         });

    //         commit('addFolders', {
    //             parent: folderId,
    //             folders: movedFolders
    //         });

    //         commit('removeFolders', {
    //             parentId: getters.activeFolderId,
    //             folderIds: getters.focusedFolderIds
    //         });
    //     }

    //     commit('clearFocusedFolderIds');
    // },

    removeFocusedFolders({ commit, getters }) {
        // todo remove media in removed folders
        // commit a mutation, removeMediaFromFolders
        // delete state.media[folderId]

        // remove media from selectedMedia
        // commit a mutation, removeMediaFromSelectedMedia
        commit('removeFolders', {
            parentId: getters.activeFolderId,
            folderIds: getters.focusedFolderIds
        });

        commit('clearFocusedFolderIds');
    },

    deleteFocusedItems({ commit, dispatch, getters }) {
        let focusedMediaIds = getters.focusedMediaIds;
        let focusedFolderIds = getters.focusedFolderIds;

        dispatch('removeFocusedMedia');
        dispatch('removeFocusedFolders');

        if (focusedMediaIds.length) {
            focusedMediaIds.forEach(mediaId => {
                axios.delete('/admin/media/' + mediaId);
            });
        }

        if (focusedFolderIds.length) {
            focusedFolderIds.forEach(folderId => {
                axios.delete('/admin/media-folders/' + folderId);
            });
        }
    },

    reset({ commit }) {
        commit('setPickerId', null);
        commit('clearFocusedMediaIds');
        commit('clearFocusedFolderIds');
        commit('resetOpenFolders');
    },

    close({ commit }) {
        commit('close');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
