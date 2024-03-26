import { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  MapCameraChangedEvent,
  MapCameraProps,
} from "@vis.gl/react-google-maps";
export default function DormMap({ lat, lng }: { lat: number; lng: number }) {
  const position = { lat: lat, lng: lng};
  const [cameraProps, setCameraProps] = useState<MapCameraProps>({
    center: { lat: lat, lng: lng},
    zoom: 9,
  });
  const handleCameraChange = (ev: MapCameraChangedEvent) =>
    setCameraProps(ev.detail);

  useEffect(() => {
    setCameraProps({
      center: {lat: lat, lng: lng},
      zoom: 9
    })
  }, [lat, lng])

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <APIProvider apiKey={process.env.REACT_APP_MAP_API_KEY as string}>
      <div className="w-full aspect-video relative">
        <Map
          {...cameraProps}
          style={{ width: '100%', height: '100%' }}
          mapId={process.env.REACT_APP_MAP_ID as string}
          onCameraChanged={handleCameraChange}
          defaultCenter={{lat: lat, lng: lng}}
          disableDefaultUI={true}
        >
          <AdvancedMarker
            position={position}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            ></Pin>
          </AdvancedMarker>
          {isOpen && (
            <InfoWindow position={position}>
              <p>Pin Location</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
