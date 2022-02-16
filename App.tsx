import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import MapView from "react-native-maps";
import { EditablePolygon } from "./EditablePolygon";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

export type LatLng = {
  latitude: number;
  longitude: number;
};

export type MarkerType = {
  coordinate: LatLng;
  key: number;
  color: string;
};

const App = (props: any) => {
  const [region, setRegion] = React.useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [markers, setMarkers] = React.useState<MarkerType[]>([]);
  const id = useRef<number>(-1);
  const onMapPress = (e: any) => {
    id.current = id.current + 1;
    setMarkers([
      ...markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: id.current,
        color: randomColor(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={props.provider}
        style={styles.map}
        initialRegion={region}
        onPress={(e) => onMapPress(e)}
      >
        <EditablePolygon
          markers={markers}
          updateMarker={(updatedMarker: MarkerType) => {
            console.log("markers", markers, "updatedMarker", updatedMarker);
            let newMarkers = [...markers];
            newMarkers.splice(updatedMarker.key, 1, updatedMarker);
            console.log("newMarkers", newMarkers);
            setMarkers(newMarkers);
          }}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setMarkers([])} style={styles.bubble}>
          <Text>Tap map to create a marker of random color</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: "stretch",
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
  },
});

export default App;
