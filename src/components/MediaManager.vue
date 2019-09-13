<template>
    <modal class="mm-reset" :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-manager">
            <header class="mm-modal-header">
                <breadcrumb />

                <dropdown class="right" :class="{ 'mm-manger-actions-disabled': ! focusedItemCount }">
                    <a slot="button" class="mm-icon">
                        <icon icon="ellipsis-h" size="lg" />
                    </a>

                    <a v-if="focusedItemCount === 1" class="mm-dropdown-item" @click="editFocusedItem">
                        <span class="mm-icon">
                            <icon icon="info-circle" />
                        </span>

                        <span>Properties</span>
                    </a>

                    <a class="mm-dropdown-item" @click="openMediaMover">
                        <span class="mm-icon">
                            <icon icon="reply" />
                        </span>

                        <span>Move</span>
                    </a>

                    <div class="mm-dropdown-divider" />

                    <a class="mm-dropdown-item mm-text-danger" @click="openConfirmation">
                        <span class="mm-icon">
                            <icon icon="trash" />
                        </span>

                        <span>Delete</span>
                    </a>
                </dropdown>
            </header>

            <section
                class="mm-modal-content is-media-manager"
                :class="{ 'loading': isLoading }"
                @click="clearAllFocusedIds"
            >
                <folders />
                <media />
            </section>

            <footer class="mm-modal-footer">
                <div class="mm-button-group">
                    <dropdown class="up">
                        <a slot="button" class="mm-button">
                            <span>New</span>

                            <span class="mm-icon">
                                <icon icon="angle-up" />
                            </span>
                        </a>

                        <a class="mm-dropdown-item" @click="openFolderManager()">New Folder</a>
                        <a class="mm-dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                    </dropdown>

                    <dropdown v-if="selectedMedia.length" class="up">
                        <span slot="button" class="mm-button is-selected-items">
                            <span>{{ selectedMediaLabel }}</span>

                            <span class="icon">
                                <icon icon="angle-up" />
                            </span>
                        </span>

                        <a v-for="file in selectedMedia" :key="file.id" class="mm-dropdown-item">
                            <span>{{ file.name }}</span>

                            <a
                                class="mm-icon"
                                @click.stop="removePickerMediaItem({
                                    pickerId: pickerId,
                                    id: file.id
                                })"
                            >
                                <icon :icon="['far', 'times-circle']" />
                            </a>
                        </a>

                        <div v-if="selectedMedia.length" class="mm-dropdown-divider" />

                        <a class="mm-dropdown-item" @click="clearPickerMedia(pickerId)">
                            Clear all selected files
                        </a>
                    </dropdown>

                    <span v-else class="mm-button is-selected-info">
                        {{ selectedMediaLabel }}
                    </span>
                </div>

                <div class="mm-button-group">
                    <a
                        v-if="limit !== 0"
                        class="mm-button is-confirm"
                        :disabled="insertIsDisabled"
                        @click="confirm"
                    >Insert</a>

                    <a class="mm-button" @click="cancel">
                        {{ limit === 0 ? 'Close' : 'Cancel' }}
                    </a>
                </div>

                <media-uploader ref="upload" />
            </footer>
        </div>

        <media-editor />
        <folder-manager />
        <media-mover />
        <confirmation />
    </modal>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

// Components
import Breadcrumb from './ui/Breadcrumb.vue';
import Confirmation from './ui/Confirmation.vue';
import Dropdown from './ui/Dropdown.vue';
import Modal from './ui/Modal.vue';

import Folders from './partials/Folders.vue';
import Media from './partials/Media.vue';
import FolderManager from './FolderManager.vue';
import MediaEditor from './MediaEditor.vue';
import MediaMover from './MediaMover.vue';
import MediaUploader from './MediaUploader.vue';

export default {
    components: {
        Breadcrumb,
        Confirmation,
        Dropdown,
        Modal,

        Folders,
        Media,
        FolderManager,
        MediaEditor,
        MediaMover,
        MediaUploader,
    },

    computed: {
        ...mapGetters({
            isOpen: 'mediaManager/isOpen',
            isLoading: 'mediaManager/isLoading',
            limit: 'mediaManager/limit',
            pickerId: 'mediaManager/pickerId',

            currentMedia: 'mediaManager/currentMedia',
            selectableMediaIds: 'mediaManager/selectableMediaIds',
            focusedMediaIds: 'mediaManager/focusedMediaIds',
            getSelectedMedia: 'mediaManager/selectedMedia',
            selectedMediaIds: 'mediaManager/selectedMediaIds',
            activeFolderId: 'mediaManager/activeFolderId',
            currentFolders: 'mediaManager/currentFolders',
            focusedFolderIds: 'mediaManager/focusedFolderIds',
            acceptedExtensions: 'mediaManager/acceptedExtensions',
        }),

        focusedItemCount() {
            return this.focusedFolderIds.length + this.focusedMediaIds.length;
        },

        selectedMedia() {
            return this.pickerId ? this.getSelectedMedia(this.pickerId) : [];
        },

        selectedMediaCount() {
            return this.selectedMedia.length;
        },

        selectedMediaLabel() {
            if (this.limit) {
                return this.selectedMediaCount +
                        ' of ' + this.limit +
                        ' file' + ((this.limit !== 1) ? 's' : '') +
                        ' selected';
            }

            return this.selectedMediaCount +
                    ' file' + ((this.selectedMediaCount !== 1) ? 's' : '') +
                    ' selected';
        },

        newlySelectedMedia() {
            return this.focusedMediaIds.filter(id => {
                return ! this.selectedMediaIds.includes(id)
                        && this.selectableMediaIds.includes(id);
            });
        },

        limitIsExceeded() {
            if (this.limit) {
                return (this.selectedMediaCount + this.newlySelectedMedia.length) > this.limit;
            }

            return false;
        },

        insertIsDisabled() {
            return this.limitIsExceeded || ! (this.newlySelectedMedia.length || this.selectedMediaCount);
        },
    },

    watch: {
        activeFolderId() {
            this.clearAllFocusedIds();
            this.fetchMedia();
        },
    },

    methods: {
        ...mapActions({
            reset: 'mediaManager/reset',
            close: 'mediaManager/close',
            fetchMedia: 'mediaManager/fetchMedia',
            selectMedia: 'mediaManager/selectMedia',
            removePickerMediaItem: 'mediaManager/removePickerMediaItem',
            openMediaEditor: 'mediaManager/openMediaEditor',
            openFolderManager: 'mediaManager/openFolderManager',
        }),

        ...mapMutations({
            close: 'mediaManager/close',
            clearPickerMedia: 'mediaManager/clearPickerMedia',
            clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
            clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
            openMediaMover: 'mediaManager/openMediaMover',
            openConfirmation: 'mediaManager/openConfirmation',
        }),

        editFocusedItem() {
            if (this.focusedItemCount === 1) {
                if (this.focusedMediaIds.length) {
                    let media = this.currentMedia.find(({ id }) => {
                        return id === this.focusedMediaIds[0];
                    });

                    this.openMediaEditor(media);
                } else {
                    let folder = this.currentFolders.find(({ id }) => {
                        return id === this.focusedFolderIds[0];
                    });

                    this.openFolderManager(folder);
                }
            }
        },

        clearAllFocusedIds() {
            this.clearFocusedMediaIds();
            this.clearFocusedFolderIds();
        },

        confirm() {
            if (! this.insertIsDisabled) {
                this.selectMedia();
                this.reset();
                this.close();
            }
        },

        cancel() {
            this.clearAllFocusedIds();
            this.close();
        },
    },
};
</script>
