<template>
    <div>
        <div v-if="currentMedia.length">
            <h2 class="mm-title mm-mb-4">Media</h2>
            
            <div class="mm-media">
                <div
                    :key="media.id"
                    class="mm-media-item"
                    v-for="media in currentMedia"
                    :class="{
                        'focused': focusedMediaIds.includes(media.id),
                        'selected': selectedMediaIds.includes(media.id),
                        'not-selectable': ! isSelectable(media.extension)
                    }"
                    @click.stop="focusMedia(media.id)"
                >
                    <div class="mm-card">
                        <figure class="mm-card-image" v-if="isImage(media.extension)">
                            <img :src="media.thumbnail_url" :alt="media.name" :title="media.name">
                        </figure>

                        <div class="mm-card-other" v-else>
                            <div class="mm-icon">
                                <icon :icon="getIcon(media.extension)" size="4x"></icon>
                            </div>
                        </div>

                        <div class="mm-card-content">
                            {{ media.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mm-notification" v-else>
            No media, add new media by clicking the <strong>New</strong> button below.
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                getIcon: 'mediaManager/getIcon',
                isImage: 'mediaManager/isImage',

                currentMedia: 'mediaManager/currentMedia',
                focusedMediaIds: 'mediaManager/focusedMediaIds',
                selectedMediaIds: 'mediaManager/selectedMediaIds',
                acceptedExtensions: 'mediaManager/acceptedExtensions'
            })
        },

        methods: {
            ...mapMutations({
                focusMedia: 'mediaManager/focusMedia'
            }),

            isSelectable(extension) {
                if (! this.acceptedExtensions.length) {
                    return true;
                }

                return this.acceptedExtensions.includes(extension);
            }
        }
    }
</script>
