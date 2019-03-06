<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-mover">
            <header class="mm-modal-header">
                <div class="mm-media-mover-header">
                    <a class="mm-icon" v-if="activeFolder.id" @click="setActiveFolder(activeFolder.parent_id)">
                        <icon icon="arrow-left" size="lg"></icon>
                    </a>

                    <h4 class="mm-title">{{ activeFolder.name }}</h4>
                </div>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="mm-modal-content is-media-mover">
                <ul class="mm-media-mover-folder-list" v-if="currentFolders.length">
                    <li
                        :key="folder.id"
                        v-for="folder in currentFolders"
                        :class="{ 'selected': selectedFolderId === folder.id }"
                    >
                        <a @click="toggleSelectFolder(folder.id)">
                            <span class="mm-media-mover-folder-details">
                                <span class="mm-icon">
                                    <icon icon="folder"></icon>
                                </span>

                                <span>{{ folder.name }}</span>
                            </span>

                            <span class="mm-icon" @click="setActiveFolder(folder.id)">
                                <icon icon="angle-right"></icon>
                            </span>
                        </a>
                    </li>
                </ul>

                <div class="mm-media-mover-notification" v-else>
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
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import groupBy from 'lodash/groupBy';

    import Modal from './ui/Modal';

    const rootFolder = function () {
        return {
            id: null,
            parent_id: null,
            name: 'Home'
        }
    };

    export default {
        components: {
            Modal
        },

        data() {
            return {
                isProcessing: false,

                activeFolder: rootFolder(),
                selectedFolderId: null
            }
        },
        
        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/mediaMoverIsOpen',
                allFolders: 'mediaManager/allFolders',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                focusedFolderIds: 'mediaManager/focusedFolderIds'
            }),

            groupedFolders() {
                let folders = this.allFolders.filter(({ id }) => {
                    return ! this.focusedFolderIds.includes(id);
                });

                return groupBy(
                    folders,
                    folder => folder.parent_id
                );
            },

            currentFolders() {
                return this.groupedFolders.hasOwnProperty(this.activeFolder.id)
                    ? this.groupedFolders[this.activeFolder.id]
                    : [];
            }
        },

        methods: {
            ...mapActions({
                moveMediaTo: 'mediaManager/moveMediaTo',
                moveFoldersTo: 'mediaManager/moveFoldersTo'
            }),

            ...mapMutations({
                close: 'mediaManager/closeMediaMover',
                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
                clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
            }),

            setActiveFolder(folderId) {
                if (folderId) {
                    this.activeFolder = this.allFolders.find(({ id }) => {
                        return id === folderId;
                    });
                } else {
                    this.activeFolder = rootFolder();
                }
                
                this.selectedFolderId = null;
            },

            toggleSelectFolder(folderId) {
                this.selectedFolderId = this.selectedFolderId === folderId
                    ? this.activeFolder.id
                    : folderId;
            },

            move() {
                let requests = [];
                let parentId = this.selectedFolderId || this.activeFolder.id;

                this.isProcessing = true;
                
                if (this.focusedMediaIds.length) {
                    this.focusedMediaIds.forEach(mediaId => {
                        requests.push(axios.patch('/admin/api/media/' + mediaId, {
                            folder_id: parentId
                        }));
                    });
                }

                if (this.focusedFolderIds.length) {
                    this.focusedFolderIds.forEach(folderId => {
                        requests.push(axios.patch('/admin/api/media-folders/' + folderId, {
                            parent_id: parentId
                        }));
                    });
                }

                axios.all(requests).then(() => {
                    if (this.focusedMediaIds.length) {
                        this.moveMediaTo({
                            folderId: parentId,
                            mediaIds: this.focusedMediaIds
                        });

                        this.clearFocusedMediaIds();
                    }

                    if (this.focusedFolderIds.length) {
                        this.moveFoldersTo({
                            parentId,
                            folderIds: this.focusedFolderIds
                        });

                        this.clearFocusedFolderIds();
                    }
                });

                this.close();

                this.selectedFolderId = null;
                this.activeFolder = rootFolder();
                this.isProcessing = false;
            }
        }
    }
</script>
