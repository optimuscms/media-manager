<template>
    <o-modal class="is-default" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Media Properties</p>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body">
                <o-errors
                    v-if="form.errors.any()"
                    class="mb-2"
                    :errors="form.errors.all()"
                ></o-errors>

                <template v-if="media">
                    <div class="columns is-gapless" v-if="isImage(media.extension)">
                        <div class="column is-narrow is-media-image">
                            <img :src="media.url" :alt="media.name">
                        </div>

                        <div class="column">
                            <div class="pl-4">
                                <!-- Media name -->
                                <o-form-field input="name" label="Media name" required>
                                    <o-input
                                        id="name"
                                        ref="name"
                                        v-model="form.name"
                                        required
                                        @keydown.enter.prevent.native="save"
                                    ></o-input>
                                </o-form-field>

                                <!-- Alt text -->
                                <o-form-field input="name" label="Alt text">
                                    <o-input
                                        id="alt"
                                        v-model="form.alt"
                                        @keydown.enter.prevent.native="save"
                                    ></o-input>
                                </o-form-field>

                                <!-- <div class="field">
                                    <div class="control">
                                        <div class="content">
                                            <hr>

                                            <p>
                                                <strong>Details</strong>
                                            </p>

                                            <p>
                                                <i><strong>Dimensions:</strong> 1940 x 1000px</i><br>
                                                <i><strong>File size:</strong> 1.4mb</i>
                                            </p>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                    
                    <template v-else>
                        <!-- Media name -->
                        <o-form-field input="name" label="Media name" required>
                            <o-input
                                id="name"
                                ref="name"
                                v-model="form.name"
                                required
                                @keydown.enter.prevent.native="save"
                            ></o-input>
                        </o-form-field>

                        <!-- <div class="field">
                            <div class="control">
                                <div class="content">
                                    <hr>

                                    <p>
                                        <strong>Details</strong>
                                    </p>

                                    <p>
                                        <i>
                                            <strong>View:</strong>
                                            <a :href="media.url" target="_blank">{{ media.name }}</a>
                                        </i><br>
                                        
                                        <i><strong>File size:</strong> 1.4mb</i>
                                    </p>
                                </div>
                            </div>
                        </div> -->
                    </template>
                </template>
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
    import { mapGetters, mapMutations } from 'vuex';
    import Form from 'form-backend-validation';

    export default {
        data() {
            return {
                isActive: false,
                media: {},

                form: new Form({
                    id: null,
                    name: ''
                }, { resetOnSuccess: false })
            }
        },

        computed: {
            ...mapGetters({
                activeFolderId: 'mediaManager/activeFolderId',
                isImage: 'mediaManager/isImage'
            }),
        },

        methods: {
            ...mapMutations({
                updateMedia: 'mediaManager/updateMediaItem',
                updateActiveMedia: 'mediaManager/updateActiveMedia'
            }),

            open(media) {
                this.media = media;

                this.form.populate({
                    id: this.media.id,
                    name: this.media.name
                });
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.$el.focus());
            },

            save() {
                this.form.patch('/api/media/' + this.form.id)
                    .then(response => {
                        let properties = {
                            name: this.form.name
                        };

                        this.updateMedia({
                            folder: this.activeFolderId,
                            id: this.form.id,
                            properties
                        });

                        this.updateActiveMedia({
                            id: this.form.id,
                            properties
                        });

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
