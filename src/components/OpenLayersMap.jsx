import { useRef, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw.js';
import { toLonLat } from 'ol/proj';

const OpenLayersMap = ({ drawing, setDrawType, addCoords }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);

    useEffect(() => {
        const instance = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: [0, 0],
                zoom: 2,
            }),
        });

        setMap(instance);

        return () => instance.setTarget(null);
    }, []);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (draw) {
                map.removeInteraction(draw);
                setDraw(null);
                console.log("Draw interaction removed");
            }
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
    }, [draw, map]);

    useEffect(() => {
        if (drawing && drawing.type) {
            console.log(drawing.type);

            const raster = new TileLayer({
                source: new OSM(),
            });

            const source = new VectorSource({ wrapX: false });

            const vector = new VectorLayer({
                source: source,
            });

            map.addLayer(raster);
            map.addLayer(vector);

            const newDraw = new Draw({
                source: source,
                type: drawing.type,
            });

            map.addInteraction(newDraw);
            setDraw(newDraw);

            newDraw.on('drawstart', (event) => {
                const coordinates = event.feature.getGeometry().getCoordinates();
                const longLatCoordinates = toLonLat(coordinates[0]);
                addCoords(longLatCoordinates);
            });
        }
    }, [drawing, map, addCoords]);

    return (
        <div>
            <div id="map" className="map absolute top-0 left-0 w-[100%] h-[100%] -z-20" ref={mapRef}></div>
        </div>
    );
};

export default OpenLayersMap;
