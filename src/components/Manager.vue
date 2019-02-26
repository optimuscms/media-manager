<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-manager">
            <header class="mm-modal-header">
                <breadcrumb></breadcrumb>

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
                class="mm-modal-content is-manager"
                :class="{ 'loading': isLoading }"
                @click="clearFocused"
            >
                <folders></folders>

                <media></media>

                <div class="mm-notification" v-if="! currentMedia.length">
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

                    <!-- <dropdown class="mm-manager-selected-items up" v-if="selectedMedia.length">
                        <span class="mm-button mm-button-selected-items" slot="button">
                            <span>{{ selectedMediaLabel }}</span>

                            <span class="icon">
                                <icon icon="angle-up"></icon>
                            </span>
                        </span>
                        
                        <a
                            :key="file.id"
                            class="mm-dropdown-item"
                            v-for="file in selectedMedia"
                        >
                            <span>{{ file.name }}</span>

                            <a
                                class="mm-icon"
                                @click.stop="removeSelectedMedia({
                                    pickerId: pickerId,
                                    id: file.id
                                })"
                            >
                                <icon :icon="['far', 'times-circle']"></icon>
                            </a>
                        </a>

                        <div class="mm-dropdown-divider" v-if="selectedMedia.length"></div>

                        <a class="mm-dropdown-item" @click="clearSelectedMedia">
                            Clear all selected files
                        </a>
                    </dropdown>

                    <span class="mm-manager-selected-info" v-else>
                        {{ selectedMediaLabel }}
                    </span> -->
                </div>
                
                <div class="mm-button-group">
                    <a
                        v-if="limit !== 0"
                        class="mm-button is-confirm"
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

        <!-- <move ref="move"></move> -->
        <!-- <manage-media ref="manageMedia"></manage-media> -->
        <manage-folder ref="manageFolder"></manage-folder>

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
    import Breadcrumb from './ui/Breadcrumb';
    import Dropdown from './ui/Dropdown';
    import Modal from './ui/Modal';

    import Folders from './Folders';
    import Media from './Media';
    import ManageFolder from './ManageFolder';
    import ManageMedia from './ManageMedia';
    import Move from './Move';
    import Upload from './Upload';

    export default {
        components: {
            Breadcrumb,
            Dropdown,
            Modal,

            Folders,
            Media,
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
                focusedFolderIds: 'mediaManager/focusedFolderIds'
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

                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
                clearSelectedMedia: 'mediaManager/clearSelectedMedia',

                clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds'
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
