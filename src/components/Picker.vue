<template>
    <div class="control">
        <div class="field" v-if="media.length">
            <div class="control">
                <div class="media-picker is-single-image" v-if="hasPreview">
                    <img :src="firstMedia.thumbnail_url">
                    <a class="picker-clear" @click="remove(firstMedia.id)"></a>
                </div>

                <div class="media-picker is-multiple" v-else>
                    <div class="media" :key="media.id" v-for="media in activeMedia(media)">
                        <div class="media-left">
                            <div class="icon is-large">
                                <icon :icon="icon(media.extension)" size="2x"></icon>
                            </div>
                        </div>
                        
                        <div class="media-content">
                            {{ media.name }}
                        </div>

                        <div class="media-right">
                            <a class="delete is-small" @click="remove(media.id)"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field" v-if="! limitMet">
            <div class="file is-light">
                <label class="file-label" @click="open">
                    <span class="file-cta">
                        <span class="file-icon">
                            <icon icon="upload"></icon>
                        </span>

                        <span class="file-label">
                            Choose media…
                        </span>
                    </span>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters} from 'vuex';

    export default {
        props: {
            value: {
                type: [ Array, Number ]
            },

            accept: {
                type: [ Array, String ]
            },

            limit: {
                type: Number,
                default: 1
            },

            preview: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                media: []
            }
        },

        computed: {
            ...mapGetters({
                icon: 'mediaManager/icon',
                activeMedia: 'mediaManager/activeMedia',
                imageExtensions: 'mediaManager/imageExtensions'
            }),

            firstMedia() {
                return this.activeMedia(this.media)[0];
            },

            limitMet() {
                return this.limit === this.media.length;
            },

            hasPreview() {
                return this.limit === 1 && this.preview;
            }
        },

        watch: {
            value(value) {
                this.setMedia(value);
            },

            media(media) {
                let value;
                
                if (this.limit === 1) {
                    value = media.length ? media[0] : null;
                } else {
                    value = media;
                }

                this.$emit('input', value);
            }
        },

        mounted() {
            this.setMedia(this.value);

            this.$mediaManager.onMediaDeleted(mediaIds => {
                this.media = this.media.filter(id => ! mediaIds.includes(id));
            });
        },

        methods: {
            open() {
                this.$mediaManager.open({
                    limit: this.limit,
                    selected: this.media,
                    accept: this.accept ? this.setAccepted(this.accept) : []
                });

                this.$mediaManager.onMediaSelected(this.setMedia);
                this.$mediaManager.onClose(this.setMedia);
            },

            setAccepted(accept) {
                if (accept === 'image') {
                    return this.imageExtensions;
                }

                return Array.isArray(accept) ? accept : [accept];
            },

            setMedia(value) {
                if (value) {
                    this.media = Array.isArray(value) ? value : [value];
                }
            },

            remove(id) {
                this.media = this.media.filter(media => {
                    return media !== id;
                });
            }
        }
    }
</script>
