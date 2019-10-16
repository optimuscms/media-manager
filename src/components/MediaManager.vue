<template>
    <modal class="mm-reset" :active="isOpen" @close="close">
        <div class="mm-modal-wrap mm-media-manager-wrap">
            <folders-panel />
            <actions-panel />

            <div class="mm-media">
                <div class="mm-media-header">
                    <div class="mm-media-header-left">
                        <a
                            class="mm-folders-show mm-icon"
                            @click="showFoldersPanel"
                        >
                            <icon icon="list-alt" />
                        </a>

                        <a
                            v-if="parentFolder"
                            class="mm-folders-back mm-icon"
                            @click="openFolder(parentFolder.id)"
                        >
                            <icon icon="arrow-left" />
                        </a>

                        <h4 class="mm-current-folder-name">
                            {{ currentFolder.name }}
                        </h4>

                        <breadcrumb />
                    </div>

                    <a
                        v-if="hasFocusedMedia"
                        class="mm-actions-panel-show mm-icon"
                        @click="showActionsPanel"
                    >
                        <icon icon="info-circle" />
                    </a>
                </div>

                <div class="mm-media-content">
                    <media-panel />

                    <media-uploader ref="upload" />
                </div>

                <div class="mm-media-footer">
                    <a
                        class="mm-button"
                        @click="$refs.upload.focus()"
                    >
                        Add Media
                    </a>

                    <div class="mm-button-group">
                        <a
                            v-if="limit !== 0"
                            class="mm-button confirm"
                            :disabled="insertIsDisabled"
                            @click="confirm"
                        >
                            Insert
                        </a>

                        <a class="mm-button" @click="close">
                            {{ limit === 0 ? 'Close' : 'Cancel' }}
                        </a>
                    </div>
                </div>
            </div>

            <folder-manager :item="folderBeingManaged" />
            <media-mover />
            <confirmation />
        </div>
    </modal>
</template>

<script>
import { union } from 'lodash';
import { mapGetters, mapActions } from 'vuex';

// Components
import Breadcrumb from './ui/Breadcrumb.vue';
import Confirmation from './ui/Confirmation.vue';
import Modal from './ui/Modal.vue';

import MediaPanel from './partials/Media.vue';
import FoldersPanel from './partials/Folders.vue';
import ActionsPanel from './actions-panel/Panel.vue';
import FolderManager from './FolderManager.vue';
import MediaMover from './MediaMover.vue';
import MediaUploader from './MediaUploader.vue';

export default {
    components: {
        Breadcrumb,
        Confirmation,
        Modal,

        MediaPanel,
        FoldersPanel,
        ActionsPanel,
        FolderManager,
        MediaMover,
        MediaUploader,
    },

    computed: {
        ...mapGetters({
            limit: 'mediaManager/mediaSelectionLimit',
            isOpen: 'mediaManager/mediaManagerIsOpen',
            currentMedia: 'mediaManagerMedia/currentMedia',
            parentFolder: 'mediaManagerFolders/parentFolder',
            currentFolder: 'mediaManagerFolders/currentFolder',
            getPickerMedia: 'mediaManagerPickers/getPickerMedia',
            focusedMediaIds: 'mediaManagerMedia/focusedMediaIds',
            acceptedExtensions: 'mediaManager/acceptedExtensions',
            currentPickerId: 'mediaManagerPickers/currentPickerId',
            selectedMediaIds: 'mediaManagerMedia/selectedMediaIds',
            folderBeingManaged: 'mediaManagerFolders/folderBeingManaged',
        }),

        pickerMediaCount() {
            return this.getPickerMedia(this.currentPickerId).length;
        },

        hasFocusedMedia() {
            return !! this.focusedMediaIds.length;
        },

        allowedFocusedMediaIds() {
            if (this.acceptedExtensions) {
                return this.currentMedia.filter(({ id, extension }) => {
                    return this.focusedMediaIds.includes(id)
                        && this.acceptedExtensions.includes(extension);
                }).map(({ id }) => id);
            }

            return this.focusedMediaIds;
        },

        selectedAndFocusedMedia() {
            return union(
                this.selectedMediaIds,
                this.allowedFocusedMediaIds,
            );
        },

        limitIsExceeded() {
            return this.limit && (this.selectedAndFocusedMedia.length > this.limit);
        },

        insertIsDisabled() {
            if (this.limitIsExceeded || ! this.allowedFocusedMediaIds.length) {
                return true;
            }

            return ! this.allowedFocusedMediaIds.filter(id => {
                return ! this.selectedMediaIds.includes(id);
            }).length;
        },
    },

    methods: {
        ...mapActions({
            openFolder: 'mediaManagerFolders/openFolder',
            showActionsPanel: 'mediaManager/showActionsPanel',
            closeMediaManager: 'mediaManager/closeMediaManager',
            showFoldersPanel: 'mediaManagerFolders/showFoldersPanel',
            setPickerMediaIds: 'mediaManagerPickers/setPickerMediaIds',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedMediaIds',
            clearCurrentPickerId: 'mediaManagerPickers/clearCurrentPickerId',
            clearSelectedMediaIds: 'mediaManagerMedia/clearSelectedMediaIds',
            disableMultipleMediaFocus: 'mediaManagerMedia/disableMultipleMediaFocus',
        }),

        confirm() {
            if (! this.insertIsDisabled) {
                this.setPickerMediaIds({
                    pickerId: this.currentPickerId,
                    mediaIds: this.selectedAndFocusedMedia,
                });

                this.close();
            }
        },

        close() {
            this.clearCurrentPickerId();
            this.disableMultipleMediaFocus();
            this.clearFocusedMediaIds();
            this.clearSelectedMediaIds();
            this.openFolder(null);
            this.closeMediaManager();
        },
    },
};
</script>
