<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-mover">
            <header class="mm-modal-header">
                <div class="mm-media-mover-header">
                    <a class="mm-icon">
                        <icon icon="angle-left" size="lg"></icon>
                    </a>

                    <h4 class="mm-title">Move</h4>
                </div>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="mm-modal-content is-media-mover">
                <!-- :class="{ 'loading': isLoading }" -->
                <!-- <ul class="mm-media-mover-folder-list" v-if="folders.hasOwnProperty(null)">
                    <move-folder
                        :key="folder.id"
                        v-for="folder in folders[null]"
                        :folder="folder"
                    ></move-folder>
                </ul> -->
            </section>

            <footer class="mm-modal-footer">
                <a
                    class="mm-button full is-confirm"
                >Move</a>
                    <!-- @click="move" -->
                    <!-- :class="{ 'loading': isSaving }" -->
                    <!-- :disabled="isSaving || isLoading" -->
            </footer>
        </div>
    </modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    import Modal from './ui/Modal';

    export default {
        components: {
            Modal
        },

        data() {
            return {}
        },
        
        computed: {
            ...mapGetters({
                isOpen: 'mediaManager/mediaMoverIsOpen'
            })
        },

        methods: {
            ...mapMutations({
                close: 'mediaManager/closeMediaMover'
            })
        }
    }
</script>
