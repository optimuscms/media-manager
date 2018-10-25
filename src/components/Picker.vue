<template>
    <div>
        <div class="field" v-if="selectedMediaIds.length">
            <div class="control">
                <div class="media-preview" v-if="hasPreview">
                    <img :src="firstMedia.thumbnail_url">

                    <a class="icon" @click="remove(firstMedia.id)">
                        <icon icon="times"></icon>
                    </a>
                </div>

                <div class="media-items" v-else>
                    <div
                        :key="media.id"
                        class="media-item"
                        v-for="media in activeMedia(selectedMediaIds)"
                    >
                        <div class="icon icon-medium">
                            <icon :icon="icon(media.extension)" size="2x"></icon>
                        </div>
                        
                        <div class="media-item-body truncate">
                            {{ media.name }}
                        </div>

                        <a class="icon" @click="remove(media.id)">
                            <icon icon="times"></icon>
                        </a>
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

<style lang="scss" scoped>
    .media-preview {
        position: relative;
        display: inline-flex;
        border: 1px solid config('colors.grey-light');
        border-radius: config('borderRadius.default');

        &:before {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            content: '';
            position: absolute;
            transition: all 125ms ease-in-out;
            background-color: config('colors.black');
        }

        img {
            display: block;
            max-height: 14rem;
            border-radius: config('borderRadius.default');
        }

        .icon {
            top: 1rem;
            right: 1rem;
            position: absolute;
            color: config('colors.black');
            border-radius: config('borderRadius.full');
            background-color: rgba(255, 255, 255, 0.5);
        }

        &:hover {
            &:before {
                opacity: 0.25;
            }
        }
    }

    .media-items {
        display: flex;
        flex-wrap: wrap;
        position: relative;
        padding: 0.75rem 0.5rem;
        background-color: config('colors.white');
        border: 1px solid config('colors.grey-light');
        border-radius: config('borderRadius.default');

        .media-item {
            display: flex;
            padding: 0.5rem;
            align-items: center;
            margin: 0.25rem 0.5rem;
            justify-content: space-between;
            border-radius: config('borderRadius.default');
            border: 1px solid config('colors.grey-light');
            background-color: config('colors.grey-lighter');

            .icon {
                flex-shrink: 0;
            }

            .media-item-body {
                flex-grow: 1;
                max-width: 8rem;
                margin-left: 0.5rem;
                margin-right: 0.5rem;
            }

            &:hover {
                border-color: config('colors.grey');
            }
        }
    }
</style>
