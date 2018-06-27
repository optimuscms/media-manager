<template>
    <modal class="is-default" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ title }}</p>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body">
                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label for="name" class="label">Folder Name</label>
                    </div>

                    <div class="field-body">
                        <div class="field">
                            <div class="control">
                                <input
                                    ref="name"
                                    type="text"
                                    id="name"
                                    class="input"
                                    :disabled="isSaving"
                                    @keydown.enter.prevent="save"
                                    v-model="folder.name"
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="modal-card-foot">
                <a
                    class="button is-success"
                    @click="save"
                    :class="{ 'is-loading': isSaving }"
                    :disabled="isSaving"
                >Save</a>
                
                <a class="button" @click="close">Cancel</a>
            </footer>
        </div>
    </modal>
</template>

<script>
    import Modal from '@optimuscms/ui/src/components/ui/Modal';

    export default {
        components: {
            Modal
        },

        props: {
            parent: {
                type: Number,
                default: 0
            }
        },

        data() {
            return {
                isActive: false,
                isSaving: false,

                folder: {}
            }
        },

        computed: {
            editing() {
                return this.folder.hasOwnProperty('id');
            },

            title() {
                return (this.editing) ? 'Edit Folder' : 'Create Folder';
            }
        },

        methods: {
            save() {
                this.isSaving = true;

                if (this.editing) {
                    axios.patch('/api/media-folders/' + this.folder.id, {
                        parent_id: this.parent,
                        name: this.folder.name
                    }).then(() => {
                        this.$emit('updated', this.folder.id, {
                            name: this.folder.name
                        });

                        this.isSaving = false;
                        this.close();
                    });
                } else {
                    axios.post('/api/media-folders', {
                        parent_id: this.parent,
                        name: this.folder.name
                    }).then(response => {
                        this.$emit('created', response.data.data);
                        
                        this.isSaving = false;
                        this.close();
                    });
                }
            },

            open(folder) {
                this.folder = folder || {};
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.focus());
            },

            close() {
                this.folder = {};
                this.isActive = false;
                this.isSaving = false;
            }
        }
    }
</script>
