<template>
    <transition name="mm-modal-fade">
        <div class="mm-modal active" v-if="active">
            <div class="mm-modal-overlay" @click="$emit('close')"></div>
            
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        props: {
            active: {
                type: Boolean,
                required: true
            }
        }
    }
</script>
