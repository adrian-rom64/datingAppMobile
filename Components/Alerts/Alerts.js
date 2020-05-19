import React, { Fragment } from 'react'
import { Dimensions } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import { connect } from 'react-redux'
import { actions } from './store'
import colors from '../../assets/colors'

const screenWidth = Dimensions.get('screen').width

const Alerts = (props) => {

  const alerts = props.alerts.map(payload => {
    return (
      <AwesomeAlert
        key={payload.id}
        show={true}
        showProgress={false}
        title={payload.title}
        message={payload.text}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText={payload.button}
        confirmButtonColor={colors.lightBlue}
        onConfirmPressed={() => props.destroy(payload.id)}
        contentContainerStyle={{ width: screenWidth }}
      />
    )
  })

  return <Fragment>{alerts}</Fragment>
}

const mapStateToProps = state => ({ alerts: state.alert.alerts})

const mapDispatchToProps = dispatch => ({
  destroy: id => dispatch({ type: actions.DESTROY, id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
