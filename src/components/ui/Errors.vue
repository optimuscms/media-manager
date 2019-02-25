<template>
    <div class="mm-errors">
        <ul>
            <template v-for="errorGroup in errors">
                <li :key="index" v-for="(error, index) in errorGroup">
                    {{ error }}
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            errors: {
                type: Object,
                default: () => {}
            }
        }
    }
</script>
