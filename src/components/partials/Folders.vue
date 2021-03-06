<template>
    <div class="mm-folders" :class="{ 'open': isVisible }">
        <div class="mm-folders-header">
            <h4 class="mm-folders-title">
                Folders
            </h4>

            <a
                class="mm-folder-hide mm-icon"
                @click="hide"
            >
                <icon icon="times" />
            </a>
        </div>

        <ul class="mm-folders-list" :class="{ 'loading': isLoading }">
            <li v-if="parentFolder" class="mm-folder-back">
                <a class="mm-folder" @click="openFolder(parentFolder.id)">
                    <span class="mm-icon">
                        <icon icon="arrow-left" />
                    </span>

                    <span>
                        {{ parentFolder.name }}
                    </span>
                </a>
            </li>

            <li v-for="folder in childFolders" :key="folder.id">
                <a class="mm-folder" @click="openFolder(folder.id)">
                    <span class="mm-icon">
                        <icon icon="folder" />
                    </span>

                    <span>
                        {{ folder.name }}
                    </span>
                </a>

                <dropdown class="right">
                    <a slot="button" class="mm-icon md">
                        <icon icon="ellipsis-v" size="sm" />
                    </a>

                    <a class="mm-dropdown-item" @click="editFolder(folder)">
                        <span class="mm-icon">
                            <icon icon="pencil-alt" size="sm" />
                        </span>

                        <span>Rename</span>
                    </a>

                    <a
                        class="mm-dropdown-item"
                        @click="openMediaMover({
                            type: 'folder',
                            subject: folder,
                        })"
                    >
                        <span class="mm-icon">
                            <icon icon="reply" size="sm" />
                        </span>

                        <span>Move</span>
                    </a>

                    <div class="mm-dropdown-divider" />

                    <a
                        class="mm-dropdown-item mm-text-danger"
                        @click="openConfirmation({
                            type: 'folder',
                            subject: folder,
                        })"
                    >
                        <span class="mm-icon">
                            <icon icon="trash-alt" size="sm" />
                        </span>

                        <span>Delete</span>
                    </a>
                </dropdown>
            </li>
        </ul>

        <div class="mm-folders-footer">
            <a
                class="mm-folders-create"
                @click="showManageFolderModal"
            >
                <span class="mm-icon">
                    <icon icon="plus" />
                </span>

                <span>
                    Create Folder
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '../../components/ui/Dropdown.vue';

export default {
    components: { Dropdown },

    computed: {
        ...mapGetters({
            childFolders: 'mediaManagerFolders/childFolders',
            parentFolder: 'mediaManagerFolders/parentFolder',
            isVisible: 'mediaManagerFolders/showFoldersPanel',
            isLoading: 'mediaManagerFolders/isLoadingFolders',
            currentFolder: 'mediaManagerFolders/currentFolder',
        }),
    },

    methods: {
        ...mapActions({
            hide: 'mediaManagerFolders/hideFoldersPanel',
            openFolder: 'mediaManagerFolders/openFolder',
            openMediaMover: 'mediaManager/openMediaMover',
            openConfirmation: 'mediaManager/openConfirmation',
            setFolderBeingManaged: 'mediaManagerFolders/setFolderBeingManaged',
            showManageFolderModal: 'mediaManagerFolders/showManageFolderModal',
        }),

        editFolder(folder) {
            this.setFolderBeingManaged(folder);
            this.showManageFolderModal();
        },
    },
};
</script>
