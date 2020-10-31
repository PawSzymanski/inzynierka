import * as actionTypes from "../models/ActionModel"
import * as payloadModel from "../models/StoreModel"
import { Action } from "../actions/actionTypes";

export type rootState = payloadModel.rootStore;

const initialState: rootState = {
    loggedIn: false,
    patients: [],
    isAlive: true,
    currPatientId: null,
};

export function rootReducer(state: rootState = initialState, action: Action) {
    switch (action.type) {
        case actionTypes.rootTypes.SET_TEST: {
            return {
                ...state,
                loggedIn: !state.loggedIn,
            }
        }
        case actionTypes.rootTypes.IS_ALIVE: {
            return {
                ...state,
                loggedIn: !state.loggedIn,
                isAlive: !state.isAlive,
            }
        }
        case actionTypes.rootTypes.GET_PATIENTS: {
            return {
                ...state,
                patients: action.payload,
            }
        }
        case actionTypes.rootTypes.SET_USER_ID: {
            return {
                ...state,
                currPatientId: action.payload,
            }
        }
        default:
            return state;
    }
};