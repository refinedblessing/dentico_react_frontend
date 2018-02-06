import {
  loadPatients,
  updatePatient,
  setCurrentPatient,
  createPatient
} from '../actionTypes/patientActionTypes';
import {
  success,
  error
} from '../actionTypes/notificationActionTypes';
import { Patients } from '../api';
import { notificationAction } from './notificationActionCreator';

export const loadPatientsAction = () => {
  const payload = Patients.all();
  return { type: loadPatients, payload };
};

const notifier = (dispatch, { type, message }) => {
  return dispatch(notificationAction({ type, message }));
};

const updatePatientAction = patient => dispatch => {
  const payload = Patients.update(patient);
  dispatch({ type: updatePatient, payload })
    .then(() => {
      dispatch(loadPatientsAction());
      return notifier(dispatch, {
        type: success,
        message: 'Successfully Updated Patient!'
      });
    }
  ).catch(err => {
    return notifier(dispatch, {
      type: error,
      message: 'Error occurred: Patient not updated!'
    });
  });
};

const createPatientAction = patient => dispatch => {
  const payload = Patients.create(patient);
  dispatch({ type: createPatient, payload })
    .then(() => {
      dispatch(loadPatientsAction());
      return notifier(dispatch, {
        type: success,
        message: 'Successfully Created Patient!'
      });
    }
  ).catch(err => {
    return notifier(dispatch, {
      type: error,
      message: 'Error occurred: Patient not created!'
    });
  });
};

export const savePatientAction = patient => dispatch => {
  if(patient.id) {
    return dispatch(updatePatientAction(patient));
  } else {
    return dispatch(createPatientAction(patient));
  }
};

export const setCurrentPatientAction = (patient) => {
  return { type: setCurrentPatient, patient };
};
