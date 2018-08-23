<template>
    <o-modal class="is-media-manager" :active="isOpen" @close="close">
        <div class="modal-card">
            <header class="modal-card-head is-block">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <nav class="breadcrumb">
                                <ul>
                                    <li
                                        :key="folder.id"
                                        v-for="folder in openFolders"
                                        :class="{ 'is-active': folder.id === activeFolderId }"
                                    >
                                        <a @click="openFolder(folder)">{{ folder.name }}</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div class="level-right" v-if="focusedItemCount">
                        <div class="level-item">
                            <o-dropdown class="is-right">
                                <a slot="button" class="icon">
                                    <icon icon="ellipsis-h" size="lg"></icon>
                                </a>

                                <a class="dropdown-item text-has-icon" v-if="focusedItemCount === 1" @click="edit">
                                    <span class="icon">
                                        <icon icon="info-circle"></icon>
                                    </span>

                                    <span>Properties</span>
                                </a>

                                <a class="dropdown-item text-has-icon" @click="$refs.move.open()">
                                    <span class="icon">
                                        <icon icon="reply"></icon>
                                    </span>

                                    <span>Move</span>
                                </a>

                                <div class="dropdown-divider"></div>

                                <a
                                    class="dropdown-item text-has-icon has-text-danger"
                                    @click="$refs.confirm.open({
                                        media: focusedMediaIds.length,
                                        folders: focusedFolderIds.length
                                    })"
                                >
                                    <span class="icon">
                                        <icon icon="trash"></icon>
                                    </span>

                                    <span>Delete</span>
                                </a>
                            </o-dropdown>
                        </div>
                    </div>
                </div>
            </header>

            <section class="modal-card-body" @click="clearFocused" :class="{ 'is-loading': isLoading }">
                <!-- Folders -->
                <template v-if="currentFolders.length">
                    <h2 class="title">Folders</h2>

                    <div class="folders-holder field is-grouped is-grouped-multiline">
                        <div class="control" :key="folder.id" v-for="folder in currentFolders">
                            <div class="field has-addons">
                                <div class="control">
                                    <a
                                        title="Open folder"
                                        class="button is-folder"
                                        :class="{ 'is-focused': focusedFolderIds.includes(folder.id) }"
                                        @click="openFolder(folder)"
                                    >
                                        <div class="icon">
                                            <icon icon="folder" size="lg"></icon>
                                        </div>

                                        <span class="text-weight-normal">{{ folder.name }}</span>
                                    </a>
                                </div>

                                <div class="control">
                                    <a class="button" title="Select folder" @click.stop="focusFolder(folder.id)">
                                        <span class="icon is-small">
                                            <icon icon="crosshairs"></icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- Media -->
                <template v-if="currentMedia.length">
                    <h2 class="title">Media</h2>

                    <div class="columns is-mobile is-multiline">
                        <div
                            :key="file.id"
                            class="column is-6-mobile is-4-tablet is-3-desktop is-2-widescreen"
                            v-for="file in currentMedia"
                        >
                            <div
                                class="media-card"
                                :class="{
                                    'is-focused': focusedMediaIds.includes(file.id),
                                    'is-selected': selectedMediaIds.includes(file.id)
                                }"
                                @click.stop="focusMedia(file.id)"
                            >
                                <figure class="image is-4by3" v-if="isImage(file.extension)">
                                    <img :src="file.thumbnail_url" :alt="file.name" :title="file.name">
                                </figure>

                                <div class="media-file" v-else>
                                    <div class="icon">
                                        <icon :icon="icon(file.extension)" size="4x"></icon>
                                    </div>
                                </div>

                                <div class="media-content">
                                    {{ file.name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <o-notification
                    class="is-info radius-small"
                    v-else
                    :active="! currentMedia.length"
                    :closeable="false"
                >
                    No media, add new media by clicking the <strong>New</strong> button below.
                </o-notification>

                <upload ref="upload"></upload>
            </section>

            <footer class="modal-card-foot is-block">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <o-dropdown class="is-up">
                                <a slot="button" class="button is-primary">
                                    <span>New</span>

                                    <span class="icon is-small">
                                        <icon icon="angle-up"></icon>
                                    </span>
                                </a>

                                <a class="dropdown-item" @click="$refs.manageFolder.open()">New Folder</a>
                                <a class="dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                            </o-dropdown>
                        </div>

                        <div class="level-item" v-if="selectedMediaCount">
                            <o-dropdown class="is-up">
                                <a slot="button" class="button is-light">
                                    <span>
                                        <template v-if="limit">
                                            {{ selectedMediaCount }} of {{ limit }} 
                                            file{{ limit !== 1 ? 's' : null }} selected
                                        </template>

                                        <template v-else>
                                            {{ selectedMediaCount }} 
                                            file{{ selectedMediaCount !== 1 ? 's' : null }} selected
                                        </template>
                                    </span>

                                    <span class="icon is-small">
                                        <icon icon="angle-up"></icon>
                                    </span>
                                </a>

                                <div class="scroll">
                                    <div
                                        class="dropdown-item text-has-icon is-spaced"
                                        :key="file.id"
                                        v-for="file in selectedMedia"
                                    >
                                        <span class="overflow-wrap">{{ file.name }}</span>

                                        <a class="icon" @click.stop="removeSelectedMediaItem(file.id)">
                                            <icon :icon="['far', 'times-circle']"></icon>
                                        </a>
                                    </div>

                                    <div class="dropdown-divider"></div>

                                    <a class="dropdown-item" @click="clearSelectedMedia">
                                        Clear all selected files
                                    </a>
                                </div>
                            </o-dropdown>
                        </div>
                    </div>

                    <div class="level-right">
                        <div class="level-item">
                            <a
                                v-if="limit !== 0"
                                class="button is-success"
                                @click="confirm" 
                                :disabled="insertIsDisabled"
                            >Insert</a>

                            <a class="button" @click="cancel">
                                {{ limit === 0 ? 'Close' : 'Cancel' }}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

        <move ref="move"></move>
        <manage-media ref="manageMedia"></manage-media>
        <manage-folder ref="manageFolder"></manage-folder>

        <o-confirm
            ref="confirm"
            type="danger"
            @confirm="deleteFocusedItems"
        >
            <template slot="confirmButtonText">Delete</template>

            <template slot-scope="count">
                Are you sure you want to delete
                <strong v-if="count.folders">{{ count.folders }} folder{{ count.folders !== 1 ? 's' : null }}</strong>
                <template v-if="count.folders && count.media"> and </template>
                <strong v-if="count.media">{{ count.media }} media item{{ count.media !== 1 ? 's' : null }}</strong>
            </template>
        </o-confirm>
    </o-modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    // Components
    import ManageFolder from './ManageFolder';
    import ManageMedia from './ManageMedia';
    import Move from './Move';
    import Upload from './Upload';

    export default {
        components: {
            ManageFolder,
            ManageMedia,
            Move,
            Upload
        },

        data() {
            return {
                isOpen: false,

                limit: null,
                accept: []
            }
        },

        computed: {
            ...mapGetters({
                isLoading: 'mediaManager/isLoading',

                currentMedia: 'mediaManager/currentMedia',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                selectedMedia: 'mediaManager/selectedMedia',
                selectedMediaIds: 'mediaManager/selectedMediaIds',

                activeFolderId: 'mediaManager/activeFolderId',
                currentFolders: 'mediaManager/currentFolders',
                focusedFolderIds: 'mediaManager/focusedFolderIds',
                openFolders: 'mediaManager/openFolders',

                icon: 'mediaManager/icon',
                isImage: 'mediaManager/isImage'
            }),

            focusedItemCount() {
                return this.focusedFolderIds.length + this.focusedMediaIds.length;
            },

            selectedMediaCount() {
                return this.selectedMedia.length;
            },

            limitIsExceeded() {
                if (this.limit) {
                    let newlySelectedMedia = this.focusedMediaIds.filter(id => {
                        return ! this.selectedMediaIds.includes(id)
                    });
                    
                    return (this.selectedMediaCount + newlySelectedMedia.length) > this.limit;
                }

                return false;
            },

            insertIsDisabled() {
                return this.limitIsExceeded || ! (this.focusedMediaIds.length || this.selectedMediaCount)
            }
        },

        watch: {
            activeFolderId() {
                this.clearFocused();
                this.getMediaAndFolders();
            }
        },

        mounted() {
            this.$mediaManager.onOpen(this.open);
        },

        beforeDestroy() {
            this.$mediaManager.destroy(this.open);
        },

        methods: {
            ...mapActions({
                resetMediaManager: 'mediaManager/reset',
                getMediaAndFolders: 'mediaManager/getMediaAndFolders',
                deleteFocusedItems: 'mediaManager/deleteFocusedItems',
                
                setSelectedMedia: 'mediaManager/setSelectedMedia',
                selectMedia: 'mediaManager/selectMedia'
            }),

            ...mapMutations({
                focusMedia: 'mediaManager/focusMedia',
                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
                removeSelectedMediaItem: 'mediaManager/removeSelectedMediaItem',
                clearSelectedMedia: 'mediaManager/clearSelectedMedia',

                focusFolder: 'mediaManager/focusFolder',
                clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
                openFolder: 'mediaManager/openFolder'
            }),

            open({ limit, selected, accept }) {
                this.limit = limit;
                this.accept = accept || null;

                this.setSelectedMedia(selected);

                this.isOpen = true;
                this.getMediaAndFolders();
            },

            edit() {
                if (this.focusedItemCount === 1) {
                    this.focusedMediaIds.length
                        ? this.editMedia(this.focusedMediaIds[0])
                        : this.editFolder(this.focusedFolderIds[0]);
                }
            },

            editMedia(mediaId) {
                let media = this.currentMedia.find(({ id }) => id === mediaId);

                this.$refs.manageMedia.open({
                    id: media.id,
                    name: media.name,
                    url: media.thumbnail_url,
                    extension: media.extension
                });
            },

            editFolder(folderId) {
                let folder = this.currentFolders.find(({ id }) => id === folderId);

                this.$refs.manageFolder.open({
                    id: folder.id,
                    name: folder.name
                });
            },

            clearFocused() {
                this.clearFocusedMediaIds();
                this.clearFocusedFolderIds();
            },

            confirm() {
                if (! this.insertIsDisabled) {
                    this.selectMedia(); 

                    this.$mediaManager.mediaSelected(this.selectedMediaIds);
                    
                    this.resetMediaManager();
                    this.isOpen = false;
                }
            },

            cancel() {
                this.clearFocused();
                this.close();
            },

            close() {
                this.$mediaManager.close();
                this.isOpen = false;
            }
        }
    }
</script>
