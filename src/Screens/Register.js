import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {
    Text,
    Form,
    Item as FormItem,
    Input,
    Label,
    Picker,
    Icon
} from 'native-base';
const screen = Dimensions.get('window');

class Register extends React.Component {
    static navigationOptions = {
        header: null,
    };
    state = {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        dropdown: null,
        bloodgroup: ["A +",
            "B +",
            "O +",
            "A -",
            "B -",
            "O -"],
        expToken: ""
    }
    registerUser = () => {
        let { firstName, lastName, email, password, dropdown , expToken } = this.state;
        if (firstName === null) {
            alert("Enter first Name")
            return false;
        }
        if (lastName === null) {
            alert("Enter last Name")
            return false;
        }
        if (email === null) {
            alert("Enter Email")
            return false
        }
        var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (reg.test(email) === false) {
            alert("Invalid Email Address")
            return false
        }
        if (password === null) {
            alert("Enter Password")
        }
        if (password.length <= 5 || password.length > 11) {
            alert("Enter Password atleast 6 to 12 Characters or digits")
            return false
        }
        if (dropdown === null) {
            alert("Select Your Blood Group")
            return false
        }
        fetch('http://192.168.0.33:3003/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password, bloodgroup: dropdown , expToken })
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    dropdown: ""
                })
                this.props.navigation.navigate("Login")
                alert(response.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    componentDidMount() {
        let expToken = this.props.navigation.getParam('expToken', '')
        this.setState({
            expToken
        })
    }
    render() {
        let { firstName, lastName, email, password, dropdown, bloodgroup , expToken} = this.state;
        return (
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }} style={styles.Container} >
                {/* <View style={styles.container}> */}
                <View style={{ flexDirection: "row", marginTop: 50 }}>
                    <Text style={styles.heading}>Register</Text>
                    <AntDesign name="adduser" style={styles.icon} size={40} />
                </View>

                <KeyboardAvoidingView behavior="padding" style={{
                    width: screen.width - 30
                }}>
                    <Form>
                        <Label style={styles.labelStyle}>First Name</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={firstName} onChangeText={(value) => this.setState({ firstName: value })} style={styles.inputStyle} placeholder="Enter First Name" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Last Name</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={lastName} onChangeText={(value) => this.setState({ lastName: value })} style={styles.inputStyle} placeholder="Enter Last Name" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Email Name</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={email} onChangeText={(value) => this.setState({ email: value })} style={styles.inputStyle} placeholder="example@mail.com" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Password</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input value={password} onChangeText={(value) => this.setState({ password: value })} style={styles.inputStyle} secureTextEntry={true} placeholder="*******" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Blood Group</Label>
                        <FormItem picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={styles.pickerStyle}
                                placeholder="Select your Blood Group"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#EF5350"
                                selectedValue={dropdown}
                                onValueChange={(value) => this.setState({ dropdown: value })}
                            >
                                {
                                    bloodgroup.map((blood, i) => {
                                        return <Picker.Item key={i} label={blood} value={blood} />
                                    })
                                }
                            </Picker>
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
                            onPress={this.registerUser}
                        >
                            <Text style={{
                                fontSize: 22, textAlign: "center", color: "#EF5350", letterSpacing: 3
                            }}>Register <AntDesign name="adduser" size={20} /></Text>
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
                            onPress={() => this.props.navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 18, textAlign: "center", color: "#fff", letterSpacing: 3, textDecorationLine: "underline"
                            }}>Already Have an Account ? </Text>
                        </TouchableOpacity>
                    </Form>
                </KeyboardAvoidingView>
                {/* </View> */}
            </ScrollView>
        );
    }
}

export default Register

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#EF5350',
    },
    heading: {
        color: "white",
        fontSize: 55,
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
    },
    pickerStyle: {
        backgroundColor: "white", borderRadius: 50, width: 50
    }
});