<template>
    <div ref="dropdown" class="mm-dropdown" :class="{ 'open': isOpen }">
        <div class="mm-dropdown-trigger" @click="isOpen = ! isOpen">
            <slot name="button" :is-open="isOpen" />
        </div>

        <div class="mm-dropdown-menu max-w-xs" @click="isOpen = false">
            <div class="mm-dropdown-scroll">
                <div class="mm-dropdown-content">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false,
        };
    },

    created() {
        ['click', 'touchstart'].forEach(action => {
            document.addEventListener(action, this.close);
        });
    },

    destroyed() {
        ['click', 'touchstart'].forEach(action => {
            document.removeEventListener(action, this.close);
        });
    },

    methods: {
        close(event) {
            if (
                this.isOpen
                    && (this.$refs.dropdown !== event.target)
                    && ! this.$refs.dropdown.contains(event.target)
            ) {
                this.isOpen = false;
            }
        },
    },
};
</script>
