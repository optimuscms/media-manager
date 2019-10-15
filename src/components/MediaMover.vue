<template>
    <modal class="mm-media-mover" :active="isOpen" @close="close">
        <div class="mm-modal-wrap">
            <header class="mm-modal-header">
                <div class="mm-media-mover-header">
                    <a
                        v-if="currentFolder.id"
                        class="mm-icon"
                        @click="setCurrentFolder(currentFolder.parent_id)"
                    >
                        <icon icon="arrow-left" />
                    </a>

                    <h4 class="mm-move-title">
                        {{ currentFolder.name }}
                    </h4>
                </div>

                <a class="mm-icon" @click="close">
                    <icon icon="times" />
                </a>
            </header>

            <section class="mm-modal-content">
                <ul v-if="currentFolders.length" class="mm-media-mover-folder-list">
                    <li
                        v-for="folder in currentFolders"
                        :key="folder.id"
                        :class="{ 'selected': selectedFolderId === folder.id }"
                    >
                        <a @click="toggleSelectFolder(folder.id)">
                            <span class="mm-media-mover-folder-details">
                                <span class="mm-icon">
                                    <icon icon="folder" />
                                </span>

                                <span>{{ folder.name }}</span>
                            </span>

                            <span class="mm-icon" @click="setCurrentFolder(folder.id)">
                                <icon icon="angle-right" />
                            </span>
                        </a>
                    </li>
                </ul>

                <div v-else class="mm-media-mover-notification">
                    This folder is empty
                </div>
            </section>

            <footer class="mm-modal-footer">
                <a
                    class="mm-button full is-confirm"
                    @click="move"
                >Move</a>
            </footer>
        </div>
    </modal>
</template>

<script>
import { groupBy, mapValues, sortBy } from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import { rootFolder } from '../config/folders';
import { actions as apiActions } from '../index';

import Modal from './ui/Modal.vue';

export default {
    components: { Modal },

    data() {
        return {
            isProcessing: false,

            currentFolder: rootFolder(),
            selectedFolderId: null,
        };
    },

    computed: {
        ...mapGetters({
            folders: 'mediaManagerFolders/list',
            type: 'mediaManager/mediaMoverType',
            subject: 'mediaManager/mediaMoverSubject',
            isOpen: 'mediaManager/mediaMoverIsVisible',
            getFolder: 'mediaManagerFolders/folder',
            getMediaItem: 'mediaManagerMedia/item',
        }),

        groupedFolders() {
            let folders = this.folders;

            if (this.type === 'folder') {
                folders = folders.filter(({ id }) => {
                    return ! this.itemIds.includes(id);
                });
            }

            return mapValues(
                groupBy(folders, ({ parent_id }) => parent_id),
                group => sortBy(group, 'name', 'asc')
            );
        },

        currentFolders() {
            if (this.groupedFolders.hasOwnProperty(this.currentFolder.id)) {
                return this.groupedFolders[this.currentFolder.id];
            }

            return [];
        },

        subjectIsArray() {
            return this.subject && Array.isArray(this.subject);
        },

        subjectIsMultiple() {
            return this.subjectIsArray && this.subject.length > 1;
        },

        itemIds() {
            if (this.subjectIsArray && this.subjectIsMultiple) {
                return this.subject.map(({ id }) => id);
            }

            if (this.subjectIsArray && ! this.subjectIsMultiple) {
                return [ this.subject[0].id ];
            }

            if (this.subject && ! this.subjectIsArray) {
                return [ this.subject.id ];
            }

            return [];
        },
    },

    methods: {
        ...mapActions({
            close: 'mediaManager/closeMediaMover',
            moveFoldersTo: 'mediaManagerFolders/moveFoldersTo',
            moveMediaTo: 'mediaManagerMedia/moveMediaItemsTo',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedIds',
        }),

        setCurrentFolder(folderId) {
            if (folderId) {
                this.currentFolder = this.folders.find(({ id }) => id === folderId);
            } else {
                this.currentFolder = rootFolder();
            }

            this.selectedFolderId = null;
        },

        toggleSelectFolder(folderId) {
            this.selectedFolderId = this.selectedFolderId === folderId
                ? this.currentFolder.id
                : folderId;
        },

        move() {
            const folderId = this.selectedFolderId || this.currentFolder.id;

            if (this.type === 'media') {
                this.moveMedia(folderId, this.itemIds);
            } else if (this.type === 'folder') {
                this.moveFolders(folderId, this.itemIds);
            } else {
                throw new Error(`Cannot move type: ${this.type}`);
            }
        },

        moveMedia(folderId, mediaIds) {
            const firstMediaItem = this.getMediaItem(mediaIds[0]);

            if (firstMediaItem.folder_id === folderId) {
                return this.reset();
            }

            let requests = [];
            this.isProcessing = true;

            mediaIds.forEach(mediaId => {
                requests.push(apiActions.updateMedia(mediaId, {
                    folder_id: folderId,
                }));
            });

            axios.all(requests).then(() => {
                this.moveMediaTo({ folderId, mediaIds });
                this.clearFocusedMediaIds();
                this.reset();
            });
        },

        moveFolders(parentId, folderIds) {
            const firstFolder = this.getFolder(folderIds[0]);

            if (firstFolder.parent_id === parentId) {
                return this.reset();
            }

            let requests = [];
            this.isProcessing = true;

            folderIds.forEach(folderId => {
                requests.push(apiActions.updateFolder(folderId, {
                    parent_id: parentId,
                }));
            });

            axios.all(requests).then(() => {
                this.moveFoldersTo({ parentId, folderIds });
                this.reset();
            });
        },

        reset() {
            this.close();
            this.isProcessing = false;
            this.currentFolder = rootFolder();
            this.selectedFolderId = null;
        },
    },
};
</script>
