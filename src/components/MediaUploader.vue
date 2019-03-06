<template>
    <div class="mm-upload" v-show="files.length">
        <errors
            v-if="error.active"
            class="mm-upload-errors"
            :errors="error.messages"
        ></errors>

        <div class="mm-upload-wrap">
            <header class="mm-upload-header">
                <div class="mm-upload-header-content">
                    <span class="mm-icon" v-if="! isActive && ! isComplete">
                        <icon icon="spinner" spin></icon>
                    </span>

                    <span>{{ title }}</span>
                </div>

                <a class="mm-icon" @click="closePreview">
                    <icon icon="times"></icon>
                </a>
            </header>

            <div class="mm-upload-items" v-if="isActive">
                <div
                    :key="file.uuid"
                    class="mm-upload-item"
                    v-for="file in files"
                    @mouseover="showError(file.errors)"
                    @mouseleave="error.active = false"
                >
                    <span class="mm-icon">
                        <icon
                            :icon="fileIcon(file).icon"
                            :spin="fileIcon(file).spin"
                            :class="fileIcon(file).class"
                        ></icon>
                    </span>

                    <span class="mm-upload-item-name">{{ file.name }}</span>

                    <a
                        v-if="! file.complete"
                        class="mm-icon"
                        @click="remove(file.uuid)"
                    >
                        <icon :icon="['far', 'times-circle']"></icon>
                    </a>

                    <progress
                        max="100"
                        v-if="file.uploading"
                        class="mm-upload-progress"
                        :value="file.progress"
                    >{{ file.progress }}%</progress>
                </div>
            </div>
        </div>

        <input
            ref="file" 
            type="file"
            class="mm-upload-input" 
            @change="upload"
            multiple
        >
    </div>
</template>

<script>
    import { CancelToken } from 'axios';
    import { mapGetters, mapMutations } from 'vuex';

    import Errors from './ui/Errors';

    export default {
        components: { Errors },

        data() {
            return {
                isActive: false,

                error: {
                    active: false,
                    messages: null
                },

                files: []
            }
        },

        computed: {
            ...mapGetters({
                activeFolderId: 'mediaManager/activeFolderId'
            }),

            isComplete() {
                return ! this.files.filter(file => ! file.complete && ! file.error).length;
            },

            title() {
                return this.isComplete ? 'Uploading Complete' : 'Uploading Media…';
            }
        },

        methods: {
            ...mapMutations({
                addMedia: 'mediaManager/addMediaItem'
            }),

            focus() {
                this.$refs.file.click();
            },

            upload(event) {
                this.isLoading = true;
                this.isActive = true;

                Array.from(event.target.files).forEach(file => {
                    let data = new FormData();
                    let uuid = this.generateUuid();

                    if (this.activeFolderId) {
                        data.append('folder_id', this.activeFolderId);
                    }

                    this.files.push({
                        uuid,
                        id: null,
                        name: file.name,
                        progress: 0,                        
                        uploading: false,
                        complete: false,
                        errors: false,
                        cancel: null
                    });

                    data.append('file', file);

                    axios.post('/admin/api/media', data, {
                        cancelToken: new CancelToken(cancel => {
                            this.updateFile(uuid, {
                                cancel
                            });
                        }),
                        onUploadProgress: progressEvent => {
                            this.updateFile(uuid, {
                                uploading: true,
                                progress: Math.round(
                                    (progressEvent.loaded * 100) / progressEvent.total
                                )
                            });
                        }
                    }).then(response => {
                        this.updateFile(uuid, {
                            id: response.data.data.id,
                            uploading: false,
                            complete: true
                        });

                        this.addMedia({
                            folder: response.data.data.folder_id,
                            media: response.data.data
                        });
                    }).catch(error => {
                        this.updateFile(uuid, {
                            uploading: false,
                            errors: error.response.data.errors
                        });
                    });
                });

                this.$refs.file.value = '';
            },

            generateUuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },

            closePreview() {
                if (this.isComplete || confirm('Are you sure you want to cancel all uploads?')) {
                    this.files.forEach(file => {
                        if (file.uploading) {
                            file.cancel();
                        }
                    });

                    this.files = [];
                    this.isActive = false;
                }
            },

            updateFile(uuid, properties) {
                if (this.isActive) {
                    this.files.map(file => {
                        if (file.uuid === uuid) {
                            Object.entries(properties).forEach(([key, value]) => {
                                file[key] = value;
                            });
                        }
                    });
                }
            },

            fileIcon(file) {
                if (file.errors) {
                    return {
                        icon: 'exclamation-triangle',
                        class: 'text-red',
                        spin: false
                    }
                } else if (! file.uploading && ! file.complete) {
                    return {
                        icon: ['far', 'clock'],
                        class: null,
                        spin: false
                    }
                } else if (file.uploading && ! file.errors) {
                    return {
                        icon: 'spinner',
                        class: 'text-blue',
                        spin: true
                    }
                } else if (file.complete) {
                    return {
                        icon: 'check',
                        class: 'text-green',
                        spin: false
                    }
                }
            },

            showError(messages) {
                if (messages) {
                    this.error.messages = messages;
                    this.error.active = true;
                }
            },

            remove(uuid) {
                let index = this.files.findIndex(file => file.uuid === uuid);

                this.error.active = false;
                this.files[index].cancel();

                this.files = this.files.filter(file => {
                    return file.uuid !== uuid;
                });
            }
        }
    }
</script>
