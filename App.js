import React from 'react';
import { Provider } from "react-redux";
import { ActivityIndicator, View , StyleSheet} from "react-native";
import { store, persistor } from "./src/Redux/store/index";
import { PersistGate } from "redux-persist/integration/react"
import Navigator from "./src/Navigation/navigator";

export default class App extends React.Component {
  renderLoading = () => {
    <View style={styles.container}>
      <ActivityIndicator size={"large"} />
    </View>
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

