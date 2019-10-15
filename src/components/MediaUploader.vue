<template>
    <div v-show="files.length" class="mm-uploader-wrap">
        <errors
            v-if="showErrors"
            class="mm-upload-errors"
            :errors="errors"
        />

        <div v-show="files.length" class="mm-uploader">
            <header class="mm-upload-header">
                <div class="mm-upload-header-content">
                    <span v-if="isCollapsed && isProcessing" class="mm-icon">
                        <icon icon="spinner" spin />
                    </span>

                    <span>
                        {{ title }}
                    </span>
                </div>

                <div>
                    <a class="mm-icon" @click="isCollapsed = ! isCollapsed">
                        <icon :icon="isCollapsed ? 'angle-up' : 'angle-down'" />
                    </a>

                    <a class="mm-icon" @click="cancelUploads">
                        <icon icon="times" />
                    </a>
                </div>
            </header>

            <template v-if="! isCollapsed">
                <div class="mm-upload-wrap">
                    <div
                        v-for="file in files"
                        :key="file.uuid"
                        class="mm-upload-item-wrap"
                        @mouseover="displayErrors(file.errors)"
                        @mouseleave="showErrors = false"
                    >
                        <div class="mm-upload-item">
                            <span class="mm-icon" :class="fileIcon(file).class">
                                <icon
                                    :icon="fileIcon(file).icon"
                                    :spin="fileIcon(file).spin"
                                />
                            </span>

                            <span class="mm-upload-item-name">
                                {{ file.name }}
                            </span>

                            <a
                                v-if="! file.complete"
                                class="mm-icon"
                                @click="remove(file.uuid)"
                            >
                                <icon :icon="['far', 'times-circle']" />
                            </a>
                        </div>

                        <progress
                            v-if="file.uploading"
                            max="100"
                            class="mm-upload-item-progress"
                            :value="file.progress"
                        />
                    </div>
                </div>
            </template>

            <input
                ref="file"
                type="file"
                class="mm-upload-input"
                multiple
                @change="upload"
            >
        </div>
    </div>
</template>

<script>
import { CancelToken } from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { actions as apiActions } from '../index';

import Errors from './ui/Errors.vue';

export default {
    components: { Errors },

    data() {
        return {
            isCollapsed: false,
            files: [],

            showErrors: false,
            errors: null,
        };
    },

    computed: {
        ...mapGetters({
            currentFolder: 'mediaManagerFolders/currentFolder',
        }),

        isProcessing() {
            return !! this.files.filter(file => {
                return file.uploading && ! file.complete;
            }).length;
        },

        title() {
            return this.isProcessing ? 'Uploading' : 'Uploading Complete';
        },
    },

    methods: {
        ...mapActions({
            addMedia: 'mediaManagerMedia/add',
        }),

        findIndex(uuid) {
            return this.files.findIndex(file => file.uuid === uuid);
        },

        focus() {
            this.$refs.file.click();
        },

        upload(event) {
            this.isCollapsed = false;

            Array.from(event.target.files).forEach(file => {
                let data = new FormData();
                const uuid = this.generateUuid();

                if (this.currentFolder && this.currentFolder.id) {
                    data.append('folder_id', this.currentFolder.id);
                }

                this.files.push({
                    uuid,
                    id: null,
                    name: file.name,
                    progress: 0,
                    uploading: false,
                    complete: false,
                    errors: false,
                    cancel: null,
                });

                data.append('file', file);

                apiActions.createMedia(data, {
                    cancelToken: new CancelToken(cancel => {
                        this.updateFile(uuid, {
                            cancel,
                        });
                    }),
                    onUploadProgress: progressEvent => {
                        this.updateFile(uuid, {
                            uploading: true,
                            progress: Math.round(
                                (progressEvent.loaded * 100) / progressEvent.total
                            ),
                        });
                    },
                }).then(media => {
                    this.updateFile(uuid, {
                        id: media.id,
                        uploading: false,
                        complete: true,
                    });

                    this.addMedia(media);
                }).catch(errors => {
                    this.updateFile(uuid, {
                        uploading: false,
                        errors: errors,
                    });
                });
            });

            this.$refs.file.value = '';
        },

        generateUuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
                let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },

        updateFile(uuid, properties) {
            const index = this.findIndex(uuid);

            if (index !== -1) {
                this.files.splice(index, 1, {
                    ...this.files[index],
                    ...properties,
                });
            }
        },

        fileIcon(file) {
            if (file.errors) {
                return {
                    icon: 'exclamation-triangle',
                    class: 'mm-upload-icon-error',
                    spin: false,
                };
            }

            if (! file.uploading && ! file.complete) {
                return {
                    icon: ['far', 'clock'],
                    class: null,
                    spin: false,
                };
            }

            if (file.uploading && ! file.errors) {
                return {
                    icon: 'spinner',
                    class: 'mm-upload-icon-in-progress',
                    spin: true,
                };
            }

            return {
                icon: 'check',
                class: 'mm-upload-icon-success',
                spin: false,
            };
        },

        displayErrors(errors) {
            if (errors) {
                this.errors = errors;
                this.showErrors = true;
            }
        },

        remove(uuid) {
            let index = this.findIndex(uuid);

            if (index !== -1) {
                this.showErrors = false;
                this.files[index].cancel();

                this.files = this.files.filter(file => {
                    return file.uuid !== uuid;
                });
            }
        },

        cancelUploads() {
            if (! this.isProcessing) {
                return this.files = [];
            }

            if (confirm('Are you sure you want to cancel all uploads?')) {
                this.files.forEach(file => {
                    if (file.uploading) {
                        file.cancel();
                    }
                });

                this.files = [];
            }
        },
    },
};
</script>
