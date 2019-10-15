import { groupBy, mapValues, sortBy, unionBy } from 'lodash';
import { actions as apiActions } from '../index';

const state = {
    isLoading: false,
    cachedFolderIds: [],

    list: [],

    isFocusingMultiple: false,
    focusedIds: [],
    selectedIds: [],
};

const getters = {
    isLoading: state => state.isLoading,

    cachedFolderIds: state => state.cachedFolderIds,

    list: state => state.list,

    findIndex: state => mediaId => {
        return state.list.findIndex(({ id }) => {
            return mediaId === id;
        });
    },

    grouped: state => {
        return mapValues(
            groupBy(state.list, ({ folder_id }) => folder_id),
            group => sortBy(group, 'name', 'asc')
        );
    },

    current: (state, getters, rootState, rootGetters) => {
        const currentFolder = rootGetters['mediaManagerFolders/currentFolder'];

        if (currentFolder && getters.grouped.hasOwnProperty(currentFolder.id)) {
            return getters.grouped[currentFolder.id];
        }

        return [];
    },

    item: state => mediaId => {
        return state.list.find(({ id }) => id === mediaId);
    },

    isFocusingMultiple: state => state.isFocusingMultiple,

    focusedIds: state => state.focusedIds,

    selectedIds: state => state.selectedIds,
};

const mutations = {
    set(state, list) {
        state.list = unionBy([
            ...state.list,
            ...list,
        ], 'id');
    },

    startLoading(state) {
        state.isLoading = true;
    },

    stopLoading(state) {
        state.isLoading = false;
    },

    addCachedFolderId(state, folderId) {
        state.cachedFolderIds.push(folderId);
    },

    add(state, media) {
        state.list.push(media);
    },

    update(state, { index, media }) {
        state.list.splice(index, 1, {
            ...state.list[index],
            ...media,
        });
    },

    removeInFolders(state, folderIds) {
        state.list = state.list.filter(({ folder_id }) => {
            return ! folderIds.includes(folder_id);
        });
    },

    remove(state, mediaIds) {
        state.list = state.list.filter(({ id }) => {
            return ! mediaIds.includes(id);
        });
    },

    enableMultipleFocus(state) {
        state.isFocusingMultiple = true;
    },

    disableMultipleFocus(state) {
        state.isFocusingMultiple = false;
    },

    focusId(state, mediaId) {
        state.focusedIds.push(mediaId);
    },

    blurId(state, mediaId) {
        state.focusedIds = state.focusedIds.filter(id => {
            return id !== mediaId;
        });
    },

    clearFocusedIds(state) {
        state.focusedIds = [];
    },

    setSelectedIds(state, mediaIds) {
        state.selectedIds = mediaIds;
    },

    selectId(state, mediaId) {
        state.selectedIds.push(mediaId);
    },

    unselectId(state, mediaId) {
        state.selectedIds = state.selectedIds.filter(id => {
            return id !== mediaId;
        });
    },

    unselectIds(state, mediaIds) {
        state.selectedIds = state.selectedIds.filter(id => {
            return ! mediaIds.includes(id);
        });
    },
};

const actions = {
    fetch({ commit, getters }, folderId) {
        if (! getters.isLoading && ! getters.cachedFolderIds.includes(folderId)) {
            commit('startLoading');

            apiActions.getMedia({
                folder: folderId || 'root',
            }).then(media => {
                commit('set', media);
                commit('addCachedFolderId', folderId);

                commit('stopLoading');
            });
        }
    },

    set({ commit }, media) {
        commit('set', media);
    },

    add({ commit }, media) {
        commit('add', media);
    },

    update({ commit, getters }, { id, media }) {
        let index = getters.findIndex(id);

        if (index !== -1) {
            commit('update', { index, media });
        }
    },

    moveMediaItemsTo({ commit, getters }, { folderId, mediaIds }) {
        if (getters.cachedFolderIds.includes(folderId)) {
            return mediaIds.forEach(mediaId => {
                let index = getters.findIndex(mediaId);

                if (index !== -1) {
                    commit('update', {
                        index,
                        media: { folder_id: folderId },
                    });
                }
            });
        }

        commit('remove', mediaIds);
    },

    removeInFolders({ commit }, folderIds) {
        commit('removeInFolders', folderIds);
    },

    remove({ commit }, mediaIds) {
        commit('remove', mediaIds);
    },

    enableMultipleFocus({ commit }) {
        commit('enableMultipleFocus');
    },

    disableMultipleFocus({ commit }) {
        commit('disableMultipleFocus');
    },

    focusId({ commit, getters }, mediaId) {
        if (! getters.isFocusingMultiple) {
            commit('clearFocusedIds');
        }

        commit('focusId', mediaId);
    },

    blurId({ commit }, mediaId) {
        commit('blurId', mediaId);
    },

    clearFocusedIds({ commit }) {
        commit('clearFocusedIds');
    },

    setSelectedIds({ commit }, mediaIds) {
        commit('setSelectedIds', mediaIds);
    },

    selectId({ commit }, mediaId) {
        commit('selectId', mediaId);
    },

    unselectId({ commit }, mediaId) {
        commit('unselectId', mediaId);
    },

    unselectIds({ commit }, mediaIds) {
        commit('unselectIds', mediaIds);
    },

    clearSelectedIds({ commit }) {
        commit('setSelectedIds', []);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
