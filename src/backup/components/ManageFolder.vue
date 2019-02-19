<template>
    <o-modal :active="isActive" @close="close">
        <div class="modal-content bg-white rounded max-w-md">
            <header class="flex flex-no-shrink justify-between items-center bg-grey-lighter border-b border-grey-light rounded-t px-6 py-4">
                <h4 class="title">{{ title }}</h4>

                <a class="icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>
            
            <section class="bg-white px-6 py-8">
                <o-errors v-if="anyErrors" class="mb-2" :errors="errors"></o-errors>

                <o-form-field input="name" label="Folder Name" required>
                    <o-input
                        id="name"
                        ref="name"
                        v-model="form.name"
                        required
                        :disabled="form.processing"
                        @keydown.enter.prevent.native="submit"
                    ></o-input>
                </o-form-field>
            </section>

            <footer class="flex flex-no-shrink justify-end items-center bg-grey-lighter border-t border-grey-light rounded-b px-6 py-4">
                <a
                    class="button button-green"
                    @click="submit"
                    :class="{ 'loading': isProcessing }"
                    :disabled="isProcessing"
                >Save</a>
                
                <a class="button ml-3" @click="close">Cancel</a>
            </footer>
        </div>
    </o-modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import formMixin from '../mixins/form';

    const initialValues = function () {
        return {
            id: null,
            parent_id: null,
            name: ''
        }
    };

    export default {
        mixins: [ formMixin ],

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
                this.$nextTick(() => this.$refs.name.$el.focus());
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
