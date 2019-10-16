import { imageExtensions } from '../index';

const state = {
    isOpen: false,

    limit: 0,
    acceptedExtensions: [],

    showActionsPanel: false,

    showMediaMover: false,
    mediaMoverType: '',
    mediaMoverSubject: null,

    showConfirmation: false,
    confirmationType: '',
    confirmationSubject: null,
};

const getters = {
    mediaManagerIsOpen: state => {
        return state.isOpen;
    },

    mediaSelectionLimit: state => {
        return state.limit;
    },

    pickerId: state => {
        return state.pickerId;
    },

    acceptedExtensions: state => {
        return state.acceptedExtensions;
    },

    showActionsPanel: state => state.showActionsPanel,

    mediaMoverType: state => state.mediaMoverType,

    mediaMoverSubject: state => state.mediaMoverSubject,

    showMediaMover: state => state.showMediaMover,

    confirmationType: state => state.confirmationType,

    confirmationSubject: state => state.confirmationSubject,

    showConfirmation: state => state.showConfirmation,
};

const mutations = {
    openMediaManager(state) {
        state.isOpen = true;
    },

    closeMediaManager(state) {
        state.isOpen = false;
    },

    setMediaSelectionLimit(state, limit) {
        state.limit = limit;
    },

    setAcceptedExtensions(state, extensions) {
        state.acceptedExtensions = extensions;
    },

    showActionsPanel(state) {
        state.showActionsPanel = true;
    },

    hideActionsPanel(state) {
        state.showActionsPanel = false;
    },

    setMediaMoverType(state, type) {
        state.mediaMoverType = type;
    },

    setMediaMoverSubject(state, subject) {
        state.mediaMoverSubject = subject;
    },

    showMediaMover(state) {
        state.showMediaMover = true;
    },

    hideMediaMover(state) {
        state.showMediaMover = false;
    },

    setConfirmationType(state, type) {
        state.confirmationType = type;
    },

    setConfirmationSubject(state, subject) {
        state.confirmationSubject = subject;
    },

    showConfirmation(state) {
        state.showConfirmation = true;
    },

    hideConfirmation(state) {
        state.showConfirmation = false;
    },
};

const actions = {
    openMediaManager({ commit, dispatch, rootGetters }, { pickerId, limit, acceptedExtensions } = {}) {
        commit('setMediaSelectionLimit', limit !== undefined ? limit : 0);
        commit('setAcceptedExtensions', formatAcceptedExtensions(acceptedExtensions));
        dispatch('mediaManagerPickers/setCurrentPickerId', pickerId, { root: true });

        dispatch('mediaManagerMedia/setSelectedMediaIds',
            rootGetters['mediaManagerPickers/getPickerMedia'](pickerId).map(({ id }) => {
                return id;
            }),
            { root: true },
        );

        dispatch('mediaManagerMedia/fetchMedia', null, { root: true });
        dispatch('mediaManagerFolders/fetchFolders', null, { root: true });

        commit('openMediaManager');
    },

    showActionsPanel({ commit }) {
        commit('showActionsPanel');
    },

    hideActionsPanel({ commit }) {
        commit('hideActionsPanel');
    },

    openMediaMover({ commit }, { type, subject }) {
        commit('setMediaMoverType', type);
        commit('setMediaMoverSubject', subject);
        commit('showMediaMover');
    },

    closeMediaMover({ commit }) {
        commit('setMediaMoverType', '');
        commit('setMediaMoverSubject', null);
        commit('hideMediaMover');
    },

    openConfirmation({ commit }, { type, subject }) {
        commit('setConfirmationType', type);
        commit('setConfirmationSubject', subject);
        commit('showConfirmation');
    },

    closeConfirmation({ commit }) {
        commit('setConfirmationType', '');
        commit('setConfirmationSubject', null);
        commit('hideConfirmation');
    },

    closeMediaManager({ commit }) {
        commit('closeMediaManager');
    },
};

const formatAcceptedExtensions = extensions => {
    if (extensions === 'image') {
        return imageExtensions;
    }

    if (Array.isArray(extensions)) {
        return extensions;
    }

    return extensions ? [ extensions ] : null;
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
