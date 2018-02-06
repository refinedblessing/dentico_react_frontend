import {
  loadPatientsFulfilled,
  loadPatientsRejected,
  updatePatientFulfilled,
  updatePatientRejected,
  createPatientFulfilled,
  createPatientRejected,
  setCurrentPatient
} from '../actionTypes/patientActionTypes';

const initialState = { 
  patients: [],
  currPatient: {}
};

const patientReducer = (state = initialState, action) => {
  switch(action.type) {
    case setCurrentPatient:
      return { ...state, currPatient: action.patient };
    case loadPatientsFulfilled:
      return { ...state, patients: action.payload.data };
    case loadPatientsRejected:
      return { ...state };
    case updatePatientFulfilled:
      return { ...state, currPatient: action.payload.data };
    case updatePatientRejected:
      return { ...state };
    case createPatientFulfilled:
      return { ...state, currPatient: action.payload.data };
    case createPatientRejected:
      return { ...state };
    default:
      return state;
  }
};

export default patientReducer;