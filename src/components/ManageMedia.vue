<template>
    <modal class="is-default" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Media Properties</p>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body">
                <template v-if="media">
                    <div class="columns is-gapless" v-if="isImage(media.extension)">
                        <div class="column is-narrow is-media-image">
                            <img :src="media.url" :alt="media.name">
                        </div>

                        <div class="column">
                            <div class="pl-4">                                
                                <div class="field">
                                    <label for="name" class="label">Media name</label>

                                    <div class="control">
                                        <input
                                            id="name"
                                            ref="name"
                                            type="text"
                                            class="input"
                                            v-model="media.name"
                                            @keydown.enter.prevent="save"
                                        >
                                    </div>
                                </div>

                                <div class="field">
                                    <label for="alt" class="label">Alt text</label>

                                    <div class="control">
                                        <input
                                            id="alt"
                                            type="text"
                                            class="input"
                                            @keydown.enter.prevent="save"
                                        >
                                    </div>
                                </div>

                                <div class="field">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <template v-else>
                        <div class="field">
                            <label for="name" class="label">Media Name</label>

                            <div class="control">
                                <input ref="name"
                                    id="name"
                                    type="text"
                                    class="input"
                                    v-model="media.name"
                                    @keydown.enter.prevent="save"
                                >
                            </div>
                        </div>

                        <div class="field">
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
                        </div>
                    </template>
                </template>
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
    import { mapGetters, mapMutations } from 'vuex';
    import Modal from '@optimuscms/ui/src/components/ui/Modal';

    export default {
        components: {
            Modal
        },

        data() {
            return {
                isActive: false,
                isSaving: false,

                media: null
            }
        },

        computed: {
            ...mapGetters({
                isImage: 'media/isImage'
            }),
        },

        methods: {
            ...mapMutations({
                updateActiveMedia: 'media/updateActiveMedia'
            }),

            save() {
                this.isSaving = true;

                let properties = {
                    name: this.media.name
                }

                axios.patch('/api/media/' + this.media.id, properties).then(() => {
                    this.updateActiveMedia({
                        id: this.media.id,
                        properties
                    });
    
                    this.$emit('updated', this.media.id, properties);

                    this.isSaving = false;
                    this.close();
                });
            },

            open(media) {
                this.media = media;
                
                this.isActive = true;
                this.$nextTick(() => this.$refs.name.focus());
            },

            close() {
                this.media = null;
                this.isActive = false;
                this.isSaving = false;
            }
        }
    }
</script>
