<template>
    <modal :active="isOpen" @close="close">
        <div class="mm-modal-wrap is-media-mover">
            <header class="mm-modal-header">
                <div class="mm-media-mover-header">
                    <a class="mm-icon">
                        <icon icon="arrow-left" size="lg"></icon>
                    </a>

                    <h4 class="mm-title">Move</h4>
                </div>

                <a class="mm-icon" @click="close">
                    <icon icon="times" size="lg"></icon>
                </a>
            </header>

            <section class="mm-modal-content is-media-mover">
                <!-- :class="{ 'loading': isLoading }" -->
                <ul class="mm-media-mover-folder-list">
                    <li class="selected">
                        <a>
                            <span class="mm-media-mover-folder-details">
                                <span class="mm-icon">
                                    <icon icon="folder"></icon>
                                </span>

                                <span>Folder Name</span>
                            </span>

                            <span class="mm-icon">
                                <icon icon="angle-right"></icon>
                            </span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <span class="mm-media-mover-folder-details">
                                <span class="mm-icon">
                                    <icon icon="folder"></icon>
                                </span>

                                <span>Folder Name</span>
                            </span>

                            <span class="mm-icon">
                                <icon icon="angle-right"></icon>
                            </span>
                        </a>
                    </li>

                    <li>
                        <a>
                            <span class="mm-media-mover-folder-details">
                                <span class="mm-icon">
                                    <icon icon="folder"></icon>
                                </span>

                                <span>Folder Name Folder Name Folder Name Folder Name Folder Name</span>
                            </span>

                            <span class="mm-icon">
                                <icon icon="angle-right"></icon>
                            </span>
                        </a>
                    </li>
                </ul>
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
