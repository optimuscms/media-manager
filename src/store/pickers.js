const state = {
    activeId: null,

    pickersMediaIds: {},
};

const getters = {
    activeId: state => state.activeId,

    pickerMedia: (state, getters, rootState, rootGetters) => pickerId => {
        if (pickerId) {
            const pickerMediaIds = state.pickersMediaIds[pickerId];

            return rootGetters['mediaManagerMedia/list'].filter(({ id }) => {
                return pickerMediaIds.includes(id);
            });
        }

        return [];
    },
};

const mutations = {
    setActiveId(state, id) {
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
    setActiveId({ commit }, id) {
        commit('setActiveId', id || null);
    },

    clearActiveId({ commit }) {
        commit('setActiveId', null);
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
