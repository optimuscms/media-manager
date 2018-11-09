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
                <o-errors v-if="anyErrors" class="mb-2" :errors="errors"></o-errors>
                
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
                                        @keydown.enter.prevent.native="submit"
                                    ></o-input>
                                </o-form-field>

                                <!-- Alt text -->
                                <o-form-field input="name" label="Alt text">
                                    <o-input
                                        id="alt"
                                        v-model="form.alt"
                                        @keydown.enter.prevent.native="submit"
                                    ></o-input>
                                </o-form-field>
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
                                @keydown.enter.prevent.native="submit"
                            ></o-input>
                        </o-form-field>
                    </template>
                </template>
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
            name: ''
        }
    };

    export default {
        mixins: [ formMixin ],

        data() {
            return {
                isActive: false,
                media: {},

                method: 'patch',
                form: initialValues()
            }
        },

        computed: {
            ...mapGetters({
                activeFolderId: 'mediaManager/activeFolderId',
                isImage: 'mediaManager/isImage'
            }),

            action() {
                return '/api/media/' + this.form.id;
            }
        },

        methods: {
            ...mapMutations({
                updateMedia: 'mediaManager/updateMediaItem',
                updateActiveMedia: 'mediaManager/updateActiveMedia'
            }),

            open(media) {
                this.media = media;

                this.form = {
                    id: this.media.id,
                    name: this.media.name
                };
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.$el.focus());
            },

            onSuccess() {
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
            },

            close() {
                this.form = initialValues();
                this.isActive = false;
            }
        }
    }
</script>
