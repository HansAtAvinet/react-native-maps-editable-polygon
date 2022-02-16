import React from "react";
import { Marker } from "react-native-maps";

export const DraggableMarker = (props: any) => {
  const { marker, dragEnd, dragStart } = props;
  return (
    <React.Fragment>
      <Marker
        key={marker.key}
        draggable
        coordinate={marker.coordinate}
        pinColor={marker.color}
        onDragEnd={(e) => {
          console.log("dragEnd", marker.key, e.nativeEvent);
          dragEnd(marker, e.nativeEvent.coordinate);
        }}
        onDragStart={(e) => {
          console.log("dragStart", marker.key, e.nativeEvent);
          dragStart(marker);
        }}
      />
    </React.Fragment>
  );
};
