<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-confirmation">
            <div class="mm-confirmation-content">
                Are you sure you want to delete

                <strong v-if="folderCount">
                    {{ folderCount }} folder{{ folderCount > 1 ? 's' : null }}
                </strong>

                <template v-if="folderCount && mediaCount">
                    and
                </template>

                <strong v-if="mediaCount">
                    {{ mediaCount }} media item{{ mediaCount > 1 ? 's' : null }}
                </strong>
            </div>

            <div class="mm-confirmation-buttons">
                <a class="mm-button is-danger" @click="confirm">
                    Delete
                </a>

                <a class="mm-button" @click="close">
                    Cancel
                </a>
            </div>
        </div>
    </modal>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex';

    import Modal from './Modal';

    export default {
        components: { Modal },

        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/confirmationIsOpen',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                focusedFolderIds: 'mediaManager/focusedFolderIds'
            }),

            mediaCount() {
                return this.focusedMediaIds.length;
            },

            folderCount() {
                return this.focusedFolderIds.length;
            }
        },

        methods: {
            ...mapActions({
                deleteFocusedItems: 'mediaManager/deleteFocusedItems'
            }),

            ...mapMutations({
                close: 'mediaManager/closeConfirmation'
            }),

            confirm() {
                this.deleteFocusedItems();
                this.close();
            }
        }
    }
</script>
