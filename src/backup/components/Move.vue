<template>
    <o-modal :active="isActive" @close="close">
        <div class="modal-content bg-white rounded max-w-xs">
            <header class="flex flex-no-shrink justify-between items-center bg-grey-lighter border-b border-grey-light rounded-t p-4">
                <h4 class="title">Move</h4>

                <a class="icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="section-loader bg-white" :class="{ 'loading': isLoading }">
                <ul class="list-reset move-list" v-if="folders.hasOwnProperty(null)">
                    <move-folder
                        :key="folder.id"
                        v-for="folder in folders[null]"
                        :folder="folder"
                    ></move-folder>
                </ul>
            </section>

            <footer class="flex flex-no-shrink justify-end items-center bg-grey-lighter rounded-b p-4">
                <a
                    class="button button-green w-full"
                    @click="move"
                    :class="{ 'loading': isSaving }"
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

<style lang="scss">
    .move-list {
        > li {
            > a {
                display: flex;
                align-items: center;
                padding: 0.75rem 1rem;
                justify-content: space-between;
                border-bottom: solid 1px config('colors.grey-light');
                
                &:hover {
                    background-color: config('colors.grey-lighter');
                }
            }

            &.active {
                > a {
                    color: config('colors.white');
                    background-color: config('colors.primary');
                    border-bottom-color: rgba(255, 255, 255, 0.5);
                }
            }

            &.selected {
                > a {
                    color: config('colors.grey-darker');
                    background-color: config('colors.grey-lighter');
                }
            }

            ul {
                > li {
                    > a {
                        display: flex;
                        align-items: center;
                        padding: 0.75rem 1rem;
                        justify-content: space-between;
                        border-bottom: solid 1px config('colors.grey-light');

                        &:hover {
                            background-color: config('colors.grey-lighter');
                        }
                    }

                    &.active {
                        > a {
                            color: config('colors.white');
                            background-color: config('colors.primary');
                            border-bottom-color: rgba(255, 255, 255, 0.5);
                        }
                    }

                    &.selected {
                        > a {
                            color: config('colors.grey-darker');
                            background-color: config('colors.grey-lighter');
                        }
                    }
                }
            }
        }
    }
</style>
