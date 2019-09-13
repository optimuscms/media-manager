<template>
    <ul class="mm-breadcrumb">
        <li
            v-for="folder in openFolders"
            :key="folder.id"
            :class="{ 'active': folder.id === activeFolderId }"
        >
            <a @click="openFolder(folder)">{{ folder.name }}</a>
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            openFolders: 'mediaManager/openFolders',
            activeFolderId: 'mediaManager/activeFolderId',
        }),
    },

    methods: {
        ...mapMutations({
            openFolder: 'mediaManager/openFolder',
        }),
    },
};
</script>
