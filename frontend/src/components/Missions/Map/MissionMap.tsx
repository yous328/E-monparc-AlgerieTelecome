/// <reference types="@types/google.maps" />
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { IMission } from '../../../interfaces/mission/IMission';

interface MissionMapProps {
    mission: IMission | null;
}

// Define types for Google Maps API
declare global {
    interface Window {
        google: typeof google;
        initMap?: () => void;
        mapsScriptLoaded?: boolean; // Track if script is already loaded
    }
}

export const MissionMap: React.FC<MissionMapProps> = ({ mission }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<(google.maps.Marker | google.maps.marker.AdvancedMarkerElement)[]>([]);
    const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);
    const scriptRef = useRef<HTMLScriptElement | null>(null);
    
    // Create a key that changes when mission changes
    const missionKey = mission?.id || 'no-mission';
    
    // Create a stable function for map initialization
    const initializeMap = useCallback(() => {
        // Ensure the Maps JS API is fully loaded
        if (!mapRef.current || !window.google || !window.google.maps || !window.google.maps.MapTypeId) {
            return;
        }
        
        try {
            // Default center of Algeria (approximate)
            const algeriaCenter = { lat: 28.0339, lng: 1.6596 };
            
            const mapOptions: google.maps.MapOptions = {
                center: algeriaCenter,
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: true,
                mapId: 'd0d8cba0175c1c29159b4f27', // User's custom Map ID
                zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_BOTTOM
                }
            };
            
            const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
            setMap(newMap);
            setMapLoaded(true);
        } catch (error) {
            console.error("Error initializing map:", error);
        }
    }, []);
    
    // Initialize Google Maps
    useEffect(() => {
        // If Maps is already loaded and available, just initialize
        if (window.google && window.google.maps) {
            initializeMap();
            return () => {}; // Empty cleanup
        }
        
        // If script is loading in another component, wait for it
        if (window.mapsScriptLoaded) {
            const checkForGoogle = setInterval(() => {
                if (window.google && window.google.maps) {
                    clearInterval(checkForGoogle);
                    initializeMap();
                }
            }, 100);
            
            return () => {
                clearInterval(checkForGoogle);
            };
        }
        
        // Mark that we're loading the script
        window.mapsScriptLoaded = true;
        
        // Define the callback before creating the script
        window.initMap = initializeMap;
        
        // Load Google Maps API
        const googleMapScript = document.createElement('script');
        googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBmXAHX_uhUB_JrIUhmyzjkg2nHGQN9PX4&libraries=places,marker&callback=initMap&loading=async&v=beta`;
        googleMapScript.async = true;
        googleMapScript.defer = true;
        googleMapScript.id = 'google-maps-script';
        scriptRef.current = googleMapScript;
        
        // Check if the script already exists
        const existingScript = document.getElementById('google-maps-script');
        if (!existingScript) {
            document.head.appendChild(googleMapScript);
        }
        
        // Clean up
        return () => {
            // Don't remove the global callback for the API
            // Other components might still be using it
            
            // Don't remove the script directly - this causes errors
            // Just clean up our component state
            setMap(null);
            setMapLoaded(false);
        };
    }, [initializeMap]);
    
    // Clean up map instances when component unmounts
    useEffect(() => {
        return () => {
            // Clean up markers
            if (markers.length) {
                markers.forEach(marker => {
                    if ('setMap' in marker) {
                        marker.setMap(null);
                    } else if (marker) {
                        marker.map = null;
                    }
                });
                setMarkers([]);
            }
            
            // Clean up polyline
            if (polyline) {
                polyline.setMap(null);
                setPolyline(null);
            }
            
            // Clean up map (though this is likely unnecessary)
            if (map) {
                setMap(null);
            }
        };
    }, [map, markers, polyline]);
    
    // Update markers when mission changes
    useEffect(() => {
        const updateMarkers = async () => {
            if (!mapLoaded || !map || !mission) return;
        
            // Clear existing markers
            markers.forEach(marker => {
                if ('setMap' in marker) {
                    marker.setMap(null);
                } else if (marker) {
                    marker.map = null;
                }
            });
            if (polyline) polyline.setMap(null);
        
            try {
                // Create array for coordinates
                const coordinates: google.maps.LatLngLiteral[] = [];
                const newMarkers: google.maps.marker.AdvancedMarkerElement[] = [];
            
                // Load the Advanced Markers library
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
                
                // Get start and destination points
                const departurePoint = mission.points.find(p => p.status === 'completed' || p.status === 'current') || mission.points[0];
                const destinationPoint = mission.points.find(p => p.status === 'pending') || mission.points[mission.points.length - 1];
                const currentPoint = mission.points.find(p => p.status === 'current');
                
                // Get coordinates for all points
                const departureCoordinates = getMockCoordinates(departurePoint.location, 0);
                const destinationCoordinates = getMockCoordinates(destinationPoint.location, mission.points.length - 1);
                coordinates.push(departureCoordinates);
                if (currentPoint && currentPoint !== departurePoint) {
                    coordinates.push(getMockCoordinates(currentPoint.location, 1));
                }
                coordinates.push(destinationCoordinates);
                
                // Create departure marker
                const departureMarkerContent = document.createElement('div');
                departureMarkerContent.className = 'marker-pin';
                departureMarkerContent.style.width = '24px';
                departureMarkerContent.style.height = '24px';
                departureMarkerContent.style.borderRadius = '50%';
                departureMarkerContent.style.border = '2px solid white';
                departureMarkerContent.style.backgroundColor = '#4ade80'; // green
                
                const departureMarker = new AdvancedMarkerElement({
                    position: departureCoordinates,
                    map: map,
                    title: departurePoint.name,
                    content: departureMarkerContent
                });
                
                departureMarker.addEventListener('gmp-click', () => {
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div class="p-2">
                                <h3 class="font-medium">${departurePoint.name}</h3>
                                <p>${departurePoint.location}</p>
                                <p>${departurePoint.date} - ${departurePoint.time}</p>
                                <p class="text-green-600 font-medium">Point de départ</p>
                            </div>
                        `
                    });
                    infoWindow.open({ anchor: departureMarker, map });
                });
                
                newMarkers.push(departureMarker);
                
                // Create destination marker
                const destinationMarkerContent = document.createElement('div');
                destinationMarkerContent.className = 'marker-pin';
                destinationMarkerContent.style.width = '24px';
                destinationMarkerContent.style.height = '24px';
                destinationMarkerContent.style.borderRadius = '50%';
                destinationMarkerContent.style.border = '2px solid white';
                destinationMarkerContent.style.backgroundColor = '#ef4444'; // red
                
                const destinationMarker = new AdvancedMarkerElement({
                    position: destinationCoordinates,
                    map: map,
                    title: destinationPoint.name,
                    content: destinationMarkerContent
                });
                
                destinationMarker.addEventListener('gmp-click', () => {
                    const infoWindow = new google.maps.InfoWindow({
                        content: `
                            <div class="p-2">
                                <h3 class="font-medium">${destinationPoint.name}</h3>
                                <p>${destinationPoint.location}</p>
                                <p>${destinationPoint.date} - ${destinationPoint.time}</p>
                                <p class="text-red-600 font-medium">Destination</p>
                            </div>
                        `
                    });
                    infoWindow.open({ anchor: destinationMarker, map });
                });
                
                newMarkers.push(destinationMarker);
                
                // Add current position marker if different from departure
                if (currentPoint && currentPoint !== departurePoint) {
                    const currentMarkerContent = document.createElement('div');
                    currentMarkerContent.className = 'marker-pin';
                    currentMarkerContent.style.width = '24px';
                    currentMarkerContent.style.height = '24px';
                    currentMarkerContent.style.borderRadius = '50%';
                    currentMarkerContent.style.border = '2px solid white';
                    currentMarkerContent.style.backgroundColor = '#3b82f6'; // blue
                    
                    const currentCoordinates = getMockCoordinates(currentPoint.location, 1);
                    
                    const currentMarker = new AdvancedMarkerElement({
                        position: currentCoordinates,
                        map: map,
                        title: currentPoint.name,
                        content: currentMarkerContent
                    });
                    
                    currentMarker.addEventListener('gmp-click', () => {
                        const infoWindow = new google.maps.InfoWindow({
                            content: `
                                <div class="p-2">
                                    <h3 class="font-medium">${currentPoint.name}</h3>
                                    <p>${currentPoint.location}</p>
                                    <p>${currentPoint.date} - ${currentPoint.time}</p>
                                    <p class="text-blue-600 font-medium">Position actuelle</p>
                                </div>
                            `
                        });
                        infoWindow.open({ anchor: currentMarker, map });
                    });
                    
                    newMarkers.push(currentMarker);
                }
                
                // Check if origin and destination are same location
                const isSameLocation = 
                    Math.abs(departureCoordinates.lat - destinationCoordinates.lat) < 0.01 && 
                    Math.abs(departureCoordinates.lng - destinationCoordinates.lng) < 0.01;
                
                if (isSameLocation) {
                    // If same location, just focus the map on this point
                    map.setCenter(departureCoordinates);
                    map.setZoom(14);
                    setMarkers(newMarkers);
                    return;
                }
                
                // Calculate and display directions instead of simple polyline
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true, // Use our custom markers
                    polylineOptions: {
                        strokeColor: '#304ff2',
                        strokeWeight: 5,
                        strokeOpacity: 0.8
                    }
                });
                
                try {
                    // If we have a current position different from departure, make a route with waypoint
                    if (currentPoint && currentPoint !== departurePoint) {
                        const currentCoordinates = getMockCoordinates(currentPoint.location, 1);
                        
                        const request = {
                            origin: departureCoordinates,
                            destination: destinationCoordinates,
                            waypoints: [{ location: currentCoordinates, stopover: true }],
                            travelMode: google.maps.TravelMode.DRIVING
                        };
                        
                        // Request directions
                        directionsService.route(request, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                directionsRenderer.setDirections(result);
                            } else {
                                console.log('Directions request failed: ', status);
                                // Fallback to simple polyline
                                createPolyline(coordinates, map);
                            }
                        });
                    } else {
                        // Simple route from departure to destination
                        const request = {
                            origin: departureCoordinates,
                            destination: destinationCoordinates,
                            travelMode: google.maps.TravelMode.DRIVING
                        };
                        
                        // Request directions
                        directionsService.route(request, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                directionsRenderer.setDirections(result);
                            } else {
                                console.log('Directions request failed: ', status);
                                // Fallback to simple polyline
                                createPolyline(coordinates, map);
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error calculating directions:', error);
                    // Fallback to simple polyline
                    createPolyline(coordinates, map);
                }
                
                // Fit map bounds to show all markers
                const bounds = new google.maps.LatLngBounds();
                coordinates.forEach(coord => bounds.extend(coord));
                map.fitBounds(bounds);
            
                setMarkers(newMarkers);
            } catch (error) {
                console.error("Error updating map markers:", error);
            }
        };
        
        updateMarkers();
    }, [mapLoaded, map, mission]);
    
    // Helper function to create a simple polyline (fallback if directions fail)
    const createPolyline = (coordinates: google.maps.LatLngLiteral[], map: google.maps.Map) => {
        const newPolyline = new window.google.maps.Polyline({
            path: coordinates,
            geodesic: true,
            strokeColor: '#304ff2',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        
        newPolyline.setMap(map);
        setPolyline(newPolyline);
    }
    
    // Helper function to generate mock coordinates based on location names
    // In a real app, you would use geocoding for this
    const getMockCoordinates = (location: string, index: number): google.maps.LatLngLiteral => {
        const algerCenter = { lat: 36.7538, lng: 3.0588 }; // Center of Alger
        
        // Generate coordinates based on location string
        if (location.toLowerCase().includes('alger')) {
            return { 
                lat: algerCenter.lat + (index * 0.005), 
                lng: algerCenter.lng + (index * 0.008)
            };
        } else if (location.toLowerCase().includes('oran')) {
            return { lat: 35.6969, lng: -0.6331 + (index * 0.005) };
        } else if (location.toLowerCase().includes('constantine')) {
            return { lat: 36.3650, lng: 6.6147 + (index * 0.005) };
        } else if (location.toLowerCase().includes('annaba')) {
            return { lat: 36.9264, lng: 7.7522 + (index * 0.005) };
        } else if (location.toLowerCase().includes('sétif') || location.toLowerCase().includes('setif')) {
            return { lat: 36.1898, lng: 5.4108 + (index * 0.005) };
        } else if (location.toLowerCase().includes('tlemcen')) {
            return { lat: 34.8883, lng: -1.3167 + (index * 0.005) };
        } else if (location.toLowerCase().includes('batna')) {
            return { lat: 35.5500, lng: 6.1667 + (index * 0.005) };
        } else if (location.toLowerCase().includes('blida')) {
            return { lat: 36.4700, lng: 2.8300 + (index * 0.005) };
        } else {
            // Default to some location in Algeria with slight offset for demo
            // Using a deterministic offset based on the location string to ensure consistency
            const locationHash = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            return { 
                lat: 36.0 + ((locationHash % 20) / 10), 
                lng: 3.0 + ((locationHash % 30) / 10)
            };
        }
    };
    
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden h-full relative" key={missionKey}>
            {/* Map container */}
            <div
                ref={mapRef}
                className="w-full h-full"
            />

            {/* Loading indicator */}
            {!mapLoaded && (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-100 z-10">
                    <div className="text-center">
                        <svg className="animate-spin h-10 w-10 text-blue-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-2 text-gray-600">Chargement de la carte...</p>
                    </div>
                </div>
            )}

            {/* If no mission is selected, show a message */}
            {mapLoaded && !mission && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
                    <div className="text-center p-6">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900">Sélectionnez une mission</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Cliquez sur une mission dans la liste pour afficher son itinéraire sur la carte
                        </p>
                    </div>
                </div>
            )}
            
            {/* Map legend */}
            {mapLoaded && mission && (
                <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-3 z-20">
                    <div className="text-xs font-medium text-gray-700 mb-2">Légende</div>
                    <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Point de départ</span>
                    </div>
                    <div className="flex items-center mb-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Position actuelle</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        <span className="text-xs text-gray-600">Destination</span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Add styles for the map markers in your CSS file:
/*
.map-marker {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 20;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transform: translate(-50%, -50%);
}

.map-marker.completed {
    background-color: #4ade80;
    border: 2px solid white;
}

.map-marker.current {
    background-color: #3b82f6;
    border: 2px solid white;
}

.map-marker.pending {
    background-color: white;
    border: 2px solid #9ca3af;
}

.map-loaded {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from { opacity: 0.3; }
    to { opacity: 1; }
}
*/ 