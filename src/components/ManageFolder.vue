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
                <o-errors
                    v-if="form.errors.any()"
                    class="mb-2"
                    :errors="form.errors.all()"
                ></o-errors>

                <o-form-field input="name" label="Folder Name" required>
                    <o-input
                        id="name"
                        ref="name"
                        v-model="form.name"
                        required
                        :disabled="form.processing"
                        @keydown.enter.prevent.native="save"
                    ></o-input>
                </o-form-field>
            </section>

            <footer class="flex flex-no-shrink justify-end items-center bg-grey-lighter border-t border-grey-light rounded-b px-6 py-4">
                <a
                    class="button button-green"
                    @click="save"
                    :class="{ 'loading': form.processing }"
                    :disabled="form.processing"
                >Save</a>
                
                <a class="button ml-3" @click="close">Cancel</a>
            </footer>
        </div>
    </o-modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';
    import Form from 'form-backend-validation';

    export default {
        data() {
            return {
                isActive: false,

                title: 'Create Folder',
                method: 'post',
                action: '/api/media-folders',

                form: new Form({
                    id: null,
                    parent_id: null,
                    name: ''
                }, { resetOnSuccess: false })
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
                    this.action = '/api/media-folders/' + this.form.id;
                }
            }
        },

        methods: {
            ...mapMutations({
                addFolder: 'mediaManager/addFolder',
                updateFolder: 'mediaManager/updateFolder',
            }),

            open(folder) {
                this.form.populate({
                    id: folder ? folder.id : null,
                    parent_id: this.activeFolderId,
                    name: folder ? folder.name : '',
                });
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.$el.focus());
            },

            save() {
                this.form[this.method](this.action)
                    .then(response => {
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
                                folder: response.data
                            });
                        }

                        this.close();
                    });
            },

            close() {
                this.form.reset();
                this.isActive = false;
            }
        }
    }
</script>
