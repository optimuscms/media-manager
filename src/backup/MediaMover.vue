<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-mover">
            <header class="mm-modal-header">
                <h4 class="mm-title">Move</h4>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="mm-modal-content is-media-mover" :class="{ 'loading': isLoading }">
                <ul class="mm-media-mover-folder-list" v-if="folders.hasOwnProperty(null)">
                    <move-folder
                        :key="folder.id"
                        v-for="folder in folders[null]"
                        :folder="folder"
                    ></move-folder>
                </ul>
            </section>

            <footer class="mm-modal-footer">
                <a
                    class="mm-button full is-confirm"
                    @click="move"
                    :class="{ 'loading': isSaving }"
                    :disabled="isSaving || isLoading"
                >Move</a>
            </footer>
        </div>
    </modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import groupBy from 'lodash/groupBy';

    import Modal from './ui/Modal';
    import MoveFolder from './partials/MoveFolder';

    export default {
        components: {
            Modal,
            MoveFolder
        },

        data() {
            return {
                isLoading: false,
                isSaving: false
            }
        },
        
        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/mediaMoverIsOpen',

                focusedMediaIds: 'mediaManager/focusedMediaIds',
                focusedFolderIds: 'mediaManager/focusedFolderIds',
                folders: 'mediaManager/getMoveFolders',
                openFolders: 'mediaManager/getMoveOpenFolders'
            }),

            selectedFolder() {
                return this.openFolders[this.openFolders.length - 1] || null;
            }
        },

        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    this.getFolders();
                }
            }
        },

        methods: {
            ...mapActions({
                // moveFocusedMediaTo: 'mediaManager/moveFocusedMediaTo',
                // moveFocusedFoldersTo: 'mediaManager/moveFocusedFoldersTo'
            }),

            ...mapMutations({
                close: 'mediaManager/closeMediaMover',
                // setFolders: 'mediaManager/setMoveFolders',
                // clearOpen: 'mediaManager/clearMoveOpenFolders',
            }),

            getFolders() {
                this.isLoading = true;

                axios.get('/admin/media-folders').then(response => {
                    this.setFolders(
                        groupBy(response.data.data, folder => folder.parent_id)
                    );

                    this.isLoading = false;
                });
            },

            move() {
                this.isSaving = true;
                let requests = [];

                if (this.focusedMediaIds.length) {
                    this.focusedMediaIds.forEach(mediaId => {
                        requests.push(axios.patch('/admin/media/' + mediaId, {
                            folder_id: this.selectedFolder
                        }));
                    });
                }

                if (this.focusedFolderIds.length) {
                    this.focusedFolderIds.forEach(folderId => {
                        requests.push(axios.patch('/admin/media-folders/' + folderId, {
                            parent_id: this.selectedFolder
                        }));
                    });
                }

                axios.all(requests).then(() => {
                    this.moveFocusedMediaTo(this.selectedFolder);
                    this.moveFocusedFoldersTo(this.selectedFolder);

                    this.close();
                });
            },

            // close() {
            //     this.clearOpen();

            //     this.isActive = false;
            //     this.isSaving = false;
            // }
        }
    }
</script>
