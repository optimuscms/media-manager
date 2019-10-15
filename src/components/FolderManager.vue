<template>
    <modal class="mm-folder-manager" :active="isOpen" @close="close">
        <form class="mm-modal-wrap" @submit.prevent="submit">
            <a class="mm-folder-manager-close mm-icon" @click="close">
                <icon icon="times" />
            </a>

            <errors v-if="anyErrors" :errors="errors" />

            <div class="mm-field">
                <div class="mm-control">
                    <input
                        id="mm_folder_name"
                        ref="name"
                        v-model="form.name"
                        type="text"
                        class="mm-input"
                        required
                        placeholder="Folder Name *"
                        :disabled="form.processing"
                    >
                </div>
            </div>

            <div class="mm-field">
                <button
                    class="mm-button confirm"
                    :class="{ 'loading': isProcessing }"
                    :disabled="isProcessing"
                >
                    Save
                </button>
            </div>
        </form>
    </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { actions as apiActions } from '../index';
import formMixin from '../mixins/form';

import Errors from './ui/Errors.vue';
import Modal from './ui/Modal.vue';

const initialValues = () => {
    return {
        parent_id: null,
        name: '',
    };
};

export default {
    components: {
        Errors,
        Modal,
    },

    mixins: [ formMixin ],

    data() {
        return {
            form: initialValues(),
        };
    },

    computed: {
        ...mapGetters({
            isOpen: 'mediaManagerFolders/modalIsVisible',
            currentFolder: 'mediaManagerFolders/currentFolder',
        }),
    },

    watch: {
        isOpen(isOpen) {
            if (isOpen) {
                this.form = {
                    id: this.item ? this.item.id : null,
                    parent_id: this.item ? this.item.parent_id : this.currentFolder.id,
                    name: this.item ? this.item.name : '',
                };

                this.$nextTick(() => this.$refs.name.focus());
            } else {
                this.form = initialValues();
                this.clearManagedFolder();
            }
        },
    },

    methods: {
        ...mapActions({
            close: 'mediaManagerFolders/hideModal',
            addFolder: 'mediaManagerFolders/addFolder',
            updateFolder: 'mediaManagerFolders/updateFolder',
            clearManagedFolder: 'mediaManagerFolders/clearManagedFolder',
        }),

        save() {
            if (this.isEditing) {
                return apiActions.updateFolder(this.item.id, this.form);
            }

            return apiActions.createFolder(this.form);
        },

        onSuccess(folder) {
            if (this.isEditing) {
                this.updateFolder({
                    id: this.item.id,
                    folder,
                });
            } else {
                this.addFolder(folder);
            }

            this.close();
        },
    },
};
</script>
