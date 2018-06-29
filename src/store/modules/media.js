const state = {
    activeMedia: [],

    move: {
        folders: [],
        openFolders: [],
        excludedFolders: [],
    },

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
}

const getters = {
    getActiveMedia: state => ids => {
        return state.activeMedia.filter(media => ids.includes(media.id));
    },

    getMoveFolders: state => {
        return state.move.folders;
    },

    getMoveOpenFolders: state => {
        return state.move.openFolders;
    },

    getMoveExcludedFolders: state => {
        return state.move.excludedFolders;
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
    },
}

const mutations = {
    setActiveMedia(state, media) {
        state.activeMedia = media;
    },

    addActiveMedia(state, media) {
        let activeIds = state.activeMedia.map(media => media.id);
        
        let add = media.filter(media => {
            return ! activeIds.includes(media.id);
        });
        
        if (add.length) {
            state.activeMedia = state.activeMedia.concat(add);
        }
    },

    updateActiveMedia(state, { id, properties }) {
        state.activeMedia.map(file => {
            if (file.id === id) {
                Object.entries(properties).forEach(([key, value]) => {
                    file[key] = value;
                });
            }
        });
    },

    removeActiveMedia(state, mediaIds) {
        state.activeMedia = state.activeMedia.filter(({ id }) => ! mediaIds.includes(id));
    },

    clearActiveMedia(state) {
        state.activeMedia = [];
    },

    setMoveFolders(state, folders) {
        state.move.folders = folders;
    },

    addMoveOpenFolder(state, id) {
        if (state.move.openFolders.includes(id)) {
            let index = state.move.openFolders.findIndex(openId => openId === id);

            if (index !== -1) {
                state.move.openFolders.splice(index);
            }
        } else {
            state.move.openFolders.push(id);
        }
    },

    clearMoveOpenFolders(state) {
        state.move.openFolders = [];
    },

    setMoveExcludedFolders(state, folders) {
        state.move.excludedFolders = folders;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}
