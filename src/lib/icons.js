import { library } from '@fortawesome/fontawesome-svg-core';

import {
    faClock,
    faTimesCircle
} from '@fortawesome/free-regular-svg-icons';

import {
    faAngleUp, faAngleLeft,
    faCheck,
    faCrosshairs,
    faEllipsisH,
    faExclamationTriangle,
    faFileAlt, faFileArchive, faFileAudio, faFileExcel, faFileImage,
    faFilePdf, faFilePowerpoint, faFileVideo, faFileWord,
    faFolder,
    faInfoCircle,
    faMinus,
    faPencilAlt,
    faPlus,
    faReply,
    faSpinner,
    faTimes,
    faTrash,
    faUpload
} from '@fortawesome/free-solid-svg-icons';

export default { 
    register() {
        library.add(
            faAngleUp, faAngleLeft,
            faCheck,
            faClock,
            faCrosshairs,
            faEllipsisH,
            faExclamationTriangle,
            faFileAlt, faFileArchive, faFileAudio, faFileExcel, faFileImage,
            faFilePdf, faFilePowerpoint, faFileVideo, faFileWord,
            faFolder,
            faInfoCircle,
            faMinus,
            faPencilAlt,
            faPlus,
            faReply,
            faSpinner,
            faTimes,
            faTimesCircle,
            faTrash,
            faUpload
        );
    }
}
