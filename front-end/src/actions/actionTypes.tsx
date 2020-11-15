import * as actionTypes from "../models/ActionModel"
import * as payloadModel from "../models/StoreModel"

export type testMessageAction = {
    type: typeof actionTypes.rootTypes.SET_TEST
    payload: payloadModel.rootStore;
}

export type isAliveAction = {
    type: typeof actionTypes.rootTypes.IS_ALIVE;
    payload: payloadModel.rootStore;
}

export type getAllPatients = {
    type: typeof actionTypes.rootTypes.GET_PATIENTS;
    payload: payloadModel.rootStore;
}

export type setPatientId = {
    type: typeof actionTypes.rootTypes.SET_USER_ID;
    payload: payloadModel.rootStore;
}

export type setPatientMarkers = {
    type: typeof actionTypes.rootTypes.SET_PATIENT_MARKERS;
    payload: payloadModel.rootStore;
}

export type Action = testMessageAction | isAliveAction | getAllPatients | setPatientId |
    setPatientMarkers;