<template>
    <form class="mm-actions-section" @submit.prevent="submit">
        <div v-if="anyErrors" class="mm-field">
            <errors :errors="errors" />
        </div>

        <div class="mm-field">
            <label for="mm_media_name" class="mm-label">
                Media Name *
            </label>

            <div class="mm-control">
                <input
                    id="mm_media_name"
                    ref="name"
                    v-model="form.name"
                    type="text"
                    class="mm-input"
                    required
                    :disabled="isProcessing"
                >
            </div>
        </div>

        <template v-if="isImage">
            <div class="mm-field">
                <label for="mm_media_alt_text" class="mm-label">
                    Alt text
                </label>

                <div class="mm-control">
                    <input
                        id="mm_media_alt_text"
                        v-model="form.alt_text"
                        type="text"
                        class="mm-input"
                        :disabled="isProcessing"
                    >
                </div>
            </div>

            <div class="mm-field">
                <label for="mm_media_caption" class="mm-label">
                    Caption
                </label>

                <div class="mm-control">
                    <input
                        id="mm_media_caption"
                        v-model="form.caption"
                        type="text"
                        class="mm-input"
                        :disabled="isProcessing"
                    >
                </div>
            </div>
        </template>

        <div class="mm-field">
            <div class="mm-button-group">
                <button
                    class="mm-button confirm"
                    :class="{ 'loading': isProcessing }"
                    :disabled="isProcessing"
                >
                    Save
                </button>

                <a
                    class="mm-button"
                    @click="close"
                >
                    Cancel
                </a>
            </div>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';
import {
    actions as apiActions,
    imageExtensions,
} from '../../index';

import formMixin from '../../mixins/form';

export default {
    mixins: [ formMixin ],

    data() {
        return {
            form: {
                name: '',
                alt_text: '',
                caption: '',
            },
        };
    },

    computed: {
        isImage() {
            return imageExtensions.includes(this.item.extension);
        },
    },

    watch: {
        item: {
            handler(item) {
                if (item) {
                    this.form = {
                        name: item.name,
                        alt_text: item.alt_text,
                        caption: item.caption,
                    };
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...mapActions({
            updateMediaItem: 'mediaManagerMedia/updateMediaItem',
        }),

        save() {
            return apiActions.updateMedia(this.item.id, this.form);
        },

        onSuccess(media) {
            this.updateMediaItem({
                id: this.item.id,
                media,
            });

            this.close();
        },

        close() {
            this.$emit('complete');
        },
    },
};
</script>
