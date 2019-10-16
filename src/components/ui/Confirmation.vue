<template>
    <modal class="mm-confirmation" :active="isOpen" @close="close">
        <div class="mm-modal-wrap">
            <div class="mm-confirmation-content">
                <template v-if="items">
                    Are you sure you want to delete<br>

                    <strong>
                        {{ items.length }}
                        {{ type === 'folder' ? 'Folders' : 'Media Items' }}
                    </strong>
                </template>

                <template v-else-if="item">
                    Are you sure you want to delete the {{ type }}<br>

                    <strong>
                        {{ item.name }}
                    </strong>
                </template>
            </div>

            <div class="mm-confirmation-buttons">
                <a class="mm-button danger" @click="confirm">
                    Delete
                </a>

                <a class="mm-button" @click="close">
                    Cancel
                </a>
            </div>
        </div>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { actions as apiActions } from '../../index';

import Modal from './Modal.vue';

export default {
    components: { Modal },

    computed: {
        ...mapGetters({
            type: 'mediaManager/confirmationType',
            isOpen: 'mediaManager/showConfirmation',
            folders: 'mediaManagerFolders/listFolders',
            subject: 'mediaManager/confirmationSubject',
            getAncestorIds: 'mediaManagerFolders/getAncestorIds',
        }),

        subjectIsArray() {
            return this.subject && Array.isArray(this.subject);
        },

        subjectIsMultiple() {
            return this.subjectIsArray && this.subject.length > 1;
        },

        items() {
            if (this.subjectIsArray && this.subjectIsMultiple) {
                return this.subject;
            }

            return null;
        },

        item() {
            if (this.subjectIsArray && ! this.subjectIsMultiple) {
                return this.subject[0];
            }

            if (this.subject && ! this.subjectIsArray) {
                return this.subject;
            }

            return null;
        },

        itemIds() {
            if (this.items) {
                return this.items.map(({ id }) => id);
            }

            if (this.item) {
                return [ this.item.id ];
            }

            return [];
        },
    },

    methods: {
        ...mapActions({
            close: 'mediaManager/closeConfirmation',
            removeMedia: 'mediaManagerMedia/removeMedia',
            removeFolders: 'mediaManagerFolders/removeFolders',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedMediaIds',
            removeMediaInFolders: 'mediaManagerMedia/removeMediaInFolders',
        }),

        confirm() {
            if (this.type === 'folder') {
                this.itemIds.forEach(folderId => {
                    apiActions.deleteFolder(folderId);

                    const folderIds = [
                        folderId,
                        ...this.getAncestorIds(folderId),
                    ];

                    this.removeFolders(folderIds);
                    this.removeMediaInFolders(folderIds);
                });
            }

            if (this.type === 'media') {
                this.itemIds.forEach(mediaId => {
                    apiActions.deleteMedia(mediaId);
                });

                this.removeMedia(this.itemIds);
                this.clearFocusedMediaIds();
            }

            this.close();
        },
    },
};
</script>
