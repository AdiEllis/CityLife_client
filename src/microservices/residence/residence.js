import {getRequest, postFileRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getResidence = () => getRequest(urlDefinitions.GET_RESIDENCES);

export const addResidence = (data) => postRequest(urlDefinitions.ADD_RESIDENCE, {}, {}, data);

export const getResidenceById = (oid) => getRequest(urlDefinitions.GET_RESIDENCE_BY_ID, {}, oid);

export const getResidenceByAge = (age) => getRequest(urlDefinitions.GET_RESIDENCE_BY_AGE, {}, age);

export const editResidence = (data) => postRequest(urlDefinitions.EDIT_RESIDENCE, {}, {}, data);

export const deleteResidence = (data) => postRequest(urlDefinitions.DELETE_RESIDENCE, {}, {}, data);

export const getNumberFamilies = (data) =>  getRequest(urlDefinitions.GET_NUMBER_OF_FAMILIES);

//export const uploadResidenceExcelFile = (data) => postFileRequest(urlDefinitions.UPLOAD_CANDIDATE_EXCEL_FILE, data);