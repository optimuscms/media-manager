<template>
    <div class="mm-actions-panel" :class="{ 'open': isVisible }">
        <div v-if="focusedMediaCount" class="mm-actions-panel-header">
            <h4 class="mm-actions-panel-title">
                {{ title }}
            </h4>

            <div class="mm-actions-panel-actions">
                <media-dropdown
                    :media="focusedMedia"
                    :first-media="firstFocusedMedia"
                    @edit="edit"
                />

                <a
                    class="mm-actions-panel-hide mm-icon"
                    @click="hideActionsPanel"
                >
                    <icon icon="times" />
                </a>
            </div>
        </div>

        <div class="mm-actions-panel-content">
            <media-form
                v-if="isEditing"
                :item="editingItem"
                @complete="isEditing = false"
            />

            <div v-else-if="focusedMediaCount > 1" class="mm-actions-section">
                <div
                    v-for="mediaItem in focusedMedia"
                    :key="mediaItem.id"
                    class="mm-actions-media-item"
                >
                    <span>
                        {{ mediaItem.name }}
                    </span>

                    <a
                        class="mm-icon"
                        @click="edit(mediaItem)"
                    >
                        <icon icon="pencil-alt" size="sm" />
                    </a>
                </div>
            </div>

            <media-details
                v-else-if="firstFocusedMedia"
                :media="firstFocusedMedia"
            />
        </div>

        <selected-media />
    </div>
</template>

<script>
import { sortBy } from 'lodash';
import { mapActions, mapGetters } from 'vuex';

import MediaDetails from './MediaDetails.vue';
import MediaDropdown from './MediaDropdown.vue';
import MediaForm from './MediaForm.vue';
import SelectedMedia from './SelectedMedia.vue';

export default {
    components: {
        MediaDetails,
        MediaDropdown,
        MediaForm,
        SelectedMedia,
    },

    data() {
        return {
            isEditing: false,
            editingItem: null,
        };
    },

    computed: {
        ...mapGetters({
            isVisible: 'mediaManager/showActionsPanel',
            currentMedia: 'mediaManagerMedia/currentMedia',
            focusedMediaIds: 'mediaManagerMedia/focusedMediaIds',
        }),

        focusedMediaCount() {
            return this.focusedMediaIds.length;
        },

        title() {
            if (this.focusedMediaCount === 1) {
                return 'File Properties';
            }

            return 'Multiple Actions';
        },

        focusedMedia() {
            return sortBy(this.currentMedia.filter(({ id }) => {
                return this.focusedMediaIds.includes(id);
            }), 'name', 'asc');
        },

        firstFocusedMedia() {
            return this.focusedMedia.find(({ id }) => {
                return id === this.focusedMediaIds[0];
            });
        },
    },

    watch: {
        focusedMediaIds() {
            this.isEditing = false;
        },
    },

    methods: {
        ...mapActions({
            hideActionsPanel: 'mediaManager/hideActionsPanel',
        }),

        edit(media) {
            this.editingItem = media;
            this.isEditing = true;
        },
    },
};
</script>
