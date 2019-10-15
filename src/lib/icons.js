import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faCheckCircle,
    faClock,
    faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';

import {
    faAngleDown, faAngleUp,
    faArrowLeft,
    faCheck, faCheckSquare,
    faExclamationTriangle,
    faFileAlt, faFileArchive, faFileAudio, faFileExcel, faFileImage,
    faFilePdf, faFilePowerpoint, faFileVideo, faFileWord,
    faEllipsisV,
    faFolder,
    faInfoCircle,
    faListAlt,
    faPencilAlt,
    faPlus,
    faReply,
    faSpinner,
    faTimes,
    faToggleOff, faToggleOn,
    faTrashAlt,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';

export default {
    register() {
        library.add(
            faAngleDown, faAngleUp,
            faArrowLeft,
            faCheckCircle,
            faCheck, faCheckSquare,
            faClock,
            faExclamationTriangle,
            faFileAlt, faFileArchive, faFileAudio, faFileExcel, faFileImage,
            faFilePdf, faFilePowerpoint, faFileVideo, faFileWord,
            faEllipsisV,
            faFolder,
            faInfoCircle,
            faListAlt,
            faPencilAlt,
            faPlus,
            faReply,
            faSpinner,
            faTimes,
            faToggleOff, faToggleOn,
            faTimesCircle,
            faTrashAlt,
            faUpload,
        );
    },
};
