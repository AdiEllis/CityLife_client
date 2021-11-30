import {getRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getColonies = () => getRequest(urlDefinitions.GET_COLONIES);

export const addColony = (data) => postRequest(urlDefinitions.ADD_COLONY, {}, {}, data);

export const getColonyById = (id) => getRequest(urlDefinitions.GET_COLONY_BY_ID, {}, id);

export const editColony = (data) => postRequest(urlDefinitions.EDIT_COLONY, {}, {}, data);

export const deleteColony = (data) => postRequest(urlDefinitions.DELETE_COLONY, {}, {}, data);