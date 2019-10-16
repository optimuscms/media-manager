const state = {
    currentId: null,

    pickersMediaIds: {},
};

const getters = {
    currentPickerId: state => state.currentId,

    getPickerMedia: (state, getters, rootState, rootGetters) => pickerId => {
        if (pickerId) {
            const pickerMediaIds = state.pickersMediaIds[pickerId];

            return rootGetters['mediaManagerMedia/listMedia'].filter(({ id }) => {
                return pickerMediaIds.includes(id);
            });
        }

        return [];
    },
};

const mutations = {
    setCurrentPickerId(state, id) {
        state.currentId = id;
    },

    setPickerMediaIds(state, { pickerId, mediaIds }) {
        state.pickersMediaIds = {
            ...state.pickersMediaIds,
            [pickerId]: mediaIds,
        };
    },

    clearPickerMediaIds(state, pickerId) {
        delete state.pickersMediaIds[pickerId];
    },

    removePickerMediaId(state, { pickerId, mediaId }) {
        state.pickersMediaIds[pickerId] = state.pickersMediaIds[pickerId].filter(id => {
            return id !== mediaId;
        });
    },
};

const actions = {
    setCurrentPickerId({ commit }, id) {
        commit('setCurrentPickerId', id || null);
    },

    clearCurrentPickerId({ commit }) {
        commit('setCurrentPickerId', null);
    },

    setPickerMediaIds({ commit }, { pickerId, mediaIds }) {
        commit('setPickerMediaIds', { pickerId, mediaIds });
    },

    clearPickerMediaIds({ commit }, pickerId) {
        commit('clearPickerMediaIds', pickerId);
    },

    removePickerMediaId({ commit }, { pickerId, mediaId }) {
        commit('removePickerMediaId', { pickerId, mediaId });
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
