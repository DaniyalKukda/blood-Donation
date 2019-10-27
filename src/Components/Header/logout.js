import React from 'react'
import { Entypo } from '@expo/vector-icons';
import { removeUser } from "../../Redux/actions/index"
import { connect } from 'react-redux'

class Logout extends React.Component {
    logoutUser = () => {
        this.props.navigation.navigate("Login")
        this.props.removeUser()
    }
    render() {
        return (
            <Entypo name="log-out" style={{ marginRight: 15 }} size={32} color="#EF5350" onPress={() => this.logoutUser()} />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeUser: () => dispatch(removeUser())
    }
  }
  export default connect(null, mapDispatchToProps)(Logout);