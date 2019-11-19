import * as React from "react";
require('@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css')
require('mapbox-gl/dist/mapbox-gl.css');
const mapboxgl = require('mapbox-gl/dist/mapbox-gl');
const MapboxDraw = require('@mapbox/mapbox-gl-draw');

import { LatLngDetails, LineDrawerProps, LineDrawer } from './LineDrawer';

const Draw = new MapboxDraw();

const mapStyle = { height: '100%' };

mapboxgl.accessToken = 'pk.eyJ1IjoibmlvbGUiLCJhIjoiY2p4N2t1OXpnMGJudDNvbG1tbmRlYWdkNiJ9.fK7Lyhu1CLZnn5YTLwhXVw';

export type MapProps = {
    onChange?: (coords: [number, number][]) => void;
    value?: [number, number][];
};
export const Map: React.FC<MapProps> = ({ value, onChange }) => {
    React.useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
        });

        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));

        map.addControl(Draw, 'top-left');

        map.on('load', () => {
            if (value) {
                const lines = { type: 'LineString', coordinates: [[0,0],[1,1]], };
                const lineFeatureIds = Draw.add(lines);
            }
        });

        map.on('draw.create', function (e: any) {
            const newFeature = e.features[0].geometry.coordinates;
            if (onChange) {
                onChange(newFeature);
            }
        });
    }, []);
    return (
        <div style={mapStyle} id="map" />
    );
}
