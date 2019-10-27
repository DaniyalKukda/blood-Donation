import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";

class Menu extends React.Component {

    navlinks(nav, text) {
        return (
            <TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
                <Text style={styles.links}>{text}</Text>
            </TouchableOpacity>
        )
    }
    state = {
        firstName: "",
        bloodgroup: ""
    }
    componentDidMount() {
        if (this.props.user) {
            this.setState({
                firstName: this.props.user.firstName,
                bloodgroup: this.props.user.bloodgroup
            })
        }
    }
    render() {
        let { firstName, bloodgroup } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.topLinks}>
                    <View style={styles.profile}>
                        <View style={styles.profileText}>
                            <Text style={styles.displayName}>{firstName}</Text>
                            <Text style={styles.bloodgroup}>{"Blood Group  " + bloodgroup}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomLinks}>
                    {this.navlinks("Home", "Home")}
                    {this.navlinks("MyRequest", "My Request")}
                    {this.navlinks("PostRequirement", "Post Requirement")}
                    {this.navlinks("Notifications", "Notifications")}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
    },
    profile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: "#777777"
    },
    profileText: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center"
    },
    displayName: {
        fontSize: 24,
        fontWeight: "600",
        paddingBottom: 5,
        color: "black",
        textAlign: "left",
        marginLeft: 20
    },
    bloodgroup: {
        fontSize: 20,
        fontWeight: "500",
        paddingBottom: 5,
        color: "black",
        textAlign: "left",
        marginLeft: 20
    }
    ,
    links: {
        flex: 1,
        fontSize: 20,
        padding: 6,
        paddingLeft: 14,
        margin: 5,
        textAlign: "left",
        color: "#fff"
    },
    topLinks: {
        height: 140,
        backgroundColor: "white"
    },
    bottomLinks: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 450,
        backgroundColor: "#EF5350"
    }
});

const mapStateToProps = (state) => {
    return ({
        user: state.authReducers.user
    })
}

export default connect(mapStateToProps, null)(Menu)