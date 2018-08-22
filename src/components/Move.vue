<template>
    <o-modal class="is-media-move" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Move</div>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body" :class="{ 'is-loading': isLoading }">
                <ul class="move-list" v-if="folders.hasOwnProperty(null)">
                    <move-folder
                        :key="folder.id"
                        v-for="folder in folders[null]"
                        :folder="folder"
                    ></move-folder>
                </ul>
            </section>

            <footer class="modal-card-foot">
                <a
                    class="button is-success is-fullwidth"
                    @click="move"
                    :class="{ 'is-loading': isSaving }"
                    :disabled="isSaving || isLoading"
                >Move</a>
            </footer>
        </div>
    </o-modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import groupBy from 'lodash/groupBy';
    import MoveFolder from './MoveFolder';

    export default {
        components: {
            MoveFolder
        },

        data() {
            return {
                isActive: false,
                isLoading: false,
                isSaving: false
            }
        },
        
        computed: {
            ...mapGetters({
                focusedMedia: 'mediaManager/focusedMedia',
                focusedFolders: 'mediaManager/focusedFolders',
                folders: 'mediaManager/getMoveFolders',
                openFolders: 'mediaManager/getMoveOpenFolders'
            }),

            selectedFolder() {
                return this.openFolders[this.openFolders.length - 1] || null;
            }
        },

        watch: {
            isActive(value) {
                if (value) {
                    this.getFolders();
                }
            }
        },

        methods: {
            ...mapActions({
                moveFocusedMediaTo: 'mediaManager/moveFocusedMediaTo',
                moveFocusedFoldersTo: 'mediaManager/moveFocusedFoldersTo'
            }),

            ...mapMutations({
                setFolders: 'mediaManager/setMoveFolders',
                clearOpen: 'mediaManager/clearMoveOpenFolders',
            }),

            getFolders() {
                this.isLoading = true;

                axios.get('/api/media-folders').then(response => {
                    this.setFolders(
                        groupBy(response.data.data, folder => folder.parent_id)
                    );

                    this.isLoading = false;
                });
            },

            move() {
                this.isSaving = true;
                let requests = [];

                if (this.focusedMedia.length) {
                    this.focusedMedia.forEach(mediaId => {
                        requests.push(axios.patch('/api/media/' + mediaId, {
                            folder_id: this.selectedFolder
                        }));
                    });
                }

                if (this.focusedFolders.length) {
                    this.focusedFolders.forEach(folderId => {
                        requests.push(axios.patch('/api/media-folders/' + folderId, {
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

            open() {
                this.isActive = true;
            },

            close() {
                this.clearOpen();

                this.isActive = false;
                this.isSaving = false;
            }
        }
    }
</script>
