import {getRequest, postRequest} from "../httprequest";
import * as urlDefinitions from "../url_definitions";

export const getTransactions = () => getRequest(urlDefinitions.GET_TRANSACTIONS);

export const addTransaction = (data) => postRequest(urlDefinitions.ADD_TRANSACTION, {}, {}, data);

export const getTransactionById = (oid) => getRequest(urlDefinitions.GET_TRANSACTION_BY_ID, {}, oid);

export const editTransaction = (data) => postRequest(urlDefinitions.EDIT_TRANSACTION, {}, {}, data);

export const deleteTransaction = (data) => postRequest(urlDefinitions.DELETE_TRANSACTION, {}, {}, data);

export const getTransactionsSorted = () => getRequest(urlDefinitions.GET_TRANSACTIONS_SORTED);
