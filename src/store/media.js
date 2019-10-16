import { groupBy, mapValues, sortBy, unionBy } from 'lodash';
import { actions as apiActions } from '../index';

const state = {
    isLoading: false,

    list: [],

    isFocusingMultiple: false,
    focusedIds: [],

    selectedIds: [],
};

const getters = {
    isLoadingMedia: state => state.isLoading,

    listMedia: state => state.list,

    findMediaIndex: state => mediaId => {
        return state.list.findIndex(({ id }) => {
            return mediaId === id;
        });
    },

    groupedMedia: state => {
        return mapValues(
            groupBy(state.list, ({ folder_id }) => folder_id),
            group => sortBy(group, 'name', 'asc')
        );
    },

    currentMedia: (state, getters, rootState, rootGetters) => {
        const currentFolder = rootGetters['mediaManagerFolders/currentFolder'];

        if (currentFolder && getters.groupedMedia.hasOwnProperty(currentFolder.id)) {
            return getters.groupedMedia[currentFolder.id];
        }

        return [];
    },

    getMediaItem: state => mediaId => {
        return state.list.find(({ id }) => id === mediaId);
    },

    isFocusingMultipleMedia: state => state.isFocusingMultiple,

    focusedMediaIds: state => state.focusedIds,

    selectedMediaIds: state => state.selectedIds,
};

const mutations = {
    setMedia(state, list) {
        state.list = unionBy([
            ...state.list,
            ...list,
        ], 'id');
    },

    startLoadingMedia(state) {
        state.isLoading = true;
    },

    stopLoadingMedia(state) {
        state.isLoading = false;
    },

    addMediaItem(state, media) {
        state.list.push(media);
    },

    updateMediaItem(state, { index, media }) {
        state.list.splice(index, 1, {
            ...state.list[index],
            ...media,
        });
    },

    removeMediaInFolders(state, folderIds) {
        state.list = state.list.filter(({ folder_id }) => {
            return ! folderIds.includes(folder_id);
        });
    },

    removeMedia(state, mediaIds) {
        state.list = state.list.filter(({ id }) => {
            return ! mediaIds.includes(id);
        });
    },

    enableMultipleMediaFocus(state) {
        state.isFocusingMultiple = true;
    },

    disableMultipleMediaFocus(state) {
        state.isFocusingMultiple = false;
    },

    focusMediaId(state, mediaId) {
        state.focusedIds.push(mediaId);
    },

    blurMediaId(state, mediaId) {
        state.focusedIds = state.focusedIds.filter(id => {
            return id !== mediaId;
        });
    },

    clearFocusedMediaIds(state) {
        state.focusedIds = [];
    },

    setSelectedMediaIds(state, mediaIds) {
        state.selectedIds = mediaIds;
    },

    selectMediaId(state, mediaId) {
        state.selectedIds.push(mediaId);
    },

    deselectMediaIds(state, mediaIds) {
        state.selectedIds = state.selectedIds.filter(id => {
            return ! mediaIds.includes(id);
        });
    },
};

const actions = {
    fetchMedia({ commit, getters, dispatch, rootGetters }, folderId) {
        const cachedFolderIds = rootGetters['mediaManagerFolders/cachedFolderIds'];

        if (! getters.isLoading && ! cachedFolderIds.includes(folderId)) {
            commit('startLoadingMedia');

            apiActions.getMedia({
                folder: folderId || 'root',
            }).then(media => {
                commit('setMedia', media);
                dispatch('mediaManagerFolders/addCachedFolderId', folderId, { root: true });

                commit('stopLoadingMedia');
            });
        }
    },

    setMedia({ commit }, media) {
        commit('setMedia', media);
    },

    addMediaItem({ commit }, media) {
        commit('addMediaItem', media);
    },

    updateMediaItem({ commit, getters }, { id, media }) {
        let index = getters.findMediaIndex(id);

        if (index !== -1) {
            commit('updateMediaItem', { index, media });
        }
    },

    moveMediaTo({ commit, getters, rootGetters }, { folderId, mediaIds }) {
        const cachedFolderIds = rootGetters['mediaManagerFolders/cachedFolderIds'];

        if (cachedFolderIds.includes(folderId)) {
            return mediaIds.forEach(mediaId => {
                let index = getters.findMediaIndex(mediaId);

                if (index !== -1) {
                    commit('updateMediaItem', {
                        index,
                        media: { folder_id: folderId },
                    });
                }
            });
        }

        commit('removeMedia', mediaIds);
    },

    removeMediaInFolders({ commit }, folderIds) {
        commit('removeMediaInFolders', folderIds);
    },

    removeMedia({ commit }, mediaIds) {
        commit('removeMedia', mediaIds);
    },

    enableMultipleMediaFocus({ commit }) {
        commit('enableMultipleMediaFocus');
    },

    disableMultipleMediaFocus({ commit }) {
        commit('disableMultipleMediaFocus');
    },

    focusMediaId({ commit, getters }, mediaId) {
        if (! getters.isFocusingMultipleMedia) {
            commit('clearFocusedMediaIds');
        }

        commit('focusMediaId', mediaId);
    },

    blurMediaId({ commit }, mediaId) {
        commit('blurMediaId', mediaId);
    },

    clearFocusedMediaIds({ commit }) {
        commit('clearFocusedMediaIds');
    },

    setSelectedMediaIds({ commit }, mediaIds) {
        commit('setSelectedMediaIds', mediaIds);
    },

    selectMediaId({ commit }, mediaId) {
        commit('selectMediaId', mediaId);
    },

    deselectMediaId({ commit }, mediaId) {
        commit('deselectMediaIds', [ mediaId ]);
    },

    deselectMediaIds({ commit }, mediaIds) {
        commit('deselectMediaIds', mediaIds);
    },

    clearSelectedMediaIds({ commit }) {
        commit('setSelectedMediaIds', []);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
