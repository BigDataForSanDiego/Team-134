"use client"
import { useEffect, useState } from "react"

export function useGeolocation(defaultLat = 32.7157, defaultLon = -117.1611) {
  const [coords, setCoords] = useState<{lat:number; lon:number}>({ lat: defaultLat, lon: defaultLon })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) { setReady(true); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setReady(true)
      },
      () => setReady(true), // ignore error, keep defaults
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [])

  return { ...coords, ready }
}
