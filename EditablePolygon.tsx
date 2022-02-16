import React, { useState, useMemo } from "react";
import { Polygon } from "react-native-maps";
import { DraggableMarker } from "./DraggableMarker";
import type { LatLng, MarkerType } from "./App";

type EditablePolygonProps = {
  markers: MarkerType[];
  updateMarker: (updatedMarker: MarkerType) => void;
};
const EditablePolygon = (props: EditablePolygonProps) => {
  const { markers, updateMarker } = props;

  const [editing, setEditing] = useState(false);

  const coordinates = useMemo(() => {
    return markers.map((m) => {
      return m.coordinate;
    });
  }, [markers]);

  // console.log("editing: ", editing);
  // console.log("coordinate array", coordinates);
  return (
    <React.Fragment>
      {markers.map((marker: MarkerType) => (
        <DraggableMarker
          key={marker.key}
          marker={marker}
          dragEnd={(m: MarkerType, newCoordinate: LatLng) => {
            const updatedMarker = Object.assign({}, m, {
              coordinate: newCoordinate,
            });
            updateMarker(updatedMarker);
            setEditing(false);
          }}
          dragStart={(m: MarkerType) => {
            setEditing(true);
          }}
        />
      ))}
      {coordinates && coordinates.length > 1 && (
        <Polygon
          coordinates={coordinates}
          strokeColor={"rgba(52, 78, 149, 0.8)"}
          strokeWidth={3}
          fillColor={"rgba(52, 78, 149, 0.5)"}
        />
      )}
    </React.Fragment>
  );
};

export { EditablePolygon };
