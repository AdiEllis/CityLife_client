import {getRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getStreets = () => getRequest(urlDefinitions.GET_STREETS);

export const addStreet = (data) => postRequest(urlDefinitions.ADD_STREET, {}, {}, data);

export const getStreetById = (oid) => getRequest(urlDefinitions.GET_STREET_BY_ID, {}, oid);

export const getStreetByColonyId = (colonyID) => getRequest(urlDefinitions.GET_STREET_BY_COLONY_ID, {}, colonyID);

export const editStreet = (data) => postRequest(urlDefinitions.EDIT_STREET, {}, {}, data);

export const deleteStreet = (data) => postRequest(urlDefinitions.DELETE_STREET, {}, {}, data);