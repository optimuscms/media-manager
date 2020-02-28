import { groupBy, mapValues, sortBy } from 'lodash';
import { actions as apiActions } from '../index';
import { rootFolder } from '../config/folders';

const state = {
    isLoading: true,
    showPanel: false,

    list: [],
    open: [ rootFolder() ],

    managedFolder: null,
    showManageModal: false,

    cachedFolderIds: [],
};

const getters = {
    showFoldersPanel: state => state.showPanel,

    isLoadingFolders: state => state.isLoading,

    findFolderIndex: state => folderId => {
        return state.list.findIndex(({ id }) => {
            return folderId === id;
        });
    },

    listFolders: state => state.list,

    groupedFolders: state => {
        return mapValues(
            groupBy(state.list, ({ parent_id }) => parent_id),
            group => sortBy(group, [ ({ name }) => name.toLowerCase() ], 'asc'),
        );
    },

    getFolder: state => folderId => {
        return state.list.find(({ id }) => id === folderId);
    },

    openFolders: state => state.open,

    currentFolder: state => {
        return state.open[state.open.length - 1];
    },

    parentFolder: state => {
        if (state.open.length > 1) {
            return state.open[state.open.length - 2];
        }

        return null;
    },

    childFolders: (state, getters) => {
        if (getters.groupedFolders.hasOwnProperty(getters.currentFolder.id)) {
            return getters.groupedFolders[getters.currentFolder.id];
        }

        return [];
    },

    folderBeingManaged: state => state.managedFolder,

    showManageFolderModal: state => state.showManageModal,

    getAncestorIds: (state, getters) => folderId => {
        let ancestorIds = [];
        const children = state.list.filter(({ parent_id }) => {
            return parent_id === folderId;
        });

        if (children.length) {
            children.forEach(child => {
                ancestorIds = [
                    child.id,
                    ...ancestorIds,
                    ...getters.getAncestorIds(child.id),
                ];
            });
        }

        return ancestorIds;
    },

    cachedFolderIds: state => state.cachedFolderIds,
};

const mutations = {
    setFolders(state, list) {
        state.list = list;
    },

    showFoldersPanel(state) {
        state.showPanel = true;
    },

    hideFoldersPanel(state) {
        state.showPanel = false;
    },

    stopLoadingFolders(state) {
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

    setFolderBeingManaged(state, folder) {
        state.managedFolder = folder;
    },

    showManageFolderModal(state) {
        state.showManageModal = true;
    },

    hideManageFolderModal(state) {
        state.showManageModal = false;
    },

    addCachedFolderId(state, folderId) {
        state.cachedFolderIds.push(folderId);
    },
};

const actions = {
    showFoldersPanel({ commit }) {
        commit('showFoldersPanel');
    },

    hideFoldersPanel({ commit }) {
        commit('hideFoldersPanel');
    },

    fetchFolders({ commit, getters }) {
        if (getters.isLoadingFolders) {
            apiActions.getFolders().then(folders => {
                commit('setFolders', folders);

                commit('stopLoadingFolders');
            });
        }
    },

    addFolder({ commit }, folder) {
        commit('addFolder', folder);
    },

    updateFolder({ commit, getters }, { id, folder }) {
        let index = getters.findFolderIndex(id);

        if (index !== -1) {
            commit('updateFolder', { index, folder });
        }
    },

    openFolder({ commit, getters }, folderId) {
        const folder = getters.listFolders.find(({ id }) => {
            return id === folderId;
        });

        commit('openFolder', folder || rootFolder());
    },

    moveFoldersTo({ commit, getters }, { parentId, folderIds }) {
        folderIds.forEach(folderId => {
            let index = getters.findFolderIndex(folderId);

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

    setFolderBeingManaged({ commit }, folder) {
        commit('setFolderBeingManaged', folder);
    },

    clearFolderBeingManaged({ commit }) {
        commit('setFolderBeingManaged', null);
    },

    showManageFolderModal({ commit }) {
        commit('showManageFolderModal');
    },

    hideManageFolderModal({ commit }) {
        commit('hideManageFolderModal');
    },

    addCachedFolderId({ commit }, folderId) {
        commit('addCachedFolderId', folderId);
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
