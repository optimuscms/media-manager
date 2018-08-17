<template>
    <li :class="{ 'is-active': isActive, 'is-selected': isSelected }" v-if="isOpen && isNotExcluded">
        <a @click="select">
            <span>{{ folder.name }}</span>
            
            <span class="icon" v-if="hasChildren">
                <icon :icon="getIcon(folder)"></icon>
            </span>
        </a>

        <ul v-if="hasChildren">
            <move-folder
                :key="child.id"
                :folder="child"
                v-for="child in folders[folder.id]"
            ></move-folder>
        </ul>
    </li>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: 'move-folder',
        
        props: {
            folder: Object
        },

        computed: {
            ...mapGetters({
                folders: 'mediaManager/getMoveFolders',
                open: 'mediaManager/getMoveOpenFolders',
                exculded: 'mediaManager/getMoveExcludedFolders'
            }),

            isOpen() {
                if (
                    this.open.includes(this.folder.id)
                    || this.open[this.open.length - 1] === this.folder.parent_id
                    || (! this.open.length && this.folder.parent_id === null)
                ) {
                    return true;
                }

                return false;
            },

            isActive() {
                return this.open.length && this.open[this.open.length - 1] === this.folder.id;
            },

            isSelected() {
                return this.open.includes(this.folder.id) && this.open[this.open.length - 1] !== this.folder.id;
            },

            isNotExcluded() {
                return ! this.exculded.includes(this.folder.id);
            },

            hasChildren() {
                return this.folders.hasOwnProperty(this.folder.id);
            }
        },

        methods: {
            ...mapMutations({
                addOpenFolder: 'mediaManager/addMoveOpenFolder'
            }),

            select() {
                this.addOpenFolder(this.folder.id);
            },

            getIcon(folder) {
                if (this.open.includes(folder.id)) {
                    return 'minus';
                } else if (folder.parent_id === null) {
                    return 'plus';
                }

                return 'angle-right';
            }
        }
    }
</script>
