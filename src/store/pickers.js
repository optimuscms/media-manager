const state = {
    activeId: null,

    pickersMediaIds: {},
};

const getters = {
    activePickerId: state => state.activeId,

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
    setActivePickerId(state, id) {
        state.activeId = id;
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
    setActivePickerId({ commit }, id) {
        commit('setActivePickerId', id || null);
    },

    clearActivePickerId({ commit }) {
        commit('setActivePickerId', null);
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
