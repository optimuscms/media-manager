<template>
    <div v-if="currentMedia.length">
        <h2 class="mm-title mm-mb-4">Media</h2>
        
        <div class="mm-media">
            <div
                :key="media.id"
                class="mm-media-item"
                v-for="media in currentMedia"
                :class="{
                    'focused': focusedMediaIds.includes(media.id),
                    'selected': selectedMediaIds.includes(media.id)
                }"
                @click.stop="focusMedia(media.id)"
            >
                <div class="mm-card">
                    <figure class="mm-card-image" v-if="isImage(media.extension)">
                        <img :src="media.thumbnail_url" :alt="media.name" :title="media.name">
                    </figure>

                    <div class="mm-card-other" v-else>
                        <div class="mm-icon">
                            <icon :icon="icon(media.extension)" size="4x"></icon>
                        </div>
                    </div>

                    <div class="mm-card-content">
                        {{ media.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                icon: 'mediaManager/icon',
                isImage: 'mediaManager/isImage',

                currentMedia: 'mediaManager/currentMedia',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                selectedMediaIds: 'mediaManager/selectedMediaIds'
            })
        },

        methods: {
            ...mapMutations({
                focusMedia: 'mediaManager/focusMedia'
            })
        }
    }
</script>
