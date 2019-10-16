<template>
    <div class="mm-actions-section">
        <div class="mm-media-details">
            <p>
                <strong>Name:</strong><br>
                {{ media.name }}
            </p>

            <p>
                <strong>Alt text:</strong><br>
                {{ media.alt_text || '-' }}
            </p>

            <p>
                <strong>Caption:</strong><br>
                {{ media.caption || '-' }}
            </p>

            <p>
                <strong>File name:</strong><br>
                {{ media.file_name }}
            </p>

            <p>
                <strong>Uploaded on:</strong><br>
                {{ media.created_at | formatDate }}
            </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    filters: {
        formatDate(date) {
            return moment(date).format('lll');
        },
    },

    props: {
        media: {
            type: Object,
            default: null,
        },
    },
};
</script>
