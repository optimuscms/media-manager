<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-manager">
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

                    <a class="mm-dropdown-item" @click="openMediaMover">
                        <span class="mm-icon">
                            <icon icon="reply"></icon>
                        </span>

                        <span>Move</span>
                    </a>

                    <div class="mm-dropdown-divider"></div>

                    <a class="mm-dropdown-item mm-text-danger" @click="openConfirmation">
                        <span class="mm-icon">
                            <icon icon="trash"></icon>
                        </span>

                        <span>Delete</span>
                    </a>
                </dropdown>
            </header>

            <section
                class="mm-modal-content is-media-manager"
                :class="{ 'loading': isLoading }"
                @click="clearFocused"
            >
                <folders></folders>
                <media></media>
            </section>
            
            <footer class="mm-modal-footer">
                <div class="mm-button-group">
                    <dropdown class="up">
                        <a slot="button" class="mm-button">
                            <span>New</span>

                            <span class="mm-icon">
                                <icon icon="angle-up"></icon>
                            </span>
                        </a>

                        <a class="mm-dropdown-item" @click="openFolderManager()">New Folder</a>
                        <a class="mm-dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                    </dropdown>

                    <dropdown class="up" v-if="selectedMedia.length">
                        <span class="mm-button is-selected-items" slot="button">
                            <span>{{ selectedMediaLabel }}</span>

                            <span class="icon">
                                <icon icon="angle-up"></icon>
                            </span>
                        </span>
                        
                        <a :key="file.id" class="mm-dropdown-item" v-for="file in selectedMedia">
                            <span>{{ file.name }}</span>

                            <a
                                class="mm-icon"
                                @click.stop="removePickerMediaItem({
                                    pickerId: pickerId,
                                    id: file.id
                                })"
                            >
                                <icon :icon="['far', 'times-circle']"></icon>
                            </a>
                        </a>

                        <div class="mm-dropdown-divider" v-if="selectedMedia.length"></div>

                        <a class="mm-dropdown-item" @click="clearPickerMedia(pickerId)">
                            Clear all selected files
                        </a>
                    </dropdown>

                    <span class="mm-button is-selected-info" v-else>
                        {{ selectedMediaLabel }}
                    </span>
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

                <media-uploader ref="upload"></media-uploader>
            </footer>
        </div>

        <media-editor></media-editor>
        <folder-manager></folder-manager>
        <media-mover></media-mover>
        <confirmation></confirmation>
    </modal>
</template>

<script>
    // todo dont allowed media which isn't in the accepted extensions to be selected
    // todo move modal

    import { mapGetters, mapMutations, mapActions } from 'vuex';

    // Components
    import Breadcrumb from './ui/Breadcrumb';
    import Confirmation from './ui/Confirmation';
    import Dropdown from './ui/Dropdown';
    import Modal from './ui/Modal';

    import Folders from './partials/Folders';
    import Media from './partials/Media';
    import FolderManager from './FolderManager';
    import MediaEditor from './MediaEditor';
    import MediaMover from './MediaMover';
    import MediaUploader from './MediaUploader';

    export default {
        components: {
            Breadcrumb,
            Confirmation,
            Dropdown,
            Modal,

            Folders,
            Media,
            FolderManager,
            MediaEditor,
            MediaMover,
            MediaUploader
        },

        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/isOpen',
                isLoading: 'mediaManager/isLoading',
                limit: 'mediaManager/limit',
                pickerId: 'mediaManager/pickerId',

                currentMedia: 'mediaManager/currentMedia',
                selectableMediaIds: 'mediaManager/selectableMediaIds',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                getSelectedMedia: 'mediaManager/selectedMedia',
                selectedMediaIds: 'mediaManager/selectedMediaIds',
                activeFolderId: 'mediaManager/activeFolderId',
                currentFolders: 'mediaManager/currentFolders',
                focusedFolderIds: 'mediaManager/focusedFolderIds',
                acceptedExtensions: 'mediaManager/acceptedExtensions'
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

            newlySelectedMedia() {
                return this.focusedMediaIds.filter(id => {
                    return ! this.selectedMediaIds.includes(id)
                        && this.selectableMediaIds.includes(id)
                });
            },

            limitIsExceeded() {
                if (this.limit) {
                    return (this.selectedMediaCount + this.newlySelectedMedia.length) > this.limit;
                }

                return false;
            },

            insertIsDisabled() {
                return this.limitIsExceeded || ! (this.newlySelectedMedia.length || this.selectedMediaCount);
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
                selectMedia: 'mediaManager/selectMedia',
                removePickerMediaItem: 'mediaManager/removePickerMediaItem',
                openMediaEditor: 'mediaManager/openMediaEditor',
                openFolderManager: 'mediaManager/openFolderManager'
            }),

            ...mapMutations({
                close: 'mediaManager/close',
                clearPickerMedia: 'mediaManager/clearPickerMedia',
                clearFocusedMediaIds: 'mediaManager/clearFocusedMediaIds',
                clearFocusedFolderIds: 'mediaManager/clearFocusedFolderIds',
                openMediaMover: 'mediaManager/openMediaMover',
                openConfirmation: 'mediaManager/openConfirmation'
            }),

            edit() {
                if (this.focusedItemCount === 1) {
                    if (this.focusedMediaIds.length) {
                        let media = this.currentMedia.find(({ id }) => {
                            return id === this.focusedMediaIds[0];
                        });

                        this.openMediaEditor(media);
                    } else {
                        let folder = this.currentFolders.find(({ id }) => {
                            return id === this.focusedFolderIds[0];
                        });

                        this.openFolderManager(folder);
                    }
                }
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
