<template>
    <o-modal class="is-media-move" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <div class="modal-card-title">Move</div>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body" :class="{ 'is-loading': isLoading }">
                <ul class="move-list" v-if="folders.hasOwnProperty('root')">
                    <move-folder
                        :key="folder.id"
                        v-for="folder in folders['root']"
                        :folder="folder"
                    ></move-folder>
                </ul>
            </section>

            <footer class="modal-card-foot">
                <a
                    class="button is-success is-fullwidth"
                    :class="{ 'is-loading': isSaving }"
                    :disabled="isSaving || isLoading"
                    @click="move"
                >Move</a>
            </footer>
        </div>
    </o-modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
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
                isSaving: false,

                focused: null
            }
        },
        
        computed: {
            ...mapGetters({
                folders: 'mediaManager/getMoveFolders',
                openFolders: 'mediaManager/getMoveOpenFolders'
            }),

            activeFolder() {
                return this.openFolders[this.openFolders.length - 1];
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
            ...mapMutations({
                setFolders: 'mediaManager/setMoveFolders',
                clearOpen: 'mediaManager/clearMoveOpenFolders'
            }),

            getFolders() {
                this.isLoading = true;

                axios.get('/api/media-folders').then(response => {
                    this.setFolders(groupBy(response.data.data, folder => {
                        return folder.parent_id || 'root';
                    }));

                    this.isLoading = false;
                });
            },

            move() {
                this.isSaving = true;

                let requests = [];

                if (this.focused.media.length) {
                    this.focused.media.forEach(mediaId => {
                        requests.push(axios.patch('/api/media/' + mediaId, {
                            folder_id: this.activeFolder
                        }));
                    });
                }

                if (this.focused.folders.length) {
                    this.focused.folders.forEach(folderId => {
                        requests.push(axios.patch('/api/media-folders/' + folderId, {
                            parent_id: this.activeFolder
                        }));
                    });
                }

                axios.all(requests).then(() => {
                    this.$emit('moved');
                    this.close();
                });
            },

            open(focused) {
                this.focused = focused;
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
