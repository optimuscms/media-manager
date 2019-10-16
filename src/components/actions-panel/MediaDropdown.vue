<template>
    <dropdown class="right">
        <a slot="button" class="mm-icon md">
            <icon icon="ellipsis-v" size="sm" />
        </a>

        <template v-if="mediaCount === 1 && hasFirstMedia">
            <input
                ref="mediaUrl"
                type="text"
                class="mm-share-url"
                :value="firstMedia.url"
            >

            <a
                class="mm-dropdown-item"
                @click="copyUrl"
            >
                <span class="mm-icon">
                    <icon icon="copy" size="sm" />
                </span>

                <span>Copy Url</span>
            </a>

            <a
                class="mm-dropdown-item"
                @click="$emit('edit', firstMedia)"
            >
                <span class="mm-icon">
                    <icon icon="pencil-alt" size="sm" />
                </span>

                <span>Edit</span>
            </a>
        </template>

        <a
            class="mm-dropdown-item"
            @click="openMediaMover({
                type: 'media',
                subject: media,
            })"
        >
            <span class="mm-icon">
                <icon icon="reply" size="sm" />
            </span>

            <span>Move</span>
        </a>

        <div
            v-if="mediaCount === 1"
            class="mm-dropdown-divider"
        />

        <a
            class="mm-dropdown-item mm-text-danger"
            @click="openConfirmation({
                type: 'media',
                subject: media,
            })"
        >
            <span class="mm-icon">
                <icon icon="trash-alt" size="sm" />
            </span>

            <span>Delete</span>
        </a>
    </dropdown>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Dropdown from '../ui/Dropdown.vue';

export default {
    components: { Dropdown },

    props: {
        media: {
            type: Array,
            default: () => [],
        },

        firstMedia: {
            type: Object,
            default: () => {},
        },
    },

    computed: {
        ...mapGetters({
            focusedMediaIds: 'mediaManagerMedia/focusedMediaIds',
        }),

        mediaCount() {
            return this.media.length;
        },

        hasFirstMedia() {
            return !! Object.keys(this.firstMedia).length;
        },
    },

    methods: {
        ...mapActions({
            openMediaMover: 'mediaManager/openMediaMover',
            openConfirmation: 'mediaManager/openConfirmation',
        }),

        copyUrl() {
            this.$refs.mediaUrl.select();
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
        },
    },
};
</script>
