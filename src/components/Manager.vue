<template>
    <o-modal :active="isOpen" @close="$mediaManager.close()">
        <div class="modal-content bg-white rounded h-full">
            <header class="flex flex-no-shrink justify-between items-center bg-grey-lighter border-b border-grey-light rounded-t px-6 py-4">
                <ul class="list-reset nav-breadcrumb text-base">
                    <li
                        :key="folder.id"
                        v-for="folder in openFolders"
                        :class="{ 'active': folder.id === activeFolderId }"
                    >
                        <a @click="openFolder(folder)">{{ folder.name }}</a>
                    </li>
                </ul>

                <o-dropdown class="right" :class="{ 'invisible pointer-events-none': ! focusedItemCount }">
                    <a slot="button" class="icon">
                        <icon icon="ellipsis-h" size="lg"></icon>
                    </a>

                    <a class="dropdown-item flex items-center" v-if="focusedItemCount === 1" @click="edit">
                        <span class="icon flex-no-shrink mr-2">
                            <icon icon="info-circle"></icon>
                        </span>

                        <span class="flex-grow">Properties</span>
                    </a>

                    <a class="dropdown-item flex items-center" @click="$refs.move.open()">
                        <span class="icon flex-no-shrink mr-2">
                            <icon icon="reply"></icon>
                        </span>

                        <span class="flex-grow">Move</span>
                    </a>

                    <div class="dropdown-divider"></div>

                    <a
                        class="dropdown-item flex items-center text-red"
                        @click="$refs.confirm.open({
                            media: focusedMediaIds.length,
                            folders: focusedFolderIds.length
                        })"
                    >
                        <span class="icon flex-no-shrink mr-2">
                            <icon icon="trash"></icon>
                        </span>

                        <span class="flex-grow">Delete</span>
                    </a>
                </o-dropdown>
            </header>

            <section
                class="section-loader bg-white overflow-auto flex-grow px-6 py-4"
                :class="{ 'loading': isLoading }"
                @click="clearFocused"
            >
                <template v-if="currentFolders.length">
                    <h2 class="title mb-4">Folders</h2>

                    <div class="flex flex-wrap -m-2">
                        <div
                            :key="folder.id"
                            class="folder select-none p-2"
                            v-for="folder in currentFolders"
                            :class="{ 'focused': focusedFolderIds.includes(folder.id) }"
                        >
                            <div class="field addons">
                                <div class="control flex-grow">
                                    <a title="Open folder" class="button w-full" @click="openFolder(folder)">
                                        <span class="icon">
                                            <icon icon="folder" size="lg"></icon>
                                        </span>

                                        <span class="font-normal normal-case truncate">{{ folder.name }}</span>
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

                    <hr class="bg-grey-light my-6">
                </template>

                <template v-if="currentMedia.length">
                    <h2 class="title mb-4">Media</h2>
                    
                    <div class="flex flex-wrap -m-2">
                        <div
                            :key="file.id"
                            class="w-1/2 md:w-1/4 lg:w-1/6"
                            v-for="file in currentMedia"
                        >
                            <div class="p-2">
                                <div
                                    class="media-card"
                                    :class="{
                                        'focused': focusedMediaIds.includes(file.id),
                                        'selected': selectedMediaIds.includes(file.id)
                                    }"
                                    @click.stop="focusMedia(file.id)"
                                >   
                                    <div class="media-card-image">
                                        <figure class="image 4by3" v-if="isImage(file.extension)">
                                            <img :src="file.thumbnail_url" :alt="file.name" :title="file.name">
                                        </figure>

                                        <div class="file" v-else>
                                            <div class="icon">
                                                <icon :icon="icon(file.extension)" size="4x"></icon>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="media-card-body truncate">{{ file.name }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <o-notification
                    class="bg-blue-light text-white rounded"
                    v-else
                    :active="! currentMedia.length"
                    :closeable="false"
                >No media, add new media by clicking the <strong>New</strong> button below.</o-notification>
            </section>
            
            <footer class="flex flex-no-shrink justify-between relative bg-grey-lighter border-t border-grey-light rounded-b px-6 py-4">
                <div>
                    <o-dropdown icon="angle-up" class="up" placeholder="New">
                        <a class="dropdown-item" @click="$refs.manageFolder.open()">New Folder</a>
                        <a class="dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                    </o-dropdown>

                    <o-dropdown class="up ml-3">
                        <template slot="button">
                            <span class="button button-grey">
                                <span class="font-normal normal-case">{{ selectedMediaLabel }}</span>

                                <span class="icon">
                                    <icon icon="angle-up"></icon>
                                </span>
                            </span>
                        </template>
                        
                        <a
                            :key="file.id"
                            class="dropdown-item flex items-center"
                            v-for="file in selectedMedia"
                        >
                            <span class="flex-grow truncate">{{ file.name }}</span>

                            <a class="icon flex-no-shrink ml-2" @click.stop="removeSelectedMediaItem(file.id)">
                                <icon :icon="['far', 'times-circle']"></icon>
                            </a>
                        </a>

                        <div class="dropdown-divider" v-if="selectedMedia.length"></div>

                        <a class="dropdown-item" @click="clearSelectedMedia">
                            Clear all selected files
                        </a>
                    </o-dropdown>
                </div>

                <div>
                    <a
                        v-if="limit !== 0"
                        class="button button-green"
                        @click="confirm" 
                        :disabled="insertIsDisabled"
                    >Insert</a>

                    <a class="button ml-3" @click="cancel">
                        {{ limit === 0 ? 'Close' : 'Cancel' }}
                    </a>
                </div>

                <upload ref="upload"></upload>
            </footer>
        </div>

        <move ref="move"></move>
        <manage-media ref="manageMedia"></manage-media>
        <manage-folder ref="manageFolder"></manage-folder>

        <o-confirmation
            ref="confirm"
            @confirm="deleteFocusedItems"
            button-class="button-red"
            button-text="Delete"
        >
            <template slot-scope="count">
                Are you sure you want to delete
                <strong v-if="count.folders">{{ count.folders }} folder{{ count.folders !== 1 ? 's' : null }}</strong>
                <template v-if="count.folders && count.media"> and </template>
                <strong v-if="count.media">{{ count.media }} media item{{ count.media !== 1 ? 's' : null }}</strong>
            </template>
        </o-confirmation>
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

        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/isOpen',
                isLoading: 'mediaManager/isLoading',

                limit: 'mediaManager/limit',
                acceptedExtensions: 'mediaManager/acceptedExtensions',

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

            selectedMediaLabel() {
                if (this.limit) {
                    return this.selectedMediaCount + ' of ' + this.limit + ' file' + ((this.limit !== 1) ? 's' : '') + ' selected';
                }

                return this.selectedMediaCount + ' file' + ((this.selectedMediaCount !== 1) ? 's' : '') + ' selected';
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
            // this.$mediaManager.onClose(this.close);
            this.$mediaManager.onClose(this.close);
        },

        beforeDestroy() {
            this.$mediaManager.destroy(this.open);
        },

        methods: {
            ...mapActions({
                open: 'mediaManager/open',

                resetMediaManager: 'mediaManager/reset',
                getMediaAndFolders: 'mediaManager/getMediaAndFolders',
                deleteFocusedItems: 'mediaManager/deleteFocusedItems',
                
                selectMedia: 'mediaManager/selectMedia'
            }),

            ...mapMutations({
                close: 'mediaManager/close',

                focusMedia: 'mediaManager/focusMedia',
                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
                removeSelectedMediaItem: 'mediaManager/removeSelectedMediaItem',
                clearSelectedMedia: 'mediaManager/clearSelectedMedia',

                focusFolder: 'mediaManager/focusFolder',
                clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
                openFolder: 'mediaManager/openFolder'
            }),

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
                    this.$mediaManager.close();
                }
            },

            cancel() {
                this.clearFocused();
                this.$mediaManager.close();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal-content {
        display: flex;
        overflow: hidden;
        flex-direction: column;
    }

    .nav-breadcrumb {
        display: flex;

        > li {
            position: relative;

            &:not(:first-child) {
                margin-left: 1rem;

                &:before {
                    left: -1rem;
                    width: 1rem;
                    content: '/';
                    text-align: center;
                    position: absolute;
                    color: config('colors.grey-light');
                    font-weight: config('fontWeights.semibold');
                }
            }

            > a {
                font-weight: config('fontWeights.semibold');
            }

            &.active {
                > a {
                    color: config('colors.primary');
                }
            }
        }
    }

    .folder {
        .button.w-full {
            max-width: 10rem;
        }

        &.focused {
            .button.w-full {
                color: config('colors.white');
                background-color: config('colors.blue-light');
            }
        }
    }

    .media-card {
        cursor: pointer;
        position: relative;
        border: solid 1px config('colors.grey-light');

        &.selected {
            border-color: config('colors.primary');
            outline: 3px solid config('colors.primary');

            .media-card-body {
                color: config('colors.white');
                background-color: config('colors.primary');
            }
        }

        &.focused {
            border-color: config('colors.blue-light');
            outline: 3px solid config('colors.blue-light');

            .media-card-body {
                color: config('colors.white');
                background-color: config('colors.blue-light');
            }
        }
    }

    .media-card-body {
        padding: 0.5rem 1rem;
        background-color: config('colors.grey-lighter');
    }

    .file {
        display: block;
        padding-top: 75%;
        position: relative;
        background-color: config('colors.grey-light');

        .icon {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 4rem;
            height: 4rem;
            margin: auto;
            position: absolute;
        }
    }
</style>

<style lang="scss">
    .section-loader {
        position: relative;

        &.loading {
            min-height: 10rem;
            
            > * {
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
            }

            &:before {
                $size: 3em;

                z-index: 10;
                top: 5rem;
                left: 50%;
                content: '';
                width: $size;
                height: $size;
                display: block;
                position: absolute;
                border-radius: 100px;
                margin-top: -($size / 2);
                margin-left: -($size / 2);
                animation: spin 500ms infinite linear;
                border: 3px solid config('colors.grey-dark');
                border-top-color: transparent;
                border-right-color: transparent;
            }
        }
    }
</style>
