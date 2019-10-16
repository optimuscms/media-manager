<template>
    <div v-if="limit !== 0" class="mm-selected-media">
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
                @click="unselectMediaId(mediaItem.id)"
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
            limit: 'mediaManager/limit',
            media: 'mediaManagerMedia/list',
            selectedMediaIds: 'mediaManagerMedia/selectedIds',
            currentFolder: 'mediaManagerFolders/currentFolder',
        }),

        selectedMedia() {
            return sortBy(this.media.filter(({ id }) => {
                return this.selectedMediaIds.includes(id);
            }), 'name', 'asc');
        },

        title() {
            let title = 'Selected Media';

            if (this.limit) {
                title += ` (${this.selectedMedia.length}/${this.limit})`;
            }

            return title;
        },
    },

    methods: {
        ...mapActions({
            focusId: 'mediaManagerMedia/focusId',
            openFolder: 'mediaManagerFolders/openFolder',
            clearFocusedIds: 'mediaManagerMedia/clearFocusedIds',
        }),

        edit(media) {
            this.editingItem = media;
            this.isEditing = true;
        },

        focusSelectedMedia(media) {
            if (this.currentFolder.id !== media.folder_id) {
                this.openFolder(media.folder_id);
            }

            this.clearFocusedIds();
            this.focusId(media.id);
        },
    },
};
</script>
