import { useRef, useEffect, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { OSM } from 'ol/source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Draw from 'ol/interaction/Draw.js';

const OpenLayersMap = ({ drawing, setDrawType, addCoords }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    console.log("drawing", drawing);
    console.log("map", map);

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

    // useEffect(() => {
    //     if (drawing && drawing.type) {

    //         console.log(drawing.type);

    //         const raster = new TileLayer({
    //             source: new OSM(),
    //         });

    //         const source = new VectorSource({ wrapX: false });

    //         const vector = new VectorLayer({
    //             source: source,
    //         });

    //         // const map = new Map({
    //         //     layers: [raster, vector],
    //         //     target: 'map',
    //         //     view: new View({
    //         //         center: [-11000000, 4600000],
    //         //         zoom: 4,
    //         //     }),
    //         // });

    //         map.addLayer(raster);
    //         map.addLayer(vector);

    //         let draw = new Draw({
    //             source: source,
    //             type: drawing.type,
    //         });
    //         map.addInteraction(draw);

    //         // let draw;

    //         // const addInteraction = () => {
    //         //     draw = new Draw({
    //         //         source: source,
    //         //         type: drawing.type,
    //         //     });
    //         //     map.addInteraction(draw);
    //         // };

    //         // addInteraction();
    //     }
    // }, [drawing, addCoords]);

    return (
        <div>
            <div id="map" className="map absolute top-0 left-0 w-[100%] h-[100%] -z-20" ref={mapRef}></div>
        </div>
    );
};

export default OpenLayersMap;
