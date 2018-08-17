<template>
    <o-modal class="is-default" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body">
                <o-errors
                    v-if="form.errors.any()"
                    class="mb-2"
                    :errors="form.errors.all()"
                ></o-errors>

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="name" class="label">Folder Name</label>
                    </div>

                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <o-input
                                    id="name"
                                    ref="name"
                                    v-model="form.name"
                                    :disabled="form.processing"
                                    @keydown.enter.prevent.native="save"
                                ></o-input>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="modal-card-foot">
                <a
                    class="button is-success"
                    @click="save"
                    :class="{ 'is-loading': form.processing }"
                    :disabled="form.processing"
                >Save</a>
                
                <a class="button" @click="close">Cancel</a>
            </footer>
        </div>
    </o-modal>
</template>

<script>
    import Form from 'form-backend-validation';

    export default {
        props: {
            parent: {
                type: Number,
                default: 0
            }
        },

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
            open(folder) {
                if (folder) {
                    this.form.populate({
                        id: folder.id,
                        parent_id: this.parent,
                        name: folder.name
                    });
                }
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.$el.focus());
            },

            save() {
                this.form[this.method](this.action)
                    .then(response => {
                        if (this.editing) {
                            this.$emit('updated', this.form.id, {
                                name: this.form.name
                            });
                        } else {
                            this.$emit('created', response.data);
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
