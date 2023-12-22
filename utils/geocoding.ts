const API_URI = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

interface GeoData {
  countryCode: string
  city: string
  locality: string
}

export const getGeoData = async (
  latitude: number,
  longitude: number,
  localityLanguage = 'en',
): Promise<GeoData | null> => {
  try {
    const res = await fetch(
      `${API_URI}?latitude=${latitude}&longitude=${longitude}&localityLanguage=${localityLanguage}`,
    ).then((res) => res.json())
    return {
      countryCode: res.countryCode,
      city: res.city,
      locality: res.locality,
    }
  } catch (_error) {
    return null
  }
}
