import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    Text,
    Form,
    Item as FormItem,
    Input,
    Label,
} from 'native-base';
import { connect } from "react-redux";
import { updateUser } from "../Redux/actions/index";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';

const screen = Dimensions.get('window');

class Login extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        email: null,
        password: null,
        expToken: ""
    }
    login = () => {
        let { email, password } = this.state;
        if (email === null) {
            alert("Enter Email address")
            return false
        }
        var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (reg.test(email) === false) {
            alert("Invalid Email Address")
            return false
        }
        if (password === null) {
            alert("Enter password")
            return false
        }
        if (password < 8) {
            alert("Password is too Short")
            return false
        }
        fetch('http://192.168.0.33:3003/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    email: "",
                    password: ""
                })
                if (response.message) {
                    alert(response.message)
                    return false
                }
                this.props.updateUser(response)
                this.props.navigation.navigate("Home")
            })
            .catch((err) => {
                console.log(err, "er")
            })
    }
    registerForPushNotificationsAsync = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
            // Android remote notification permissions are granted during the app
            // install, so this will only ask on iOS
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
            return;
        }
        try {
            let expToken = await Notifications.getExpoPushTokenAsync();
            this.setState({
                expToken
            })
        } catch (error) {
            console.log(error)
        }
        // Get the token that uniquely identifies this device
    }
    async componentDidMount() {
        let { user } = this.props;
        if (user) {
            this.props.navigation.navigate("Home")
        }
        await this.registerForPushNotificationsAsync()
    }
    render() {
        let { email, password, expToken } = this.state;
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <Text style={styles.heading}>Login</Text>
                    <AntDesign name="login" style={styles.icon} size={40} />
                </View>
                <KeyboardAvoidingView behavior="padding" style={{
                    width: screen.width - 30
                }}>
                    <Form>
                        <Label style={styles.labelStyle}>Email</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={email} onChangeText={(value) => this.setState({ email: value })} style={styles.inputStyle} placeholder="example@mail.com" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Password</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={password} onChangeText={(value) => this.setState({ password: value })} style={styles.inputStyle} secureTextEntry={true} placeholder="*********" />
                        </FormItem>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style=
                            {{
                                backgroundColor: "#fff",
                                color: "#EF5350",
                                padding: 10,
                                margin: 10,
                                marginTop: 30,
                                borderRadius: 15
                            }}
                            onPress={() => this.login()}
                        >
                            <Text style={{
                                fontSize: 22, textAlign: "center", color: "#EF5350", letterSpacing: 3
                            }}>Login<AntDesign name="login" size={15} /></Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style=
                            {{
                                backgroundColor: "#EF5350",
                                color: "#fff",
                                padding: 10,
                                margin: 10,
                                marginTop: 10,
                                borderRadius: 15
                            }}
                            onPress={() => this.props.navigation.navigate("Register", {
                                expToken: expToken
                            })}
                        >
                            <Text style={{
                                fontSize: 18, textAlign: "center", color: "#fff", letterSpacing: 3, textDecorationLine: "underline"
                            }}>Create Account </Text>
                        </TouchableOpacity>
                    </Form>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return ({
        user: state.authReducers.user
    })
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (user) => dispatch(updateUser(user))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EF5350',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    heading: {
        color: "white",
        fontSize: 65,
        fontWeight: "600",
        letterSpacing: 2
    },
    icon: {
        color: "white", marginTop: 15, marginLeft: 10
    },
    formItemStyle: {
        borderBottomColor: "#EF5350",
        marginTop: 10,
        marginBottom: 5
    },
    labelStyle: {
        color: "white", fontSize: 20, marginLeft: 25
    },
    inputStyle: {
        backgroundColor: "white", borderRadius: 20, paddingLeft: 20, fontSize: 20
    }
});