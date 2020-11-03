import * as payloadModel from "../models/StoreModel";
import * as actionTypes from "../models/ActionModel";
import axios from "axios";
import { Action } from "./actionTypes";
import {ActionCreator, Dispatch} from "redux"
import {ThunkAction} from "redux-thunk";

export const getAllPatients: ActionCreator<ThunkAction<
    // The type of the last action to be dispatched - will always be promise<T> for async actions
    Promise<any>,
    // The type for the data within the last action
    any[],
    // The type of the parameter for the nested function
    null,
    // The type of the last action to be dispatched
    any
    >> = () => {
    return async (dispatch: Dispatch) => {
        const data = await axios.get('/api/patients');
        const event: any = {
            type: actionTypes.rootTypes.GET_PATIENTS,
                payload: data.data._embedded.patients
        };
        return dispatch(event);
    };
};


