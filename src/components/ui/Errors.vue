<template>
    <div class="mm-errors">
        <ul>
            <template v-for="errorGroup in errors">
                <li v-for="(error, index) in errorGroup" :key="index">
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
            default: () => {},
        },
    },
};
</script>
