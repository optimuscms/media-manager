<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap mm-manager">
            <header class="mm-modal-header">
                <ul class="mm-breadcrumb">
                    <li
                        :key="folder.id"
                        v-for="folder in openFolders"
                        :class="{ 'active': folder.id === activeFolderId }"
                    >
                        <a @click="openFolder(folder)">{{ folder.name }}</a>
                    </li>
                </ul>

                <dropdown class="right" :class="{ 'invisible pointer-events-none': ! focusedItemCount }">
                    <a slot="button" class="mm-icon">
                        <icon icon="ellipsis-h" size="lg"></icon>
                    </a>

                    <a class="mm-dropdown-item" v-if="focusedItemCount === 1" @click="edit">
                        <span class="mm-icon">
                            <icon icon="info-circle"></icon>
                        </span>

                        <span>Properties</span>
                    </a>

                    <a class="mm-dropdown-item" @click="$refs.move.open()">
                        <span class="mm-icon">
                            <icon icon="reply"></icon>
                        </span>

                        <span>Move</span>
                    </a>

                    <div class="mm-dropdown-divider"></div>

                    <a
                        class="mm-dropdown-item mm-text-danger"
                        @click="$refs.confirm.open({
                            media: focusedMediaIds.length,
                            folders: focusedFolderIds.length
                        })"
                    >
                        <span class="mm-icon">
                            <icon icon="trash"></icon>
                        </span>

                        <span>Delete</span>
                    </a>
                </dropdown>
            </header>

            <section
                class="mm-modal-content mm-manager-content"
                :class="{ 'loading': isLoading }"
                @click="clearFocused"
            >
                <template v-if="currentFolders.length">
                    <h2 class="mm-title">Folders</h2>
                    
                    <div class="mm-manager-folders">
                        <div
                            :key="folder.id"
                            class="mm-manager-folder"
                            v-for="folder in currentFolders"
                            :class="{ 'focused': focusedFolderIds.includes(folder.id) }"
                        >
                            <a
                                title="Open folder"
                                class="mm-manager-folder-detail"
                                @click="openFolder(folder)"
                            >
                                <span class="mm-icon">
                                    <icon icon="folder" size="lg"></icon>
                                </span>

                                <span class="mm-manager-folder-detail-name">
                                    {{ folder.name }}
                                </span>
                            </a>

                            <a
                                title="Select folder"
                                class="mm-manager-folder-select"
                                @click.stop="focusFolder(folder.id)"
                            >
                                <span class="mm-icon">
                                    <icon icon="crosshairs"></icon>
                                </span>
                            </a>
                        </div>
                    </div>
                    
                    <hr>
                </template>

                <template v-if="currentMedia.length">
                    <h2 class="mm-title">Media</h2>
                    
                    <!-- <div class="flex flex-wrap -m-2">
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
                                        <figure class="image image-4by3" v-if="isImage(file.extension)">
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
                    </div> -->
                </template>

                <div class="mm-manager-notification" v-else>
                    No media, add new media by clicking the <strong>New</strong> button below.
                </div>
            </section>
            
            <footer class="mm-modal-footer">
                <div>
                    <dropdown class="up">
                        <a slot="button" class="mm-button">
                            <span>New</span>

                            <span class="mm-icon">
                                <icon icon="angle-up"></icon>
                            </span>
                        </a>

                        <a class="mm-dropdown-item" @click="$refs.manageFolder.open()">New Folder</a>
                        <a class="mm-dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                    </dropdown>

                    <!--
                    <o-dropdown class="up ml-3" v-if="selectedMedia.length">
                        <span class="button button-grey" slot="button">
                            <span class="font-normal normal-case">
                                {{ selectedMediaLabel }}
                            </span>

                            <span class="icon">
                                <icon icon="angle-up"></icon>
                            </span>
                        </span>
                        
                        <a
                            :key="file.id"
                            class="dropdown-item flex items-center"
                            v-for="file in selectedMedia"
                        >
                            <span class="flex-grow truncate">{{ file.name }}</span>

                            <a
                                class="icon flex-no-shrink ml-2"
                                @click.stop="removeSelectedMedia({
                                    pickerId: pickerId,
                                    id: file.id
                                })"
                            >
                                <icon :icon="['far', 'times-circle']"></icon>
                            </a>
                        </a>

                        <div class="dropdown-divider" v-if="selectedMedia.length"></div>

                        <a class="dropdown-item" @click="clearSelectedMedia">
                            Clear all selected files
                        </a>
                    </o-dropdown>

                    <span class="button static font-normal normal-case ml-3" v-else>
                        {{ selectedMediaLabel }}
                    </span>
                    -->
                </div>
                
                <div class="mm-manger-actions">
                    <a
                        v-if="limit !== 0"
                        class="mm-button mm-button-confirm"
                        @click="confirm" 
                        :disabled="insertIsDisabled"
                    >Insert</a>
               
                    <a class="button" @click="cancel">
                        {{ limit === 0 ? 'Close' : 'Cancel' }}
                    </a>
                </div>

                <upload ref="upload"></upload>
            </footer>
        </div>

        <!-- <move ref="move"></move>
        <manage-media ref="manageMedia"></manage-media>
        <manage-folder ref="manageFolder"></manage-folder> -->

        <!-- <o-confirmation
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
        </o-confirmation> -->
    </modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    // Components
    import Dropdown from './ui/Dropdown';
    import Modal from './ui/Modal';

    import ManageFolder from './ManageFolder';
    import ManageMedia from './ManageMedia';
    import Move from './Move';
    import Upload from './Upload';

    export default {
        components: {
            Dropdown,
            Modal,

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
                pickerId: 'mediaManager/pickerId',
                // acceptedExtensions: 'mediaManager/acceptedExtensions',

                currentMedia: 'mediaManager/currentMedia',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                getSelectedMedia: 'mediaManager/selectedMedia',
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

            selectedMedia() {
                return this.pickerId ? this.getSelectedMedia(this.pickerId) : [];
            },

            selectedMediaCount() {
                return this.selectedMedia.length;
            },

            selectedMediaLabel() {
                if (this.limit) {
                    return this.selectedMediaCount + 
                        ' of ' + this.limit +
                        ' file' + ((this.limit !== 1) ? 's' : '') +
                        ' selected';
                }

                return this.selectedMediaCount +
                    ' file' + ((this.selectedMediaCount !== 1) ? 's' : '') +
                    ' selected';
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
                return this.limitIsExceeded || ! (this.focusedMediaIds.length || this.selectedMediaCount);
            }
        },

        watch: {
            activeFolderId() {
                this.clearFocused();
                this.getMediaAndFolders();
            }
        },

        methods: {
            ...mapActions({
                reset: 'mediaManager/reset',
                close: 'mediaManager/close',

                getMediaAndFolders: 'mediaManager/getMediaAndFolders',
                deleteFocusedItems: 'mediaManager/deleteFocusedItems',
                
                selectMedia: 'mediaManager/selectMedia',
                removeSelectedMedia: 'mediaManager/removeSelectedMedia'
            }),

            ...mapMutations({
                close: 'mediaManager/close',

                focusMedia: 'mediaManager/focusMedia',
                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
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
                    this.reset();
                    this.close();
                }
            },

            cancel() {
                this.clearFocused();
                this.close();
            }
        }
    }
</script>

<style lang="scss" scoped>
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
