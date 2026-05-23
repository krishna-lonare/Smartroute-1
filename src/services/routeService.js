import axios from "axios";

const API_KEY = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjZmMTZmY2Y1YjFhMDRiZWQ4NTYyODhiZTNmOGMyYjNjIiwiaCI6Im11cm11cjY0In0=";

export async function getRoute(start, end) {
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: [
          [start.lng, start.lat],
          [end.lng, end.lat],
        ],
      },
      {
        headers: {
          Authorization: API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.log("Route Error:", error?.response?.data || error.message);
    return null;
  }
}