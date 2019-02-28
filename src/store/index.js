import groupBy from 'lodash/groupBy';

const defaultOpenFolders = () => {
    return [{ id: null, name: 'Home' }];
};

const state = {
    isOpen: false,
    loadingMedia: true,
    loadingFolders: true,

    limit: 0,
    pickerId: null,
    acceptedExtensions: [],

    media: {},
    selectedMedia: {},
    focusedMediaIds: [],

    folders: [],
    focusedFolderIds: [],
    openFolders: defaultOpenFolders(),

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

    isLoadingFolders: state => {
        return state.loadingFolders;
    },

    isLoading: state => {
        return state.loadingMedia || state.loadingFolders;
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

    groupedFolders: state => {
        return groupBy(
            state.folders,
            folder => folder.parent_id
        );
    },

    currentFolders: (state, getters) => {
        return getters.groupedFolders.hasOwnProperty(getters.activeFolderId)
            ? getters.groupedFolders[getters.activeFolderId]
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

    startLoadingMedia(state) {
        state.loadingMedia = true;
    },

    stopLoadingMedia(state) {
        state.loadingMedia = false;
    },

    stopLoadingFolders(state) {
        state.loadingFolders = false;
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

    setMedia(state, { folderId, media }) {        
        Vue.set(state.media, folderId, media);
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

    addMedia(state, { folderId, media }) {
        if (state.media.hasOwnProperty(folderId)) {
            state.media[folderId] = state.media[folderId].concat(media);
        } else {
            Vue.set(state.media, folderId, media);
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

    setFolders(state, folders) {
        state.folders = folders;
    },

    addFolder(state, folder) {
        state.folders.push(folder);
    },

    updateFolder(state, { id, properties }) {
        state.folders.forEach(folder => {
            if (folder.id === id) {
                Object.entries(properties).forEach(([key, value]) => {
                    folder[key] = value;
                });
            }
        });
    },

    moveFoldersTo(state, { parentId, folderIds }) {
        state.folders.forEach(folder => {
            if (folderIds.includes(folder.id)) {
                folder.parent_id = parentId;
            }
        });
    },

    removeFolders(state, folderIds) {
        state.folders = state.folders.filter(({ id }) => {
            return ! folderIds.includes(id);
        });
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

        dispatch('fetchMedia');
        dispatch('fetchFolders');
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

    fetchMedia({ commit, getters }) {
        if (! getters.allMedia.hasOwnProperty(getters.activeFolderId)) {
            commit('startLoadingMedia');

            axios.get('/admin/media', {
                params: {
                    folder: getters.activeFolderId || 'root'
                }
            }).then(response => {
                commit('setMedia', {
                    folderId: getters.activeFolderId,
                    media: response.data.data
                });

                commit('stopLoadingMedia');
            });
        } else {
            commit('stopLoadingMedia');
        }
    },

    fetchFolders({ commit, getters }) {
        if (getters.isLoadingFolders) {
            axios.get('/admin/media-folders').then(response => {
                commit('setFolders', response.data.data);
                commit('stopLoadingFolders');
            });
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

    moveMediaTo({ commit, getters }, { folderId, mediaIds }) {
        if (folderId !== getters.activeFolderId) {
            let movedMedia = getters.currentMedia.filter(({ id }) => {
                return getters.focusedMediaIds.includes(id);
            });

            commit('addMedia', {
                folderId,
                media: movedMedia
            });

            commit('removeMedia', {
                folderId: getters.activeFolderId,
                mediaIds
            });
        }
    },

    moveFoldersTo({ commit }, { parentId, folderIds }) {
        commit('moveFoldersTo', { parentId, folderIds });
    },

    deleteFocusedItems({ commit, dispatch, getters }) {
        let focusedMediaIds = getters.focusedMediaIds;
        let focusedFolderIds = getters.focusedFolderIds;

        commit('removeMedia', {
            folderId: getters.activeFolderId,
            mediaIds: getters.focusedMediaIds
        });

        focusedFolderIds.forEach(folderId => {
            dispatch('removeSelectedMediaInFolder', folderId);
        });

        commit('removeSelectedMedia', getters.focusedMediaIds);
        commit('removeFolders', getters.focusedFolderIds);

        commit('clearFocusedMediaIds');
        commit('clearFocusedFolderIds');

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

    removeSelectedMediaInFolder({ commit, dispatch, getters }, folderId) {
        let folder = getters.allFolders.find(({ id }) => id === folderId);

        if (folder) {
            if (getters.allMedia.hasOwnProperty(folder.id)) {
                let mediaIds = getters.allMedia[folder.id].map(({ id }) => id);
                
                if (mediaIds.length) {
                    commit('removeSelectedMedia', mediaIds);
                }
            }
    
            if (getters.groupedFolders.hasOwnProperty(folder.id)) {
                getters.groupedFolders[folder.id].forEach(({ id }) => {
                    dispatch('removeSelectedMediaInFolder', id);
                });
            }
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
