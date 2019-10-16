<template>
    <ul class="mm-breadcrumb">
        <li
            v-for="folder in openFolders"
            :key="folder.id"
            :class="{ 'active': folder.id === currentFolder.id }"
        >
            <a @click="open(folder)">
                {{ folder.name }}
            </a>
        </li>
    </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            openFolders: 'mediaManagerFolders/openFolders',
            currentFolder: 'mediaManagerFolders/currentFolder',
        }),
    },

    methods: {
        ...mapActions({
            openFolder: 'mediaManagerFolders/openFolder',
        }),

        open(folder) {
            if (this.currentFolder.id !== folder.id) {
                this.openFolder(folder.id);
            }
        },
    },
};
</script>
