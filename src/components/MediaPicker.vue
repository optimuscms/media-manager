<template>
    <div class="mm-reset">
        <div v-if="pickerMedia.length">
            <div class="mm-picker-preview" v-if="hasPreview">
                <img :src="firstMedia.thumbnail_url">

                <a class="mm-icon" @click="removeMedia(firstMedia.id)">
                    <icon icon="times"></icon>
                </a>
            </div>

            <div class="mm-picker-items" v-else>
                <div
                    :key="media.id"
                    class="mm-picker-item"
                    v-for="media in pickerMedia"
                >
                    <div class="mm-icon mm-icon-md">
                        <icon :icon="getIcon(media.extension)" size="2x"></icon>
                    </div>
                    
                    <div class="mm-picker-item-body">
                        {{ media.name }}
                    </div>

                    <a class="mm-icon" @click="removeMedia(media.id)">
                        <icon icon="times"></icon>
                    </a>
                </div>
            </div>
        </div>

        <div class="mm-button is-picker" @click="open" v-if="! limitMet">
            <span class="mm-icon">
                <icon icon="upload"></icon>
            </span>

            <span>Choose media…</span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import isEqual from 'lodash/isEqual';

    export default {
        props: {
            value: [ Array, Number ],

            id: {
                type: String,
                required: true
            },

            media: {
                type: [ Array, Object ],
                default: () => []
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

        computed: {
            ...mapGetters({
                getIcon: 'mediaManager/getIcon',
                getPickerMedia: 'mediaManager/selectedMedia',
                imageExtensions: 'mediaManager/imageExtensions'
            }),

            pickerMedia() {
                return this.getPickerMedia(this.id);
            },
            
            firstMedia() {
                return this.pickerMedia.length ? this.pickerMedia[0] : null;
            },

            limitMet() {
                return this.limit === this.pickerMedia.length;
            },

            hasPreview() {
                return this.limit === 1 && this.preview && this.firstMedia;
            }
        },

        watch: {
            media(value, oldValue) {
                if (! isEqual(value, oldValue)) {
                    this.setPickerMedia({
                        pickerId: this.id,
                        media: this.formatMedia(this.media)
                    });
                }
            },

            pickerMedia() {
                let selectedIds = this.pickerMedia.map(({ id }) => id);

                if (this.limit === 1) {
                    return this.$emit('input', selectedIds.length
                        ? selectedIds[0]
                        : null
                    );
                }

                return this.$emit('input', selectedIds);
            }
        },

        created() {
            this.setPickerMedia({
                pickerId: this.id,
                media: this.formatMedia(this.media)
            });
        },

        beforeDestroy() {
            this.clearPickerMedia(this.id);
        },

        methods: {
            ...mapActions({
                openManager: 'mediaManager/open',
                setPickerMedia: 'mediaManager/setPickerMedia',
                clearPickerMedia: 'mediaManager/clearPickerMedia',
                removePickerMediaItem: 'mediaManager/removePickerMediaItem',
            }),

            removeMedia(id) {
                this.removePickerMediaItem({
                    pickerId: this.id,
                    id
                });
            },

            formatMedia(media) {
                if (! media) {
                    return [];
                }

                if (Array.isArray(media)) {
                    return media;
                }

                return [media];
            },

            open() {
                this.openManager({
                    pickerId: this.id,
                    limit: this.limit,
                    acceptedExtensions: this.acceptedExtensions
                        ? this.setAcceptedExtensions(this.acceptedExtensions)
                        : null
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
        }
    }
</script>
