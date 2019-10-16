<template>
    <div class="mm-reset">
        <template v-if="pickerMedia.length">
            <div v-if="previewIsVisible" class="mm-picker-preview">
                <img :src="firstMedia.thumbnail_url">

                <a class="mm-icon" @click="removeMedia(firstMedia.id)">
                    <icon icon="times" />
                </a>
            </div>

            <div v-else class="mm-picker-items">
                <div
                    v-for="pickerMediaItem in pickerMedia"
                    :key="pickerMediaItem.id"
                    class="mm-picker-item"
                >
                    <div class="mm-icon">
                        <icon :icon="getIcon(pickerMediaItem.extension)" />
                    </div>

                    <div class="mm-picker-item-body">
                        {{ pickerMediaItem.name }}
                    </div>

                    <a class="mm-icon" @click="removeMedia(pickerMediaItem.id)">
                        <icon icon="times" />
                    </a>
                </div>
            </div>
        </template>

        <div
            v-if="! limitIsMet"
            class="mm-button picker"
            @click="open"
        >
            <span class="mm-icon">
                <icon icon="upload" />
            </span>

            <span>Choose media…</span>
        </div>
    </div>
</template>

<script>
import { sortBy } from 'lodash';
import { mapActions, mapGetters } from 'vuex';
import { iconMap, imageExtensions } from '../index';

export default {
    props: {
        value: {
            type: [ Array, Number ],
            default: null,
        },

        id: {
            type: String,
            required: true,
        },

        limit: {
            type: Number,
            default: 1,
        },

        acceptedExtensions: {
            type: [ Array, String ],
            default: null,
        },

        showPreview: {
            type: Boolean,
            default: false,
        },

        media: {
            type: [ Array, Object ],
            default: () => [],
        },
    },

    computed: {
        ...mapGetters({
            getPickerMedia: 'mediaManagerPickers/getPickerMedia',
        }),

        initialMedia() {
            if (! this.media) {
                return [];
            }

            if (Array.isArray(this.media)) {
                return this.media;
            }

            return [ this.media ];
        },

        pickerMedia() {
            return sortBy(this.getPickerMedia(this.id), 'name', 'asc');
        },

        firstMedia() {
            if (this.pickerMedia.length) {
                return this.pickerMedia[0];
            }

            return null;
        },

        previewIsVisible() {
            return this.limit === 1
                && this.showPreview
                && this.firstMedia
                && imageExtensions.includes(this.firstMedia.extension);
        },

        limitIsMet() {
            return this.limit === this.pickerMedia.length;
        },
    },

    watch: {
        initialMedia: {
            handler(media) {
                this.setPickerMediaIds({
                    pickerId: this.id,
                    mediaIds: media.map(({ id }) => id),
                });

                if (media.length) {
                    this.setMedia(media);
                }
            },
            immediate: true,
        },

        pickerMedia(pickerMedia) {
            let selectedIds = pickerMedia.map(({ id }) => id);

            if (! selectedIds.length) {
                return this.$emit('input', null);
            }

            if (this.limit === 1) {
                return this.$emit('input', selectedIds[0]);
            }

            return this.$emit('input', selectedIds);
        },
    },

    beforeDestroy() {
        this.clearPickerMediaIds(this.id);
    },

    methods: {
        ...mapActions({
            setMedia: 'mediaManagerMedia/setMedia',
            openMediaManager: 'mediaManager/openMediaManager',
            setPickerMediaIds: 'mediaManagerPickers/setPickerMediaIds',
            clearPickerMediaIds: 'mediaManagerPickers/clearPickerMediaIds',
            removePickerMediaId: 'mediaManagerPickers/removePickerMediaId',
        }),

        open() {
            this.openMediaManager({
                pickerId: this.id,
                limit: this.limit,
                acceptedExtensions: this.acceptedExtensions,
            });
        },

        getIcon(extension) {
            let icon = 'file-alt';

            Object.keys(iconMap).some(key => {
                if (iconMap[key].includes(extension)) {
                    return icon = key;
                }
            });

            return icon;
        },

        removeMedia(id) {
            this.removePickerMediaId({
                pickerId: this.id,
                mediaId: id,
            });
        },
    },
};
</script>
