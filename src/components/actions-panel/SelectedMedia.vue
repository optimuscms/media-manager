<template>
    <div v-if="mediaSelectionLimit !== 0" class="mm-selected-media">
        <h4 class="mm-actions-panel-title">
            {{ title }}
        </h4>

        <div
            v-for="mediaItem in selectedMedia"
            :key="mediaItem.id"
            class="mm-actions-media-item"
        >
            <a @click="focusSelectedMedia(mediaItem)">
                {{ mediaItem.name }}
            </a>

            <a
                class="mm-icon"
                @click="deselectMediaId(mediaItem.id)"
            >
                <icon icon="times" size="sm" />
            </a>
        </div>
    </div>
</template>

<script>
import { sortBy } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            media: 'mediaManagerMedia/listMedia',
            currentFolder: 'mediaManagerFolders/currentFolder',
            selectedMediaIds: 'mediaManagerMedia/selectedMediaIds',
            mediaSelectionLimit: 'mediaManager/mediaSelectionLimit',
        }),

        selectedMedia() {
            return sortBy(this.media.filter(({ id }) => {
                return this.selectedMediaIds.includes(id);
            }), 'name', 'asc');
        },

        title() {
            let title = 'Selected Media';

            if (this.mediaSelectionLimit) {
                title += ` (${this.selectedMedia.length}/${this.mediaSelectionLimit})`;
            }

            return title;
        },
    },

    methods: {
        ...mapActions({
            openFolder: 'mediaManagerFolders/openFolder',
            focusMediaId: 'mediaManagerMedia/focusMediaId',
            deselectMediaId: 'mediaManagerMedia/deselectMediaId',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedMediaIds',
        }),

        edit(media) {
            this.editingItem = media;
            this.isEditing = true;
        },

        focusSelectedMedia(media) {
            if (this.currentFolder.id !== media.folder_id) {
                this.openFolder(media.folder_id);
            }

            this.clearFocusedMediaIds();
            this.focusMediaId(media.id);
        },
    },
};
</script>
