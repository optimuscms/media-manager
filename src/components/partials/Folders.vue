<template>
    <div v-if="currentFolders.length">
        <h2 class="mm-title">
            Folders
        </h2>

        <div class="mm-folders">
            <div
                v-for="folder in currentFolders"
                :key="folder.id"
                class="mm-folder"
                :class="{ 'focused': focusedFolderIds.includes(folder.id) }"
            >
                <a
                    title="Open folder"
                    class="mm-folder-detail"
                    @click="openFolder(folder)"
                >
                    <span class="mm-icon">
                        <icon icon="folder" size="lg" />
                    </span>

                    <span>{{ folder.name }}</span>
                </a>

                <a
                    title="Select folder"
                    class="mm-folder-select"
                    @click.stop="focusFolder(folder.id)"
                >
                    <span class="mm-icon">
                        <icon icon="crosshairs" />
                    </span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            currentFolders: 'mediaManager/currentFolders',
            focusedFolderIds: 'mediaManager/focusedFolderIds',
        }),
    },

    methods: {
        ...mapMutations({
            focusFolder: 'mediaManager/focusFolder',
            openFolder: 'mediaManager/openFolder',
        }),
    },
};
</script>
