import { groupBy, mapValues, sortBy } from 'lodash';
import { actions as apiActions } from '../index';
import { rootFolder } from '../config/folders';

const state = {
    isLoading: true,
    isVisible: false,

    list: [],
    open: [ rootFolder() ],

    managedFolder: null,
    modalIsVisible: false,
};

const getters = {
    isVisible: state => state.isVisible,

    isLoading: state => state.isLoading,

    findIndex: state => folderId => {
        return state.list.findIndex(({ id }) => {
            return folderId === id;
        });
    },

    list: state => state.list,

    grouped: state => {
        return mapValues(
            groupBy(state.list, ({ parent_id }) => parent_id),
            group => sortBy(group, 'name', 'asc')
        );
    },

    folder: state => folderId => {
        return state.list.find(({ id }) => id === folderId);
    },

    open: state => state.open,

    currentFolder: state => {
        return state.open[state.open.length - 1];
    },

    parentFolder: state => {
        if (state.open.length > 1) {
            return state.open[state.open.length - 2];
        }

        return null;
    },

    currentList: (state, getters) => {
        return getters.grouped.hasOwnProperty(getters.currentFolder.id)
            ? getters.grouped[getters.currentFolder.id]
            : [];
    },

    managedFolder: state => state.managedFolder,

    modalIsVisible: state => state.modalIsVisible,

    ancestorIds: (state, getters) => folderId => {
        let ancestorIds = [];
        const children = state.list.filter(({ parent_id }) => {
            return parent_id === folderId;
        });

        if (children.length) {
            children.forEach(child => {
                ancestorIds = [
                    child.id,
                    ...ancestorIds,
                    ...getters.ancestorIds(child.id),
                ];
            });
        }

        return ancestorIds;
    },
};

const mutations = {
    set(state, list) {
        state.list = list;
    },

    show(state) {
        state.isVisible = true;
    },

    hide(state) {
        state.isVisible = false;
    },

    stopLoading(state) {
        state.isLoading = false;
    },

    addFolder(state, folder) {
        state.list.push(folder);
    },

    updateFolder(state, { index, folder }) {
        state.list.splice(index, 1, {
            ...state.list[index],
            ...folder,
        });
    },

    openFolder(state, folder) {
        let openIds = state.open.map(folder => folder.id);

        if (openIds.includes(folder.id)) {
            state.open.splice(openIds.findIndex(id => id === folder.id) + 1);
        } else {
            state.open.push(folder);
        }
    },

    removeFolders(state, folderIds) {
        state.list = state.list.filter(({ id }) => {
            return ! folderIds.includes(id);
        });
    },

    setManagedFolder(state, folder) {
        state.managedFolder = folder;
    },

    showModal(state) {
        state.modalIsVisible = true;
    },

    hideModal(state) {
        state.modalIsVisible = false;
    },
};

const actions = {
    show({ commit }) {
        commit('show');
    },

    hide({ commit }) {
        commit('hide');
    },

    fetch({ commit, getters }) {
        if (getters.isLoading) {
            apiActions.getFolders().then(folders => {
                commit('set', folders);

                commit('stopLoading');
            });
        }
    },

    addFolder({ commit }, folder) {
        commit('addFolder', folder);
    },

    updateFolder({ commit, getters }, { id, folder }) {
        let index = getters.findIndex(id);

        if (index !== -1) {
            commit('updateFolder', { index, folder });
        }
    },

    openFolder({ commit, getters }, folderId) {
        const folder = getters.list.find(({ id }) => id === folderId);

        commit('openFolder', folder || rootFolder());
    },

    moveFoldersTo({ commit, getters }, { parentId, folderIds }) {
        folderIds.forEach(folderId => {
            let index = getters.findIndex(folderId);

            if (index !== -1) {
                commit('updateFolder', {
                    index,
                    folder: { parent_id: parentId },
                });
            }
        });
    },

    removeFolders({ commit }, folderIds) {
        commit('removeFolders', folderIds);
    },

    setManagedFolder({ commit }, folder) {
        commit('setManagedFolder', folder);
    },

    clearManagedFolder({ commit }) {
        commit('setManagedFolder', null);
    },

    showModal({ commit }) {
        commit('showModal');
    },

    hideModal({ commit }) {
        commit('hideModal');
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
