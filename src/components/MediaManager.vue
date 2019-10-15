<template>
    <modal class="mm-reset" :active="isOpen" @close="close">
        <div class="mm-modal-wrap mm-media-manager-wrap">
            <folders />
            <actions-panel />

            <div class="mm-media">
                <div class="mm-media-header">
                    <div class="mm-media-header-left">
                        <a
                            class="mm-folders-show mm-icon"
                            @click="showFolders"
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
                    <media />

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

            <folder-manager :item="managedFolder" />
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

import Media from './partials/Media.vue';
import Folders from './partials/Folders.vue';
import ActionsPanel from './partials/ActionsPanel.vue';
import FolderManager from './FolderManager.vue';
import MediaMover from './MediaMover.vue';
import MediaUploader from './MediaUploader.vue';

export default {
    components: {
        Breadcrumb,
        Confirmation,
        Modal,

        Media,
        Folders,
        ActionsPanel,
        FolderManager,
        MediaMover,
        MediaUploader,
    },

    computed: {
        ...mapGetters({
            limit: 'mediaManager/limit',
            isOpen: 'mediaManager/isOpen',
            pickerId: 'mediaManagerPickers/activeId',
            currentMedia: 'mediaManagerMedia/current',
            focusedMediaIds: 'mediaManagerMedia/focusedIds',
            parentFolder: 'mediaManagerFolders/parentFolder',
            getPickerMedia: 'mediaManagerPickers/pickerMedia',
            selectedMediaIds: 'mediaManagerMedia/selectedIds',
            managedFolder: 'mediaManagerFolders/managedFolder',
            currentFolder: 'mediaManagerFolders/currentFolder',
            acceptedExtensions: 'mediaManager/acceptedExtensions',
        }),

        pickerMediaCount() {
            return this.getPickerMedia(this.pickerId).length;
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
                this.allowedFocusedMediaIds
            );
        },

        limitIsExceeded() {
            return this.limit && (this.selectedAndFocusedMedia.length > this.limit);
        },

        insertIsDisabled() {
            if (this.limitIsExceeded) {
                return true;
            }

            return ! this.allowedFocusedMediaIds.length
                && this.selectedMediaIds.length === this.pickerMediaCount;
        },
    },

    methods: {
        ...mapActions({
            closeManager: 'mediaManager/close',
            openFolder: 'mediaManagerFolders/openFolder',
            showFolders: 'mediaManagerFolders/show',
            showActionsPanel: 'mediaManager/showActionsPanel',
            setPickerMediaIds: 'mediaManagerPickers/setPickerMediaIds',
            clearActivePickerId: 'mediaManagerPickers/clearActiveId',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedIds',
            clearSelectedMediaIds: 'mediaManagerMedia/clearSelectedIds',
            disableMultipleFocus: 'mediaManagerMedia/disableMultipleFocus',
        }),

        confirm() {
            if (! this.insertIsDisabled) {
                this.setPickerMediaIds({
                    pickerId: this.pickerId,
                    mediaIds: this.selectedAndFocusedMedia,
                });

                this.close();
            }
        },

        close() {
            this.clearActivePickerId();
            this.disableMultipleFocus();
            this.clearFocusedMediaIds();
            this.clearSelectedMediaIds();
            this.openFolder(null);
            this.closeManager();
        },
    },
};
</script>
