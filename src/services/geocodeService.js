export async function getCoordinates(place) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(place)}&format=json&limit=1`
    );

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    // ✅ Always return object format
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };

  } catch (error) {
    console.log(error);
    return null;
  }
}