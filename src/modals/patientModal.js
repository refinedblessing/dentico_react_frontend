import React from 'react';
import {
  Modal,
  Button,
  FormControl,
  FormGroup,
  ControlLabel,
  Form,
  Col
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class PatientModal extends React.Component {
  state = { name: '', age: 0, email: '', phone: '', sex: 'male', id: null, editable: false, valid: false };

  componentWillReceiveProps(props) {
    const editable = !props.patientData.id;
    this.setStateWithProps({ ...props.patientData, editable, valid: false });
  }

  setStateWithProps = (props) => {
    this.setState(() => ({ ...props }));
  }

  handleChange = (e) => {
    const target = e.target;
    this.setState((prevState) => {
      const valid = this.isValid({...prevState, [target.name]: target.value});
      return { [target.name]: target.value, valid };
    });
  }

  toggleEdit = () => {
    this.setState((prevState) => ({editable: !prevState.editable}));
  }

  cancelEdit = () => {
    if(this.state.id) {
      this.setStateWithProps({ ...this.props.patientData, editable: false });
    } else {
      this.props.handleClose();
    }
  }

  isValid = (state) => {
    let valid = true;
    const { name, email, phone, age } = state;
    const fieldsToValidate = { name, email, phone, age };
    Object.keys(fieldsToValidate).forEach(function(key) {
      const value = String(fieldsToValidate[key]);
      const length = value.trim().length;
      if (length === 0) valid = false;
    });
    return valid;
  }

  handleSave = () => {
    this.props.handleSave(this.state);
    this.toggleEdit();
  }

  render() {
    const { show, handleClose } = this.props;
    const { name, age, email, phone, sex, id, valid, editable } = this.state; 
    return (
      <div>
        <Modal show={show} onHide={handleClose} className="PatientModal">
          <Modal.Header closeButton>
            <Modal.Title>Patient No: {id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { editable ?
            <Form horizontal>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2} md={2} sm={2}>
                  Name
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <FormControl
                    type="text"
                    value={name}
                    name="name"
                    onChange={this.handleChange}
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2} md={2} sm={2}>
                  Phone
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <FormControl
                    type="text"
                    value={phone}
                    name="phone"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2} md={2} sm={2}>
                  Email
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <FormControl
                    type="email"
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2} md={2} sm={2}>
                  Age
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <FormControl
                    type="number"
                    value={age}
                    name="age"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col componentClass={ControlLabel} lg={2} md={2} sm={2}>
                  Sex
                </Col>
                <Col lg={10} md={10} sm={10}>
                  <FormControl value={sex} name="sex" componentClass="select" onChange={this.handleChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormControl>
                </Col>
              </FormGroup>
            </Form> :
            <div>
              <Col lg={2} md={2} sm={2}>
                <p>Name:</p>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <p>{name}</p>
              </Col>
              <Col lg={2} md={2} sm={2}>
                <p>Phone:</p>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <p>{phone}</p>
              </Col>
              <Col lg={2} md={2} sm={2}>
                <p>Email:</p>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <p>{email}</p>
              </Col>
              <Col lg={2} md={2} sm={2}>
                <p>Age:</p>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <p>{age}</p>
              </Col>
              <Col lg={2} md={2} sm={2}>
                <p>Sex:</p>
              </Col>
              <Col lg={10} md={10} sm={10}>
                <p>{sex}</p>
              </Col>
            </div>
            }
          </Modal.Body>
          <Modal.Footer>
            { editable ?
              <React.Fragment>
                <Button onClick={this.handleSave} disabled={!valid} bsStyle="primary">Save</Button>
                <Button onClick={this.cancelEdit} bsStyle="danger">Cancel</Button>
              </React.Fragment>
              :
              <Button onClick={this.toggleEdit} bsStyle="primary">Edit</Button>
            }
            
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

PatientModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  patientData: PropTypes.object
};

export default PatientModal;