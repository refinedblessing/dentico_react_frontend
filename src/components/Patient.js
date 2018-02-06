import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import {
  loadPatientsAction,
  savePatientAction,
  setCurrentPatientAction
} from '../actionCreators/patientActionCreators';
import PatientModal from '../modals/patientModal';

class Patient extends React.Component {
  state = { showModal: false, currPatient: {} };

  componentDidMount() {
    this.props.loadPatients();
  }

  componentWillReceiveProps(props) {
    this.setState({ currPatient: props.currPatient });
  }

  closePatientModal = () => {
    this.setState({ show: false });
  }

  showPatientModal = patient => {
    this.props.setCurrentPatient(patient);
    this.setState({ show: true });
  }

  createPatient = () => {
    const newPatientObj = { name: '', age: 0, email: '', phone: '', sex: 'male', id: null };
    this.showPatientModal(newPatientObj);
  }

  render() {
    return (
      <div className="Patient">
        <Table hover condensed responsive className="table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Age</th>
              <th scope="col">Sex</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.patients.map(patient => (
                <tr key={patient.id} onClick={() => this.showPatientModal(patient)}>
                  <th scope="row">{patient.id}</th>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.age}</td>
                  <td>{patient.sex.slice(0,1).toUpperCase()}</td>
                </tr>
                )
              )
            }
          </tbody>
        </Table>
        <div onClick={this.createPatient} className="AddPatient"><i className="fas fa-plus-circle"/></div>
        <PatientModal show={this.state.show} handleClose={this.closePatientModal} patientData={this.state.currPatient} handleSave={this.props.savePatient}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  patients: state.patientReducer.patients,
  currPatient: state.patientReducer.currPatient
});

const mapDispatchToProps = dispatch => ({
  loadPatients: () => dispatch(loadPatientsAction()),
  setCurrentPatient: (patient) => dispatch(setCurrentPatientAction(patient)),
  savePatient: (patient) => dispatch(savePatientAction(patient))
});

Patient.propTypes = {
  patients: PropTypes.array,
  loadPatients: PropTypes.func,
  setCurrentPatient: PropTypes.func,
  savePatient: PropTypes.func,
  currPatient: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Patient);