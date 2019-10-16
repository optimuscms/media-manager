<template>
    <div class="mm-media-wrap" :class="{ 'loading': isLoading }">
        <div class="mm-media-actions">
            <a
                class="mm-media-focus-multiple"
                @click="toggleMultipleFocus"
            >
                <span>
                    Select multiple
                </span>

                <span class="mm-icon">
                    <icon
                        :icon="isFocusingMultipleMedia ? 'toggle-on' : 'toggle-off'"
                    />
                </span>
            </a>
        </div>

        <transition name="mm-fade">
            <template v-if="! isLoading">
                <div v-if="! currentMedia.length" class="mm-notification">
                    This folder is empty.
                </div>

                <div v-else class="mm-media-holder">
                    <div
                        v-for="media in currentMedia"
                        :key="media.id"
                        class="mm-media-item-wrap"
                        :class="{
                            'selected': isFocused(media.id),
                            'disabled': isDisabled(media.extension),
                        }"
                    >
                        <div class="mm-media-item" @click="toggleId(media.id)">
                            <div v-if="isImage(media.extension)" class="mm-media-image">
                                <img
                                    :src="media.thumbnail_url"
                                    :alt="media.name"
                                >
                            </div>

                            <div v-else class="mm-media-icon">
                                <div class="mm-media-icon-detail">
                                    <div class="mm-icon">
                                        <icon
                                            :icon="getIcon(media.extension)"
                                            size="3x"
                                        />
                                    </div>

                                    <div class="mm-media-name">
                                        {{ media.name }}
                                    </div>
                                </div>
                            </div>

                            <div v-if="isFocused(media.id)" class="mm-media-overlay">
                                <div class="mm-icon">
                                    <icon
                                        :icon="['far', 'check-circle']"
                                        size="2x"
                                    />
                                </div>

                                <div>
                                    Selected
                                </div>
                            </div>

                            <div v-if="isSelected(media.id)" class="mm-media-selected mm-icon">
                                <icon icon="check-square" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { iconMap, imageExtensions } from '../../index';

export default {
    computed: {
        ...mapGetters({
            isLoading: 'mediaManagerMedia/isLoadingMedia',
            currentMedia: 'mediaManagerMedia/currentMedia',
            currentFolder: 'mediaManagerFolders/currentFolder',
            focusedMediaIds: 'mediaManagerMedia/focusedMediaIds',
            acceptedExtensions: 'mediaManager/acceptedExtensions',
            selectedMediaIds: 'mediaManagerMedia/selectedMediaIds',
            isFocusingMultipleMedia: 'mediaManagerMedia/isFocusingMultipleMedia',
        }),

        currentFolderId() {
            return this.currentFolder.id;
        },
    },

    watch: {
        currentFolderId(folderId) {
            this.fetchMedia(folderId);
            this.clearFocusedMediaIds();
            this.disableMultipleMediaFocus();
        },
    },

    methods: {
        ...mapActions({
            fetchMedia: 'mediaManagerMedia/fetchMedia',
            blurMediaId: 'mediaManagerMedia/blurMediaId',
            focusMediaId: 'mediaManagerMedia/focusMediaId',
            clearFocusedMediaIds: 'mediaManagerMedia/clearFocusedMediaIds',
            enableMultipleMediaFocus: 'mediaManagerMedia/enableMultipleMediaFocus',
            disableMultipleMediaFocus: 'mediaManagerMedia/disableMultipleMediaFocus',
        }),

        isImage(extension) {
            return imageExtensions.includes(extension);
        },

        isFocused(mediaId) {
            return this.focusedMediaIds.includes(mediaId);
        },

        isSelected(mediaId) {
            return this.selectedMediaIds.includes(mediaId);
        },

        isDisabled(extension) {
            return this.acceptedExtensions
                && ! this.acceptedExtensions.includes(extension);
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

        toggleMultipleFocus() {
            if (this.isFocusingMultipleMedia) {
                if (this.focusedMediaIds.length > 1) {
                    this.clearFocusedMediaIds();
                }

                return this.disableMultipleMediaFocus();
            }

            this.enableMultipleMediaFocus();
        },

        toggleId(id) {
            if (this.isFocused(id)) {
                return this.blurMediaId(id);
            }

            return this.focusMediaId(id);
        },
    },
};
</script>
