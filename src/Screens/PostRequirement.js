import React from 'react';
import { StyleSheet, Text, ScrollView, Dimensions, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import Logouticon from "../Components/Header/logout";
import Menuicon from "../Components/Header/header";
import { AntDesign } from '@expo/vector-icons';
import {
    Form,
    Item as FormItem,
    Input,
    Label,
    Picker,
    Icon
} from 'native-base';
const screen = Dimensions.get('window');

class Post extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <Menuicon navigation={navigation} />
            ),
            headerRight: (
                <Logouticon navigation={navigation} />
            )
        }
    };
    state = {
        bloodgroupArr: ["A +",
            "B +",
            "O +",
            "A -",
            "B -",
            "O -"],
        bloodgroup: "",
        noOfUnit: "",
        urgency: ["Urgent",
            "Within 5 hours",
            "Within 12 hours",
            "Within 24 hours",
            "Within 2 days",
            "Within Week"],
        urgencyValue: "",
        country: "Pakistan",
        province: "Sindh",
        city: "Karachi",
        hospitalArr: ["Indus Hospital",
            "Ziauddin Hospital",
            "Agha Khan Hospital",
            "Liaquat National Hospital",
            "OMI",
            "Jinnah Hospital",
            "Holy Family Hospital"],
        hospital: "",
        relationsArr: ["Father",
            "Mother",
            "Son",
            "Daughter",
            "Aunt",
            "Uncle",
            "Nephew",
            "Niece",
            "Friend",
            "Neighbour",
            "None"
        ],
        relation: "",
        contact: "",
        additional: "",
        status: "not fullfilled",
        userTok: []

    }
    sendNotifications = async () => {
        let { bloodgroup, noOfUnit, hospital, userTok } = this.state;
        let { firstName, lastName } = this.props.user
        userTok.map(async (ele) => {
            const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    to: ele.expToken,
                    sound: 'default',
                    title: "Blood Required",
                    body: `${firstName} ${lastName} required ${noOfUnit} Units of ${bloodgroup} Blood Group At ${hospital}`,
                    data: { data: 'goes here' },
                }),
            });
        })
    }
    postReq = () => {
        let { bloodgroup, noOfUnit, urgencyValue, relation, contact, hospital, country, province, city, additional, status } = this.state;
        let { _id, firstName, lastName } = this.props.user
        if (bloodgroup === "") {
            alert("Select Blood Group ")
            return false;
        }
        if (noOfUnit === "") {
            alert("Enter no of Unit")
            return false;
        }
        if (urgencyValue === "") {
            alert("Select urgency")
            return false
        }
        if (hospital === "") {
            alert("Select hospital")
            return false;
        }
        if (relation === "") {
            alert("Select Relation ")
            return false;
        }
        if (contact === "") {
            alert("Enter Contact Details")
            return false
        }
        fetch('http://192.168.0.33:3003/post/postrequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bloodgroup, noOfUnit, urgency: urgencyValue, country, province,
                city, hospital, relation, contact, additional, userID: _id, name: `${firstName} ${lastName}`, status
            })
        })
            .then((response) => response.json())
            .then((response) => {
                this.sendNotifications()
                this.props.navigation.navigate("Home")
                alert(response.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    fetchUser = () => {
        fetch('http://192.168.0.33:3003/users/getUsers')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    userTok: response
                })
            })
            .catch((err) => {
                console.log(err, "123321312321")
            })
    }
    componentDidMount() {
        this.fetchUser()
    }
    render() {
        let { bloodgroupArr, bloodgroup, noOfUnit, urgency, urgencyValue, country, province, city
            , hospitalArr, hospital, relation, relationsArr, contact, additional
        } = this.state;
        return (
            <ScrollView contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }} style={styles.Container} >
                <KeyboardAvoidingView behavior="padding" style={{
                    width: screen.width - 30
                }}>
                    <Form>
                        <Label style={styles.labelStyle}>Blood Group</Label>
                        <FormItem picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={styles.pickerStyle}
                                selectedValue={bloodgroup}
                                onValueChange={(value) => this.setState({ bloodgroup: value })}
                            >
                                {
                                    bloodgroupArr.map((blood, i) => {
                                        return <Picker.Item key={i} label={blood} value={blood} />
                                    })
                                }
                            </Picker>
                        </FormItem>
                        <Label style={styles.labelStyle}>No of Unit Required</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input maxLength={2} style={styles.inputStyle} value={noOfUnit} onChangeText={(value) => this.setState({ noOfUnit: value })} placeholder="No of Unit Required" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Urgency</Label>
                        <FormItem picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={styles.pickerStyle}
                                selectedValue={urgencyValue}
                                onValueChange={(value) => this.setState({ urgencyValue: value })}
                            >
                                {
                                    urgency.map((ur, i) => {
                                        return <Picker.Item key={i} label={ur} value={ur} />
                                    })
                                }
                            </Picker>
                        </FormItem>
                        <Label style={styles.labelStyle}>Country</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input style={styles.inputStyle} value={country} disabled={true} />
                        </FormItem>
                        <Label style={styles.labelStyle}>State</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input style={styles.inputStyle} value={province} disabled={true} />
                        </FormItem>
                        <Label style={styles.labelStyle}>City</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input style={styles.inputStyle} value={city} disabled={true} />
                        </FormItem>
                        <Label style={styles.labelStyle}>Hospital</Label>
                        <FormItem picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={styles.pickerStyle}
                                selectedValue={hospital}
                                onValueChange={(value) => this.setState({ hospital: value })}
                            >
                                {
                                    hospitalArr.map((hos, i) => {
                                        return <Picker.Item key={i} label={hos} value={hos} />
                                    })
                                }
                            </Picker>
                        </FormItem>
                        <Label style={styles.labelStyle}>Your relation with patient</Label>
                        <FormItem picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={styles.pickerStyle}
                                selectedValue={relation}
                                onValueChange={(value) => this.setState({ relation: value })}
                            >
                                {
                                    relationsArr.map((rel, i) => {
                                        return <Picker.Item key={i} label={rel} value={rel} />
                                    })
                                }
                            </Picker>
                        </FormItem>
                        <Label style={styles.labelStyle}>Contact no</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input maxLength={11} style={styles.inputStyle} value={contact} onChangeText={(value) => this.setState({ contact: value })} placeholder="Enter your Contact No" />
                        </FormItem>
                        <Label style={styles.labelStyle}>Additional Instructions</Label>
                        <FormItem style={styles.formItemStyle}>
                            <Input multiline={true} numberOfLines={4} style={styles.inputStyle} value={additional} onChangeText={(value) => this.setState({ additional: value })} placeholder="Enter Additional Instructions (Optional)" />
                        </FormItem>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style=
                            {{
                                backgroundColor: "#EF5350",
                                color: "#EF5350",
                                padding: 10,
                                margin: 10,
                                marginTop: 30,
                                borderRadius: 15
                            }}
                            onPress={this.postReq}
                        >
                            <Text style={{
                                fontSize: 22, textAlign: "center", color: "#fff", letterSpacing: 3
                            }}>Post Requirement <AntDesign name="plus" size={20} /></Text>
                        </TouchableOpacity>
                    </Form>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.authReducers.user
    })
}
export default connect(mapStateToProps, null)(Post)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formItemStyle: {
        marginTop: 10,
        marginBottom: 5
    },
    labelStyle: {
        fontSize: 20, marginTop: 10,
    },
    inputStyle: {
        paddingLeft: 5, fontSize: 20,
    }
});