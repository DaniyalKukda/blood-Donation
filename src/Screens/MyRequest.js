import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import { Content, Card, CardItem, Body } from 'native-base';
import Logouticon from "../Components/Header/logout";
import Menuicon from "../Components/Header/header";

class Myrequest extends React.Component {
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
        fetch(`http://192.168.0.33:3003/post/myrequest${this.props.user._id}`)
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
    componentDidMount() {
        this.fetchReq()
    }
    render() {
        console.log(this.props.user._id)
        return (
            <View style={styles.container}>
                <Content padder>
                    {
                        this.state.req.map((val, i) => {
                            return <Card key={i}>
                                <CardItem bordered>
                                    <Body>
                                        <Text>
                                            {`Required ${val.noOfUnit} units of a ${val.bloodgroup} Blood Group ${val.hospital} Hospital`}
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text style={{ fontWeight: "700" }}>Status: </Text><Text>{val.status}</Text>
                                        </View>
                                    </Body>
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
export default connect(mapStateToProps, null)(Myrequest)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});