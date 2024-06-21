function useMaps() {
  const apiKey = process.env.MAPS_API;
  const initialLocation = {
    latitude: -7.580784715587559,
    longitude: 112.13238644047685,
  };

  const pushPin = {
    center: {
      latitude: initialLocation.latitude,
      longitude: initialLocation.longitude,
    },
    options: {
      title: "Rendi Virgantara Setiawan Home",
    },
  };

  const pushPins = [pushPin];

  return { apiKey, initialLocation, pushPins };
}

export default useMaps;
