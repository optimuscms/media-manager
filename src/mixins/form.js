export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            errors: {},
            isProcessing: false,
        };
    },

    computed: {
        anyErrors() {
            return Object.keys(this.errors).length > 0;
        },

        isEditing() {
            return !! this.item;
        },
    },

    methods: {
        submit() {
            this.errors = {};
            this.isProcessing = true;

            this.save().then(response => {
                this.onSuccess(response);
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors;
                } else {
                    this.errors = {
                        error: ['An unexpected error occured.'],
                    };
                }

                this.onError(error);
            }).finally(() => {
                this.isProcessing = false;

                this.onFinally();
            });
        },

        onSuccess() {
            //
        },

        onError() {
            //
        },

        onFinally() {
            //
        },
    },
};
