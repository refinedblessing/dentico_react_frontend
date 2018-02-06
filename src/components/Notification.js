import React, { Component } from 'react';
import NotificationSystem from 'react-notification-system';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Notifier extends Component {
  componentWillReceiveProps(props) {
    this.showNotification(props);
  }

  showNotification = (props) => {
    const notificationSystem = this.refs.notificationSystem;
    const { message, level } = props;
    notificationSystem.addNotification({
      message,
      level
    });
  }

  render() {
    return (
      <div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}

Notifier.propTypes = {
  message: PropTypes.string,
  level: PropTypes.string
};

const mapStateToProps = (state) => ({
  message: state.notificationReducer.message,
  level: state.notificationReducer.level
});

export default connect(mapStateToProps)(Notifier);

