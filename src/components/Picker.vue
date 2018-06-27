<template>
    <div class="field" :class="{ 'is-required': required }">
        <label class="label">{{ label }}</label>

        <div class="control">
            <div class="field" v-if="media.length">
                <div class="control">
                    <div class="media-picker is-single-image" v-if="hasPreview">
                        <img :src="firstMedia.url">
                        <a class="picker-clear" @click="remove(firstMedia.id)"></a>
                    </div>

                    <div class="media-picker is-multiple" v-else>
                        <div class="media" :key="media.id" v-for="media in getMedia(media)">
                            <div class="media-left">
                                <div class="icon is-large">
                                    <icon :icon="getIcon(media.extension)" size="2x"></icon>
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

        <slot name="help"></slot>
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
            },

            label: {
                type: String,
                required: true
            },

            required: {
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
                getIcon: 'media/getIcon',
                getMedia: 'media/getActiveMedia',
                imageExtensions: 'media/imageExtensions'
            }),

            firstMedia() {
                return this.getMedia(this.media)[0];
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
                this.$emit('input', (this.limit === 1) ? media[0] : media);
            }
        },

        mounted() {
            this.setMedia(this.value);
        },

        methods: {
            open() {
                eventBus.$emit('open-media-manager', {
                    limit: this.limit,
                    selected: this.media,
                    accept: this.accept ? this.setAccepted(this.accept) : []
                });

                eventBus.$once('update-picker', media => {
                    this.media = media;
                });
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
