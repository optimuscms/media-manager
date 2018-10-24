<template>
    <o-modal :active="isActive" @close="close">
        <div class="modal-content bg-white rounded max-w-lg">
            <header class="flex flex-no-shrink justify-between items-center bg-grey-lighter border-b border-grey-light rounded-t px-6 py-4">
                <h4 class="title">Media Properties</h4>

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

                <template v-if="media">
                    <div class="flex" v-if="isImage(media.extension)">
                        <div class="w-1/3">
                            <img :src="media.url" :alt="media.name">
                        </div>

                        <div class="w-2/3">
                            <div class="pl-8">
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
