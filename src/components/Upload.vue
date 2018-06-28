<template>
    <div class="upload-preview-holder" v-show="files.length">
        <transition name="notification">
            <div class="notification is-danger p-2" v-if="error.active">
                <ul>
                    <template v-for="messages in error.messages">
                        <li :key="index" v-for="(message, index) in messages">
                            {{ message }}
                        </li>
                    </template>
                </ul>
            </div>
        </transition>

        <div class="upload-preview">
            <nav class="panel">
                <div class="panel-heading">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item" v-if="! isActive && ! isComplete">
                                <span class="icon has-text-link">
                                    <icon icon="spinner" spin></icon>
                                </span>
                            </div>

                            <div class="level-item">
                                {{ title }}
                            </div>
                        </div>

                        <div class="level-right has-text-right">
                            <div class="level-item">
                                <a class="icon is-small" @click="isActive = ! isActive">
                                    <icon icon="minus"></icon>
                                </a>
                            </div>

                            <div class="level-item">
                                <a class="icon is-small" @click="closePreview">
                                    <icon icon="times"></icon>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="is-scrollable" v-if="isActive">
                    <div
                        class="panel-block"
                        :key="file.uuid"
                        v-for="file in files"
                        @mouseover="showError(file.errors)"
                        @mouseleave="error.active = false"
                    >
                        <progress
                            class="progress is-primary"
                            :value="file.progress"
                            max="100"
                            v-if="file.uploading"
                        >{{ file.progress }}%</progress>

                        <span class="panel-icon">
                            <icon
                                :icon="fileIcon(file).icon"
                                :spin="fileIcon(file).spin"
                                :class="fileIcon(file).class"
                            ></icon>
                        </span>

                        <span class="panel-label">{{ file.name }}</span>

                        <a class="panel-icon" v-if="! file.complete" @click="remove(file.uuid)">
                            <icon :icon="['far', 'times-circle']"></icon>
                        </a>
                    </div>
                </div>
            </nav>
        </div>

        <input ref="file" type="file" class="is-hidden" multiple @change="upload">
    </div>
</template>

<script>
    import { CancelToken } from 'axios';

    export default {
        props: {
            folder: Number
        },

        data() {
            return {
                isActive: false,

                title: null,

                error: {
                    active: false,
                    messages: null
                },

                files: []
            }
        },

        computed: {
            isComplete() {
                return ! this.files.filter(file => ! file.complete && ! file.error).length;
            }
        },

        watch: {
            isComplete(value) {
                this.title = value ? 'Uploading Complete' : 'Uploading Media…';
            }
        },

        methods: {
            focus() {
                this.$refs.file.click();
            },

            upload(event) {
                this.isLoading = true;
                this.isActive = true;

                Array.from(event.target.files).forEach(file => {
                    let data = new FormData();
                    let uuid = this.generateUuid();

                    if (this.folder) {
                        data.append('folder_id', this.folder);
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

                    axios.post('/api/media', data, {
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

                        this.$emit('success', response.data.data);
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
                        class: 'has-text-danger',
                        spin: false
                    }
                } else if (! file.uploading && ! file.complete) {
                    return {
                        icon: ['far', 'clock'],
                        class: 'has-text-default',
                        spin: false
                    }
                } else if (file.uploading && ! file.errors) {
                    return {
                        icon: 'spinner',
                        class: 'has-text-link',
                        spin: true
                    }
                } else if (file.complete) {
                    return {
                        icon: 'check',
                        class: 'has-text-success',
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
