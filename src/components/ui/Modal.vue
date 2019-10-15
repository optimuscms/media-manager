<template>
    <transition name="mm-modal-fade">
        <div v-if="active" class="mm-modal">
            <div class="mm-modal-overlay" @click="$emit('close')" />

            <slot />
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
