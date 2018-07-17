<template>
    <media-modal class="is-media-manager" :active="isOpen" @close="close">
        <div class="modal-card">
            <header class="modal-card-head is-block">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <nav class="breadcrumb">
                                <ul>
                                    <li
                                        :key="folder.id"
                                        v-for="folder in folders.open"
                                        :class="{ 'is-active': folder.id === activeFolder }"
                                    >
                                        <a @click="openFolder(folder)">{{ folder.name }}</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div class="level-right" v-if="numberOfFocusedItems">
                        <div class="level-item">
                            <dropdown class="is-right">
                                <a slot="button" class="icon">
                                    <icon icon="ellipsis-h" size="lg"></icon>
                                </a>

                                <a class="dropdown-item" v-if="numberOfFocusedItems === 1" @click="edit">
                                    <span class="icon">
                                        <icon icon="pencil-alt"></icon>
                                    </span>

                                    <span>Edit</span>
                                </a>

                                <a class="dropdown-item" @click="openMoveModal">
                                    <span class="icon">
                                        <icon icon="reply"></icon>
                                    </span>

                                    <span>Move</span>
                                </a>

                                <div class="dropdown-divider"></div>

                                <a
                                    class="dropdown-item text-has-icon has-text-danger"
                                    @click="$refs.confirm.open({
                                        folders: folders.focused.length,
                                        media: media.focused.length
                                    })"
                                >
                                    <span class="icon">
                                        <icon icon="trash"></icon>
                                    </span>

                                    <span>Delete</span>
                                </a>
                            </dropdown>
                        </div>
                    </div>
                </div>
            </header>

            <section class="modal-card-body" @click="clearFocused" :class="{ 'is-loading': isLoading }">
                <!-- Folders -->
                <template v-if="folders.all.length">
                    <h2 class="title">Folders</h2>

                    <div class="folders-holder field is-grouped is-grouped-multiline">
                        <div class="control" :key="folder.id" v-for="folder in folders.all">
                            <div class="field has-addons">
                                <div class="control">
                                    <a
                                        class="button is-folder"
                                        :class="{ 'is-focused': folders.focused.includes(folder.id) }"
                                        @click="openFolder(folder)"
                                        title="Open folder"
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
                <template v-if="media.all.length">
                    <h2 class="title">Media</h2>

                    <div class="media-holder">
                        <div
                            class="card"
                            :key="file.id"
                            v-for="file in media.all"
                            :class="{
                                'is-focused': media.focused.includes(file.id),
                                'is-selected': selectedIds.includes(file.id)
                            }"
                            @click.stop="focusMedia(file.id)"
                        >
                            <figure class="image is-4by3" v-if="isImage(file.extension)">
                                <img :src="file.thumbnail_url" :alt="file.name" :title="file.name">
                            </figure>

                            <div class="media-file" v-else>
                                <div class="icon">
                                    <icon :icon="getIcon(file.extension)" size="4x"></icon>
                                </div>
                            </div>

                            <div class="card-content">{{ file.name }}</div>
                        </div>
                    </div>
                </template>

                <notification class="is-info radius-small" :active="! media.all.length" v-else>
                    No media, add new media by clicking the <strong>New</strong> button below.
                </notification>

                <upload ref="upload" :folder="activeFolder" @success="addMedia"></upload>
            </section>

            <footer class="modal-card-foot is-block">
                <div class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <dropdown class="is-up">
                                <a slot="button" class="button is-primary">
                                    <span>New</span>

                                    <span class="icon is-small">
                                        <icon icon="angle-up"></icon>
                                    </span>
                                </a>

                                <a class="dropdown-item" @click="$refs.manageFolder.open()">New Folder</a>
                                <a class="dropdown-item" @click="$refs.upload.focus()">Upload Media</a>
                            </dropdown>
                        </div>

                        <div class="level-item" v-if="numberOfSelectedFiles">
                            <dropdown class="is-up">
                                <a slot="button" class="button is-light">
                                    <span>
                                        <template v-if="limit">
                                            {{ numberOfSelectedFiles }} of {{ limit }} file{{ limit !== 1 ? 's' : null }} selected
                                        </template>

                                        <template v-else>
                                            {{ numberOfSelectedFiles }} file{{ numberOfSelectedFiles !== 1 ? 's' : null }} selected
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
                                        v-for="file in media.selected"
                                    >
                                        <span class="overflow-wrap">{{ file.name }}</span>

                                        <a class="icon" @click.stop="deselectMedia(file.id)">
                                            <icon :icon="['far', 'times-circle']"></icon>
                                        </a>
                                    </div>

                                    <div class="dropdown-divider"></div>

                                    <a class="dropdown-item" @click="clearSelected">
                                        Clear all selected files
                                    </a>
                                </div>
                            </dropdown>
                        </div>
                    </div>

                    <div class="level-right">
                        <div class="level-item">
                            <a
                                @click="confirm" 
                                v-if="limit !== 0"
                                class="button is-success"
                                :disabled="limitExceeded"
                            >Insert</a>

                            <a class="button" @click="cancel">
                                {{ limit === 0 ? 'Close' : 'Cancel' }}
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

        <manage-folder ref="manageFolder"
            :parent="activeFolder"
            @created="addFolder"
            @updated="updateFolder"
        ></manage-folder>

        <manage-media
            ref="manageMedia"
            @updated="updateMedia"
        ></manage-media>

        <move
            ref="move"
            @moved="removeFocusedItems"
        ></move>

        <confirm
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
        </confirm>
    </media-modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    // Components
    import Confirm from '@optimuscms/ui/src/components/ui/Confirm';
    import Dropdown from '@optimuscms/ui/src/components/ui/Dropdown';
    import MediaModal from '@optimuscms/ui/src/components/ui/Modal';
    import Notification from '@optimuscms/ui/src/components/ui/Notification';

    import ManageFolder from './ManageFolder';
    import ManageMedia from './ManageMedia';
    import Move from './Move';
    import Upload from './Upload';

    export default {
        components: {
            Confirm,
            Dropdown,
            ManageFolder,
            ManageMedia,
            MediaModal,
            Move,
            Notification,
            Upload
        },

        data() {
            return {
                isOpen: false,
                isLoading: true,

                limit: null,
                accept: [],

                media: {
                    all: [],
                    focused: [],
                    selected: []
                },

                folders: {
                    all: [],
                    focused: [],
                    open: [{
                        id: null,
                        name: 'Home'
                    }]
                }
            }
        },

        computed: {
            ...mapGetters({
                getIcon: 'media/getIcon',
                isImage: 'media/isImage',
                activeMedia: 'media/getActiveMedia',
            }),

            activeFolder() {
                return this.folders.open[this.folders.open.length - 1].id;
            },

            numberOfFocusedItems() {
                return this.folders.focused.length + this.media.focused.length;
            },

            numberOfSelectedFiles() {
                return this.media.selected.length;
            },

            selectedIds() {
                return this.media.selected.map(item => item.id);
            },

            limitExceeded() {
                if (this.limit) {
                    let selected = this.media.focused.filter(id => ! this.selectedIds.includes(id));
                    
                    return (this.media.selected.length + selected.length) > this.limit;
                }

                return false;
            }
        },

        watch: {
            activeFolder() {
                this.clearFocused();
                this.getMediaAndFolders();
            }
        },

        mounted() {
            eventBus.$on('media-manager-open', this.open);
        },

        beforeDestroy() {
            eventBus.$off('media-manager-open', this.open);
        },

        methods: {
            ...mapMutations({
                addActiveMedia: 'media/addActiveMedia',
                removeActiveMedia: 'media/removeActiveMedia',
                setMoveExcludedFolders: 'media/setMoveExcludedFolders'
            }),

            open({ limit, accept, selected }) {
                this.limit = limit;

                if (this.limit !== 0) {
                    this.accept = accept;
                    this.media.selected = selected.length ? this.activeMedia(selected) : [];
                }

                this.isOpen = true;
                this.getMediaAndFolders();
            },

            getMediaAndFolders() {
                let activeFolder = this.activeFolder || 'root';

                this.isLoading = true;

                axios.all([
                    axios.get('/api/media', { params: { folder: activeFolder }}),
                    axios.get('/api/media-folders', { params: { parent: activeFolder }})
                ]).then(axios.spread((media, folders) => {
                    this.media.all = media.data.data;
                    this.folders.all = folders.data.data;

                    this.isLoading = false;
                }));
            },

            edit() {
                if (this.numberOfFocusedItems === 1) {
                    this.folders.focused.length
                        ? this.editFolder(this.folders.focused[0])
                        : this.editMedia(this.media.focused[0]);
                }
            },

            focusMedia(mediaId) {
                if (! this.media.focused.includes(mediaId)) {
                    this.media.focused.push(mediaId);
                } else {
                    this.media.focused = this.media.focused.filter(id => id !== mediaId);
                }
            },

            focusFolder(folderId) {
                if (! this.folders.focused.includes(folderId)) {
                    this.folders.focused.push(folderId);
                } else {
                    this.folders.focused = this.folders.focused.filter(id => id !== folderId);
                }
            },

            clearFocused() {
                this.media.focused = [];
                this.folders.focused = [];
            },

            removeFocusedItems() {
                this.media.all = this.media.all.filter(({ id }) => {
                    return ! this.media.focused.includes(id);
                });

                this.folders.all = this.folders.all.filter(({ id }) => {
                    return ! this.folders.focused.includes(id);
                });

                this.clearFocused();
            },

            deleteFocusedItems() {
                let mediaIds = this.media.focused;
                let folderIds = this.folders.focused;

                this.removeFocusedItems();
                this.removeActiveMedia(mediaIds);
                
                if (mediaIds.length) {
                    eventBus.$emit('media-deleted', mediaIds);
                    
                    mediaIds.forEach(id => {
                        this.deselectMedia(id);
                        axios.delete('/api/media/' + id);
                    });
                }
                
                if (folderIds.length) {
                    folderIds.forEach(id => {
                        axios.delete('/api/media-folders/' + id);
                    });
                }
            },

            selectMedia() {
                let selected = this.media.focused.filter(id => {
                    return ! this.selectedIds.includes(id);
                });

                if (selected.length) {
                    this.media.selected = this.media.selected.concat(
                        this.media.all.filter(({ id }) => selected.includes(id))
                    );
                }

                this.media.focused = [];
            },

            deselectMedia(mediaId) {
                this.media.selected = this.media.selected.filter(({ id }) => id !== mediaId);
            },

            clearSelected() {
                this.media.selected = [];
            },

            openFolder(folder) {
                let openFolderIds = this.folders.open.map(folder => folder.id);

                if (openFolderIds.includes(folder.id)) {
                    this.folders.open.splice(openFolderIds.findIndex(id => id === folder.id) + 1);
                } else {
                    this.folders.open.push(folder);
                }
            },

            addFolder(folder) {
                if (folder.parent_id === this.activeFolder) {
                    this.folders.all.push(folder);
                }
            },

            editFolder(folderId) {
                let folder = this.folders.all.find(({ id }) => id === folderId);

                this.$refs.manageFolder.open({
                    id: folder.id,
                    name: folder.name
                });
            },

            updateFolder(id, properties) {
                this.folders.all.map(folder => {
                    if (folder.id === id) {
                        Object.entries(properties).forEach(([key, value]) => {
                            folder[key] = value;
                        });
                    }
                });
            },

            addMedia(media) {
                if (this.activeFolder === media.folder_id) {
                    this.media.all.push(media);
                }
            },

            editMedia(mediaId) {
                let media = this.media.all.find(({ id }) => id === mediaId);

                this.$refs.manageMedia.open({
                    id: media.id,
                    name: media.name,
                    url: media.thumbnail_url,
                    extension: media.extension
                });
            },

            updateMedia(id, properties) {
                this.media.all.map(media => {
                    if (media.id === id) {
                        Object.entries(properties).forEach(([key, value]) => {
                            media[key] = value;
                        });
                    }
                });
            },

            openMoveModal() {
                this.setMoveExcludedFolders(this.folders.focused);
                
                this.$refs.move.open({
                    media: this.media.focused,
                    folders: this.folders.focused,
                });
            },

            confirm() {
                if (! this.limitExceeded) {
                    this.selectMedia();
                    this.addActiveMedia(this.media.selected);

                    eventBus.$emit('media-selected', this.selectedIds);

                    this.folders.open = [{
                        id: null,
                        name: 'Home'
                    }];

                    this.clearFocused();
                    this.isOpen = false;
                }
            },

            cancel() {
                this.clearFocused();
                this.close();
            },

            close() {
                eventBus.$emit('media-manager-closed');
                this.isOpen = false;
            }
        }
    }
</script>
