import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar
} from "react-native";

import CustomButton from "./CustomButton";

export default class SignUp extends Component {
  state = {
    username: null,
    password: null
  };
  constructor(props) {
    super(props);
    this._fetchData = this._fetchData.bind(this);
  }

  _fetchData() {
    const { username, password } = this.state;
    if (username && password) {
      let params = {
        name: username,
        pswrd: password
      };

      let query = Object.keys(params)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

      let url = "http://localhost:8080/login?" + query;

      fetch(url);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <TextInput
          placeholder="full name"
          placeholderTextColor="#FFF"
          returnKeyType="next"
          ref={input => (this.fullnameInput = input)}
          onChangeText={text => this.setState({ fullname: text })}
          onSubmitEditing={() => this.emailInput.focus()}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="username or email"
          placeholderTextColor="#FFF"
          returnKeyType="next"
          ref={input => (this.emailInput = input)}
          onChangeText={text => this.setState({ username: text })}
          onSubmitEditing={() => this.passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="#FFF"
          returnKeyType="go"
          secureTextEntry
          style={styles.input}
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={() => this.passwordInput.focus()}
          onChangeText={text => this.setState({ password: text })}
        />

        <CustomButton
          onPress={() => {
            this._fetchData();
            this.props.navigation.navigate("Preference");
          }}
          text="Sign Up"
        />
      </View>
    );
  }
}

SignUp.navigationOptions = {
    header: null
  };

// const apiUserData = 'http://localhost:8080/login';
// async function getUserFromServer() {
//   try {
//     let response = await fetch(apiUserData)
//     let responseJson = await response.json;
//     return responseJson.data;
//   } catch (error) {

//   }
// }

// fetch("https://localhost:8080/login", {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     name: 'one',
//     pswrd: 'two',
//   }),
// });

// function getData() {
//   return fetch('http://localhost:8080/login')
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.movies;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 100
  },
  input: {
    height: 50,
    backgroundColor: "rgba(68, 126, 36, 0.6)",
    marginBottom: 20,
    color: "#FFF",
    paddingHorizontal: 10,
    borderRadius: 5
  },
  blue: {
    color: "rgba(44, 130, 201, 1)"
  },
  buttonContainer: {
    height: 55,
    backgroundColor: "rgba(68, 126, 36, 1)",
    paddingVertical: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "700",
    justifyContent: "center",
    alignItems: "center"
  }
});