<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-editor">
            <header class="mm-modal-header">
                <h4 class="mm-title">Media Properties</h4>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="mm-modal-content">
                <errors v-if="anyErrors" class="mm-mb-4" :errors="errors"></errors>
                
                <template v-if="media">
                    <div class="mm-media-editor-layout" v-if="isImage(media.extension)">
                        <div class="mm-media-editor-image">
                            <img :src="media.thumbnail_url" :alt="media.name">
                        </div>

                        <div class="mm-media-editor-fields">
                            <!-- Media name -->
                            <div class="mm-field">
                                <label for="mm_media_name" class="mm-label">Media Name *</label>

                                <div class="mm-control">
                                    <input
                                        id="mm_media_name"
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

                            <!-- Alt text -->
                            <div class="mm-field">
                                <label for="mm_media_alt" class="mm-label">Alt text</label>

                                <div class="mm-control">
                                    <input
                                        id="mm_media_alt"
                                        type="text"
                                        class="mm-input"
                                        v-model="form.alt"
                                        :disabled="form.processing"
                                        @keydown.enter.prevent="submit"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <template v-else>
                        <!-- Media name -->
                        <div class="mm-field">
                            <label for="mm_media_name" class="mm-label">Media Name *</label>

                            <div class="mm-control">
                                <input
                                    id="mm_media_name"
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
                    </template>
                </template>
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
                method: 'patch',
                form: initialValues()
            }
        },

        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/mediaEditorIsOpen',
                isImage: 'mediaManager/isImage',

                media: 'mediaManager/mediaEditorItem',
                activeFolderId: 'mediaManager/activeFolderId',
            }),

            action() {
                return '/admin/media/' + this.form.id;
            }
        },

        watch: {
            isOpen(isOpen) {
                if (isOpen) {
                    this.form = {
                        id: this.media.id,
                        name: this.media.name
                    };
                    
                    this.$nextTick(() => this.$refs.name.focus());
                } else {
                    this.form = initialValues();
                }
            }
        },

        methods: {
            ...mapMutations({
                close: 'mediaManager/closeMediaEditor',
                updateMedia: 'mediaManager/updateMediaItem',
                updateSelectedMedia: 'mediaManager/updateSelectedMediaItem',
            }),

            onSuccess() {
                let properties = {
                    name: this.form.name
                };

                this.updateMedia({
                    folder: this.activeFolderId,
                    id: this.form.id,
                    properties
                });

                this.updateSelectedMedia({
                    id: this.form.id,
                    properties
                });

                this.close();
            }
        }
    }
</script>
