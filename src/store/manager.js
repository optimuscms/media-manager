import { imageExtensions } from '../index';

const state = {
    isOpen: false,

    limit: 0,
    acceptedExtensions: [],

    actionsPanelIsVisible: false,

    mediaMoverType: '',
    mediaMoverSubject: null,
    mediaMoverIsVisible: false,

    confirmationType: '',
    confirmationSubject: null,
    confirmationIsVisible: false,
};

const getters = {
    isOpen: state => {
        return state.isOpen;
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

    actionsPanelIsVisible: state => state.actionsPanelIsVisible,

    mediaMoverType: state => state.mediaMoverType,

    mediaMoverSubject: state => state.mediaMoverSubject,

    mediaMoverIsVisible: state => state.mediaMoverIsVisible,

    confirmationType: state => state.confirmationType,

    confirmationSubject: state => state.confirmationSubject,

    confirmationIsVisible: state => state.confirmationIsVisible,
};

const mutations = {
    open(state) {
        state.isOpen = true;
    },

    close(state) {
        state.isOpen = false;
    },

    setLimit(state, limit) {
        state.limit = limit;
    },

    setAcceptedExtensions(state, extensions) {
        state.acceptedExtensions = extensions;
    },

    showActionsPanel(state) {
        state.actionsPanelIsVisible = true;
    },

    hideActionsPanel(state) {
        state.actionsPanelIsVisible = false;
    },

    setMediaMoverType(state, type) {
        state.mediaMoverType = type;
    },

    setMediaMoverSubject(state, subject) {
        state.mediaMoverSubject = subject;
    },

    showMediaMover(state) {
        state.mediaMoverIsVisible = true;
    },

    hideMediaMover(state) {
        state.mediaMoverIsVisible = false;
    },

    setConfirmationType(state, type) {
        state.confirmationType = type;
    },

    setConfirmationSubject(state, subject) {
        state.confirmationSubject = subject;
    },

    showConfirmation(state) {
        state.confirmationIsVisible = true;
    },

    hideConfirmation(state) {
        state.confirmationIsVisible = false;
    },
};

const actions = {
    open({ commit, dispatch, rootGetters }, { pickerId, limit, acceptedExtensions } = {}) {
        commit('setLimit', limit !== undefined ? limit : 0);
        commit('setAcceptedExtensions', formatAcceptedExtensions(acceptedExtensions));
        dispatch('mediaManagerPickers/setActiveId', pickerId, { root: true });

        dispatch('mediaManagerMedia/setSelectedIds',
            rootGetters['mediaManagerPickers/pickerMedia'](pickerId).map(({ id }) => {
                return id;
            }),
            { root: true },
        );

        dispatch('mediaManagerMedia/fetch', null, { root: true });
        dispatch('mediaManagerFolders/fetch', null, { root: true });

        commit('open');
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

    close({ commit }) {
        commit('close');
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
