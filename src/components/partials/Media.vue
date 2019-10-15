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
                        :icon="isFocusingMultiple ? 'toggle-on' : 'toggle-off'"
                    />
                </span>
            </a>
        </div>

        <transition name="mm-fade">
            <div v-if="! isLoading && ! currentMedia.length" class="mm-notification">
                This folder is empty.
            </div>

            <div v-else-if="! isLoading && currentMedia.length" class="mm-media-holder">
                <div
                    v-for="media in currentMedia"
                    :key="media.id"
                    class="mm-media-item-wrap"
                    :class="{
                        'selected': focusedIds.includes(media.id),
                        'disabled': ! isSelectable(media.extension),
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

                        <div
                            v-if="focusedIds.includes(media.id)"
                            class="mm-media-overlay"
                        >
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

                        <div
                            v-if="selectedMediaIds.includes(media.id)"
                            class="mm-media-selected mm-icon"
                        >
                            <icon icon="check-square" />
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { iconMap, imageExtensions } from '../../index';

export default {
    computed: {
        ...mapGetters({
            isLoading: 'mediaManagerMedia/isLoading',
            focusedIds: 'mediaManagerMedia/focusedIds',
            currentMedia: 'mediaManagerMedia/current',
            currentFolder: 'mediaManagerFolders/currentFolder',
            selectedMediaIds: 'mediaManagerMedia/selectedIds',
            acceptedExtensions: 'mediaManager/acceptedExtensions',
            isFocusingMultiple: 'mediaManagerMedia/isFocusingMultiple',
        }),

        currentFolderId() {
            return this.currentFolder.id;
        },
    },

    watch: {
        currentFolderId(folderId) {
            this.fetchMedia(folderId);
        },
    },

    methods: {
        ...mapActions({
            fetchMedia: 'mediaManagerMedia/fetch',
            focusId: 'mediaManagerMedia/focusId',
            blurId: 'mediaManagerMedia/blurId',
            clearFocusedIds: 'mediaManagerMedia/clearFocusedIds',
            enableMultipleFocus: 'mediaManagerMedia/enableMultipleFocus',
            disableMultipleFocus: 'mediaManagerMedia/disableMultipleFocus',
        }),

        isImage(extension) {
            return imageExtensions.includes(extension);
        },

        isSelectable(extension) {
            if (! this.acceptedExtensions) {
                return true;
            }

            return this.acceptedExtensions.includes(extension);
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
            if (this.isFocusingMultiple) {
                if (this.focusedIds.length > 1) {
                    this.clearFocusedIds();
                }

                return this.disableMultipleFocus();
            }

            this.enableMultipleFocus();
        },

        toggleId(id) {
            if (this.focusedIds.includes(id)) {
                return this.blurId(id);
            }

            return this.focusId(id);
        },
    },
};
</script>
