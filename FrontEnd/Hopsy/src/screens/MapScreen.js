import React, { Component } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  Text,
  ActivityIndicator
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Header from "../components/Header";
import { MAP_API_KEY } from "react-native-dotenv";
import * as Permissions from "expo-permissions";

const maptheme = require("./maptheme.json");
const URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?query=brewery&key=" +
  MAP_API_KEY;

export default class MapScreen extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    // ask user for location
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status != "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, this.mergeCoords),
      error => console.log("Error:", error)
    );

    // fetch breweries from google api
    try {
      const brewresponse = await fetch(URL);
      if (!brewresponse.ok) {
        throw Error(brewresponse.statusText);
      }
      const json = await brewresponse.json();
      this.setState({ brewdata: json, loading: false });
      //console.log(this.state.brewdata);
      console.log("Success!");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { latitude, longitude, brewdata, loading } = this.state;
    if (loading) {
      return (
        <View style={styles.container}>
          <SafeAreaView />
          <Header text={"Brewery locator"} />
          <View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size="large" color="rgba(68, 126, 36, 1)" />
          </View>
        </View>
      );
    } else if (latitude && brewdata) {
      return (
        <View style={styles.container}>
          <SafeAreaView />
          <Header text={"Brewery locator"} />
          <MapView
            style={styles.mapStyle}
            customMapStyle={maptheme}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          >
            {brewdata.results.map(brewery => {
              if (brewery.opening_hours) {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: brewery.geometry.location.lat,
                      longitude: brewery.geometry.location.lng
                    }}
                    title={brewery.name}
                    key={brewery.id}
                    pinColor={"rgba(68, 126, 36, 1)"}
                  />
                );
              } else {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: brewery.geometry.location.lat,
                      longitude: brewery.geometry.location.lng
                    }}
                    title={brewery.name}
                    key={brewery.id}
                  />
                );
              }
            })}
          </MapView>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Header text={"Brewery locator"} />
        <Text>We need your permission!</Text>
      </View>
    );
  }
}

MapScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Expo.Constants.statusBarHeight
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  }
});
