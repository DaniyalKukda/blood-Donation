import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { Content, Card, CardItem, Body, Left, Right } from 'native-base';
import Logouticon from "../Components/Header/logout";
import Menuicon from "../Components/Header/header";
import { FontAwesome } from '@expo/vector-icons';

class Home extends React.Component {
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
        req: []
    }
    fetchReq = () => {
        fetch('http://192.168.0.33:3003/post/getrequest')
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    req: response
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    volunterReq = (id) => {
        let { firstName , lastName} = this.props.user
        fetch('http://192.168.0.33:3003/volunter/postvolunter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: firstName + " " +lastName, postID: id })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.message) {
                    alert(response.message)
                    return false
                }
            })
            .catch((err) => {
                console.log(err, "er")
            })
    }
    componentDidMount() {
        this.fetchReq()
    }
    render() {
        return (
            <View style={styles.container}>
                <Content padder>
                    {
                        this.state.req.map((val, i) => {
                            return <Card key={i}>
                                <CardItem header bordered button onPress={() => this.props.navigation.navigate("Details", {
                                    data: val
                                })}>
                                    <Text>{val.name}</Text>
                                </CardItem>
                                <CardItem bordered button onPress={() => this.props.navigation.navigate("Details", {
                                    data: val
                                })}>
                                    <Body>
                                        <Text>
                                            {`${val.noOfUnit} units of a ${val.bloodgroup} Blood Group is required At ${val.hospital} Hospital for my ${val.relation}`}
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "700" }}>Contact At : </Text><Text>{val.contact}</Text>
                                        </View>
                                        <Text style={{ fontWeight: "700" }}>Additional Instrctions : </Text><Text>{`${val.additional} , Call me when you reached`}</Text>
                                    </Body>
                                </CardItem>
                                <CardItem footer bordered button onPress={() => this.props.navigation.navigate("Details", {
                                    data: val
                                })} >
                                    <Left>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style=
                                            {{
                                                backgroundColor: "#EF5350",
                                                color: "#EF5350",
                                                padding: 10,
                                                // margin: 10,
                                                // marginTop: 30,
                                                borderRadius: 15
                                            }}
                                            onPress={() => this.volunterReq(val._id)}
                                        >
                                            <Text style={{
                                                fontSize: 14, textAlign: "center", color: "#fff", letterSpacing: 3
                                            }}>Volunteer <FontAwesome name="users" size={14} /></Text>
                                        </TouchableOpacity>
                                    </Left>
                                    <Right>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style=
                                            {{
                                                backgroundColor: "#EF5350",
                                                color: "#EF5350",
                                                padding: 10,
                                                // margin: 10,
                                                // marginTop: 30,
                                                borderRadius: 15
                                            }}
                                            onPress={() => this.props.navigation.navigate("Details", {
                                                data: val
                                            })}
                                        >
                                            <Text style={{
                                                fontSize: 14, textAlign: "center", color: "#fff", letterSpacing: 3
                                            }}>Comment <FontAwesome name="comment" size={14} /></Text>
                                        </TouchableOpacity>
                                    </Right>
                                </CardItem>
                            </Card>
                        })
                    }
                </Content>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        user: state.authReducers.user
    })
}
export default connect(mapStateToProps, null)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});