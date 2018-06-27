<template>
    <modal class="is-default" :active="isActive" @close="close">
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Edit Media</p>
                <a class="delete" @click="close"></a>
            </header>

            <section class="modal-card-body">
                <template v-if="media">
                    <div class="columns" v-if="isImage(media.extension)">
                        <div class="column is-narrow is-media-image">
                            <img :src="media.url" :alt="media.name">
                        </div>

                        <div class="column">                            
                            <div class="field">
                                <label for="name" class="label">Media Name</label>

                                <div class="control">
                                    <input
                                        ref="name"
                                        id="name"
                                        type="text"
                                        class="input"
                                        v-model="media.name"
                                        @keydown.enter.prevent="save"
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="field" v-else>
                        <label for="name" class="label">Media Name</label>

                        <div class="control">
                            <input ref="name"
                                type="text"
                                id="name"
                                class="input"
                                v-model="media.name"
                                @keydown.enter.prevent="save"
                            >
                        </div>
                    </div>
                </template>
            </section>

            <footer class="modal-card-foot">
                <a
                    class="button is-success"
                    @click="save"
                    :disabled="isSaving"
                    :class="{ 'is-loading': isSaving }"
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
