import axios from 'axios';
import { HOST_FRONT_PROD, tokenUser } from 'src/config-global';
import axiosInstance, { endpoints } from 'src/utils/axios';




let uploadProgress;
let loadIsCanceled = false
let loadIsCompleted = false
let uplaodImgStart = false





export const loadIsCancel = () => loadIsCanceled
export const loadIsComplete = () => loadIsCompleted
export const getUploadProgress = () => uploadProgress;
export const getuploadImgStart = () => uplaodImgStart
export const setuploadImgStart = (valGet) => { uplaodImgStart = valGet }






















export const setUploadProgress = (progress) => {


    uploadProgress = progress;
    if (progress === 100) {

        uploadProgress = 101;
        loadIsCompleted = true

    }

};



















export const resetLoadIsComplete = () => {

    uploadProgress = 0;
    loadIsCompleted = false;
    loadIsCanceled = false

}










export async function uploadImage(imageObject) {
    try {
        // console.log('appelr');
        // loadIsCanceled = false
        // uplaodImgStart = true


        const formData = new FormData();
        formData.append('file', imageObject); // Ajoute l'image au FormData


        const response = await axiosInstance.post(`${HOST_FRONT_PROD}/upload`, formData,
            {

                headers: { Authorization: `Bearer ${tokenUser()}` }
                // headers: { 'Content-Type': 'multipart/form-data', },
                // onUploadProgress: (progressEvent) => {


                //     const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                //     setUploadProgress(progress);
                //     console.log('progression de l\'upload de l\'inage   get', getUploadProgress());



                // },



            });


        console.log('reponse obteneu', response);


        return response.data;


    } catch (error) {


        if (axios.isCancel(error)) {


            console.log('Upload annulé', error.message);
            // loadIsCanceled = true


        } else {


            console.log(error);
            // loadIsCanceled = true
            throw error;


        }
        return null;

    }
}
















