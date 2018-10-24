<template>
    <div>
        <div class="field" v-if="selectedMediaIds.length">
            <div class="control">
                <div class="media-picker is-single-image" v-if="hasPreview">
                    <img :src="firstMedia.thumbnail_url">
                    <a class="picker-clear" @click="remove(firstMedia.id)"></a>
                </div>

                <div class="media-picker is-multiple" v-else>
                    <div class="media" :key="media.id" v-for="media in activeMedia(selectedMediaIds)">
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
            <div class="button button-grey" @click="open">
                <span class="icon">
                    <icon icon="upload"></icon>
                </span>

                <span class="font-normal normal-case">Choose media…</span>
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

            acceptedExtensions: {
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
                selectedMediaIds: []
            }
        },

        computed: {
            ...mapGetters({
                icon: 'mediaManager/icon',
                activeMedia: 'mediaManager/activeMedia',
                imageExtensions: 'mediaManager/imageExtensions'
            }),

            firstMedia() {
                return this.activeMedia(this.selectedMediaIds)[0];
            },

            limitMet() {
                return this.limit === this.selectedMediaIds.length;
            },

            hasPreview() {
                return this.limit === 1 && this.preview;
            }
        },

        watch: {
            value(value) {
                this.setSelectedMediaIds(value);
            },

            selectedMediaIds(selectedMediaIds) {
                let value;
                
                if (this.limit === 1) {
                    value = selectedMediaIds.length ? selectedMediaIds[0] : null;
                } else {
                    value = selectedMediaIds;
                }

                this.$emit('input', value);
            }
        },

        mounted() {
            this.setSelectedMediaIds(this.value);

            this.$mediaManager.onMediaDeleted(mediaIds => {
                this.selectedMediaIds = this.selectedMediaIds.filter(id => ! mediaIds.includes(id));
            });
        },

        methods: {
            open() {
                this.$mediaManager.open({
                    limit: this.limit,
                    selectedMediaIds: this.selectedMediaIds,
                    acceptedExtensions: this.acceptedExtensions
                        ? this.setAcceptedExtensions(this.acceptedExtensions)
                        : []
                });

                this.$mediaManager.onMediaSelected(this.setSelectedMediaIds);

                this.$mediaManager.onClose(() => {
                    this.$mediaManager.removeMediaSelectedListener(this.setSelectedMediaIds);
                });
            },

            setAcceptedExtensions(acceptedExtensions) {
                if (acceptedExtensions === 'image') {
                    return this.imageExtensions;
                }

                return Array.isArray(acceptedExtensions)
                    ? acceptedExtensions
                    : [acceptedExtensions];
            },

            setSelectedMediaIds(value) {
                if (value) {
                    this.selectedMediaIds = Array.isArray(value) ? value : [value];
                }
            },

            remove(id) {
                this.selectedMediaIds = this.selectedMediaIds.filter(mediaId => {
                    return mediaId !== id;
                });
            }
        }
    }
</script>
