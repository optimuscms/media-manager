<template>
    <modal :active="isActive" @close="close">
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
                isActive: false,

                title: 'Create Folder',
                method: 'post',
                action: '/admin/media-folders',

                form: initialValues()
            }
        },

        computed: {
            ...mapGetters({
                activeFolderId: 'mediaManager/activeFolderId'
            }),

            editing() {
                return !! this.form.id;
            }
        },

        watch: {
            editing(editing) {
                if (editing) {
                    this.title = 'Edit Folder';
                    this.method = 'patch';
                    this.action = '/admin/media-folders/' + this.form.id;
                }
            }
        },

        methods: {
            ...mapMutations({
                addFolder: 'mediaManager/addFolder',
                updateFolder: 'mediaManager/updateFolder',
            }),

            open(folder) {
                this.form = {
                    id: folder ? folder.id : null,
                    parent_id: this.activeFolderId,
                    name: folder ? folder.name : '',
                };
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.focus());
            },

            onSuccess(response) {
                if (this.editing) {
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
            },

            close() {
                this.form = initialValues();
                this.isActive = false;
            }
        }
    }
</script>
