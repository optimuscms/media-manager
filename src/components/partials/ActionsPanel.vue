<template>
    <div class="mm-actions-panel" :class="{ 'open': isVisible }">
        <div v-if="focusedMediaCount" class="mm-actions-panel-header">
            <h4 class="mm-actions-panel-title">
                {{ panelTitle }}
            </h4>

            <div class="mm-actions-panel-actions">
                <dropdown class="right">
                    <a slot="button" class="mm-icon md">
                        <icon icon="ellipsis-v" size="sm" />
                    </a>

                    <a
                        v-if="focusedMediaCount === 1"
                        class="mm-dropdown-item"
                        @click="edit(firstFocusedMedia)"
                    >
                        <span class="mm-icon">
                            <icon icon="pencil-alt" />
                        </span>

                        <span>Edit</span>
                    </a>

                    <a
                        class="mm-dropdown-item"
                        @click="openMediaMover({
                            type: 'media',
                            subject: focusedMedia,
                        })"
                    >
                        <span class="mm-icon">
                            <icon icon="reply" />
                        </span>

                        <span>Move</span>
                    </a>

                    <a
                        class="mm-dropdown-item"
                        @click="openConfirmation({
                            type: 'media',
                            subject: focusedMedia,
                        })"
                    >
                        <span class="mm-icon">
                            <icon icon="trash-alt" />
                        </span>

                        <span>Delete</span>
                    </a>
                </dropdown>

                <a
                    class="mm-actions-panel-hide mm-icon"
                    @click="hideActionsPanel"
                >
                    <icon icon="times" />
                </a>
            </div>
        </div>

        <div class="mm-actions-panel-content">
            <media-form
                v-if="isEditing"
                :item="editingItem"
                @complete="isEditing = false"
            />

            <div v-else-if="focusedMediaCount > 1" class="mm-actions-section">
                <div
                    v-for="mediaItem in focusedMedia"
                    :key="mediaItem.id"
                    class="mm-actions-media-item"
                >
                    <span>
                        {{ mediaItem.name }}
                    </span>

                    <a
                        class="mm-icon"
                        @click="edit(mediaItem)"
                    >
                        <icon icon="pencil-alt" size="sm" />
                    </a>
                </div>
            </div>

            <div v-else-if="firstFocusedMedia" class="mm-actions-section">
                <div class="mm-media-details">
                    <p>
                        <strong>Name:</strong><br>
                        {{ firstFocusedMedia.name }}
                    </p>

                    <p>
                        <strong>Alt text:</strong><br>
                        {{ firstFocusedMedia.alt_text || '-' }}
                    </p>

                    <p>
                        <strong>Caption:</strong><br>
                        {{ firstFocusedMedia.caption || '-' }}
                    </p>

                    <p>
                        <strong>File name:</strong><br>
                        {{ firstFocusedMedia.file_name }}
                    </p>

                    <p>
                        <strong>Uploaded on:</strong><br>
                        {{ firstFocusedMedia.created_at | formatDate }}
                    </p>
                </div>
            </div>
        </div>

        <div v-if="limit !== 0" class="mm-selected-media">
            <h4 class="mm-actions-panel-title">
                {{ selectedMediaTitle }}
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
    </div>
</template>

<script>
import moment from 'moment';
import { sortBy } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

import MediaForm from './MediaForm.vue';
import Dropdown from '../ui/Dropdown.vue';

export default {
    filters: {
        formatDate(date) {
            return moment(date).format('lll');
        },
    },

    components: {
        Dropdown,
        MediaForm,
    },

    data() {
        return {
            isEditing: false,
            editingItem: null,
        };
    },

    computed: {
        ...mapGetters({
            limit: 'mediaManager/limit',
            media: 'mediaManagerMedia/list',
            isVisible: 'mediaManager/actionsPanelIsVisible',
            currentMedia: 'mediaManagerMedia/current',
            currentFolder: 'mediaManagerFolders/currentFolder',
            focusedMediaIds: 'mediaManagerMedia/focusedIds',
            selectedMediaIds: 'mediaManagerMedia/selectedIds',
        }),

        focusedMediaCount() {
            return this.focusedMediaIds.length;
        },

        panelTitle() {
            if (this.focusedMediaCount === 1) {
                return 'File Properties';
            }

            return 'Multiple Actions';
        },

        selectedMediaTitle() {
            let title = 'Selected Media';

            if (this.limit) {
                title += ` (${this.selectedMedia.length}/${this.limit})`;
            }

            return title;
        },

        focusedMedia() {
            return sortBy(this.currentMedia.filter(({ id }) => {
                return this.focusedMediaIds.includes(id);
            }), 'name', 'asc');
        },

        selectedMedia() {
            return sortBy(this.media.filter(({ id }) => {
                return this.selectedMediaIds.includes(id);
            }), 'name', 'asc');
        },

        firstFocusedMedia() {
            return this.focusedMedia.find(({ id }) => {
                return id === this.focusedMediaIds[0];
            });
        },
    },

    watch: {
        focusedMediaIds() {
            this.isEditing = false;
        },
    },

    methods: {
        ...mapActions({
            focusId: 'mediaManagerMedia/focusId',
            openFolder: 'mediaManagerFolders/openFolder',
            openMediaMover: 'mediaManager/openMediaMover',
            unselectMediaId: 'mediaManagerMedia/unselectId',
            hideActionsPanel: 'mediaManager/hideActionsPanel',
            openConfirmation: 'mediaManager/openConfirmation',
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
