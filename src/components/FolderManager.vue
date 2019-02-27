<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-folder-manager">
            <header class="mm-modal-header">
                <h4 class="mm-title">{{ title }}</h4>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>
            
            <section class="mm-modal-content">
                <errors
                    v-if="anyErrors"
                    class="mm-mb-4"
                    :errors="errors"
                ></errors>

                <div class="mm-field">
                    <label for="mm_folder_name" class="mm-label">Folder Name *</label>

                    <div class="mm-control">
                        <input
                            id="mm_folder_name"
                            ref="name"
                            type="text"
                            class="mm-input"
                            v-model="form.name"
                            required
                            :disabled="form.processing"
                            @keydown.enter.prevent="submit"
                        >
                    </div>
                </div>
            </section>

            <footer class="mm-modal-footer">
                <div class="mm-button-group">
                    <a class="mm-button" @click="close">Cancel</a>

                    <a
                        class="mm-button is-confirm"
                        @click="submit"
                        :class="{ 'loading': isProcessing }"
                        :disabled="isProcessing"
                    >Save</a>
                </div>
            </footer>
        </div>
    </modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import formMixin from '../mixins/form';

    import Errors from './ui/Errors';
    import Modal from './ui/Modal';

    const initialValues = function () {
        return {
            id: null,
            parent_id: null,
            name: ''
        }
    };

    export default {
        mixins: [ formMixin ],

        components: {
            Errors,
            Modal
        },

        data() {
            return {
                form: initialValues()
            }
        },

        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/folderManagerIsOpen',

                folder: 'mediaManager/folderManagerItem',
                activeFolderId: 'mediaManager/activeFolderId'
            }),

            isEditing() {
                return !! this.folder;
            },
            
            title() {
                return this.isEditing ? 'Edit Folder' : 'Create Folder';
            },
            
            method() {
                return this.isEditing ? 'patch' : 'post';
            },
            
            action() {
                return this.isEditing
                    ? '/admin/media-folders/' + this.form.id
                    : '/admin/media-folders';
            }
        },

        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    this.form = {
                        id: this.folder ? this.folder.id : null,
                        parent_id: this.activeFolderId,
                        name: this.folder ? this.folder.name : '',
                    };
                
                    this.$nextTick(() => this.$refs.name.focus());
                } else {
                    this.form = initialValues();
                }
            }
        },

        methods: {
            ...mapMutations({
                close: 'mediaManager/closeFolderManager',
                addFolder: 'mediaManager/addFolder',
                updateFolder: 'mediaManager/updateFolder',
            }),

            onSuccess(response) {
                if (this.isEditing) {
                    this.updateFolder({
                        parent: this.activeFolderId,
                        id: this.form.id,
                        properties: {
                            name: this.form.name
                        }
                    });
                } else {
                    this.addFolder({
                        parent: this.activeFolderId,
                        folder: response.data.data
                    });
                }

                this.close();
            }
        }
    }
</script>
