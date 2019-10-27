import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import Logouticon from "../Components/Header/logout";
import Menuicon from "../Components/Header/header";
import { Content, Card, CardItem, Body, Input, Button, H2, H1 } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import List from "../Components/list";
import { connect } from "react-redux"

class Details extends React.Component {
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
        data: {},
        listView: false,
        volunter: [],
        comment: "",
        allComment: [],
        volunterL:""
    }
    fetchVolunter = () => {
        fetch(`http://192.168.0.33:3003/volunter/getvolunter${this.state.data._id}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    volunter: response,
                    volunterL:response.length
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    fetchComment = () => {
        fetch(`http://192.168.0.33:3003/comment/getcomment${this.state.data._id}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    allComment: response
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    rapFunctions = () => {
        this.fetchVolunter();
        this.fetchComment();
    }
    postComment = () => {
        let { firstName, lastName } = this.props.user
        let { _id } = this.state.data;
        let { comment } = this.state;
        fetch('http://192.168.0.33:3003/comment/commentPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: firstName + " " + lastName, comment: comment, postID: _id })
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    comment: ""
                })
                this.fetchComment()
            })
            .catch((err) => {
                console.log(err, "er")
            })
    }
    componentDidMount() {
        this.setState({
            data: this.props.navigation.getParam('data', '{}')
        }, () => this.rapFunctions())
    }
    render() {
        let { data, listView, volunter, comment, allComment , volunterL } = this.state;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView behavior="padding">
                        <Content padder>
                            <Card>
                                <CardItem header bordered>
                                    <Text>{data.name}</Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Units Required : </Text><Text>{data.noOfUnit}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Volunteers : </Text><Text>{volunterL}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Blood Group : </Text><Text>{data.bloodgroup}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Location : </Text><Text>{data.city + " , " + data.province + " , " + data.country}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Hospital : </Text><Text>{data.hospital}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Urgency : </Text><Text>{data.urgency}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Relation With Pateint : </Text><Text>{data.relation}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Contact : </Text><Text>{data.contact}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyle}> Additional Info : </Text><Text>{data.additional + "Call me when you reached"}</Text>
                                        </View>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Button style={styles.volunteerBtn} block iconLeft onPress={() => this.setState({ listView: !listView })}>
                                <Text style={{ color: "#fff", fontSize: 18 }}>Volunteers List</Text>
                                <FontAwesome name="caret-down" color="#fff" size={20} />
                            </Button>
                            {
                                listView && <List volunter={volunter} />
                            }
                            {/* <View> */}
                            <H1 style={{ color: "#EF5350", alignSelf: "center", marginTop: 10  , marginBottom:5}}>Comments</H1>
                            {/* </View> */}
                            {
                                allComment.map((value, i) => {
                                    return <View key={i} style={{ marginTop: 10 , marginLeft:10 }}>
                                        <H2>{value.name}</H2>
                                        <Text style={{ marginBottom: 5, color: "#82807c", fontSize: 16 }}>{value.comment}</Text>
                                    </View>
                                })
                            }
                        </Content>
                    </KeyboardAvoidingView>
                </ScrollView>
                <KeyboardAvoidingView style={{ left: 0, right: 0, bottom: 0 }} behavior="position">
                    <View style={styles.viewStyleIpt}>
                        <Input style={styles.input} value={comment} onChangeText={(value) => this.setState({ comment: value })} placeholder="Comments" />
                        <TouchableOpacity style={{ backgroundColor: "#EF5350", width: 40, alignItems: "center", justifyContent: "center" }} onPress={this.postComment}>
                            <FontAwesome name="send" color="#fff" size={20} />
                        </TouchableOpacity>
                    </View>
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
export default connect(mapStateToProps, null)(Details)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
        bottom: 0,
    },
    input: {
        width: '100%',
        paddingLeft: 10,
        borderTopColor: "#EF5350",
        borderTopWidth: 2,
        borderStyle: "solid"
    },
    viewStyle: {
        flexDirection: "row",
        marginTop: 10
    },
    viewStyleIpt: {
        flexDirection: "row",
    },
    textStyle: {
        fontWeight: "700"
    },
    volunteerBtn: {
        backgroundColor: "#EF5350",
        justifyContent: "space-around",
        marginTop: 5
    }
});