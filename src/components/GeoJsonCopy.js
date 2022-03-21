import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import {
    Attribution,
    defaults as defaultControls,
    FullScreen,
    MousePosition,
    OverviewMap,
    ZoomSlider,
} from 'ol/control';
import { createStringXY } from 'ol/coordinate';
import {
    Select,
    Translate,
    DragBox,
    defaults as defaultInteractions,
} from 'ol/interaction';
import { platformModifierKeyOnly } from 'ol/events/condition';
import { addCargo } from '../actions/gloryAction';

// 도형 json
import object from '../object';

import 'ol/ol.css';

/*=============================================================================*/

const styles = {
    MultiPolygon: new Style({
        // 테두리
        stroke: new Stroke({
            color: 'blue',
            width: 2,
        }),
        // 내부 색상
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
    }),
    Polygon: new Style({
        // 테두리
        stroke: new Stroke({
            color: 'blue',
            lineDash: [50],
            width: 2,
        }),
        // 내부 색상
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
        // 주석
        text: new Text({
            font: '20px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)',
            }),
            backgroundFill: new Fill({
                color: 'rgba(100, 0, 0, 0.7)',
            }),
            scale: [1, 1],
            padding: [5, 5, 5, 5],
            offsetX: 0,
            offsetY: 0,
            text: '텍스트',
        }),
    }),
    GeometryCollection: new Style({
        stroke: new Stroke({
            color: 'magenta',
            width: 2,
        }),
        fill: new Fill({
            color: 'magenta',
        }),
        image: new CircleStyle({
            radius: 10,
            fill: null,
            stroke: new Stroke({
                color: 'magenta',
            }),
        }),
    }),
};

/*=============================================================================*/

const GeoJsonCopy = ({ cargoList, addCargo }) => {
    const [cargoData, setCargoData] = useState([]);
    useEffect(() => {
        const styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };

        const geojsonObject = object;

        const vectorSource = new VectorSource({
            features: new GeoJSON().readFeatures(geojsonObject),
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction,
            name: 'glory',
        });

        const select = new Select();

        const translate = new Translate({
            features: select.getFeatures(),
        });

        const dragBox = new DragBox({
            condition: platformModifierKeyOnly,
        });

        const map = new Map({
            interactions: defaultInteractions().extend([
                select,
                translate,
                dragBox,
            ]),
            controls: defaultControls({
                zoom: true,
                attribution: false,
            }).extend([
                new FullScreen({}),
                new ZoomSlider(),
                new OverviewMap({
                    layers: [
                        new TileLayer({
                            source: new OSM(),
                        }),
                    ],
                }),
                new Attribution({
                    collapsible: true,
                }),
            ]),
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                vectorLayer,
            ],
            target: 'map1',
            view: new View({
                center: [4.22175695, 51.26939306],
                zoom: 16,
                projection: 'EPSG:4326',
            }),
        });

        console.log('map ===== ', map);

        const selectedFeatures = select.getFeatures();

        dragBox.on('boxend', function () {
            const extent = dragBox.getGeometry().getExtent();
            const boxFeatures = vectorSource
                .getFeaturesInExtent(extent)
                .filter((feature) =>
                    feature.getGeometry().intersectsExtent(extent)
                );

            const rotation = map.getView().getRotation();
            const oblique = rotation % (Math.PI / 2) !== 0;

            if (oblique) {
                const anchor = [0, 0];
                const geometry = dragBox.getGeometry().clone();
                geometry.rotate(-rotation, anchor);
                const extent = geometry.getExtent();
                boxFeatures.forEach(function (feature) {
                    const geometry = feature.getGeometry().clone();
                    geometry.rotate(-rotation, anchor);
                    if (geometry.intersectsExtent(extent)) {
                        selectedFeatures.push(feature);
                    }
                });
            } else {
                selectedFeatures.extend(boxFeatures);
            }
        });

        // clear selection when drawing a new box and when clicking on the map
        dragBox.on('boxstart', function () {
            selectedFeatures.clear();
        });

        // const infoBox = document.getElementById('cargoName');

        selectedFeatures.on(['add', 'remove'], function () {
            const names = selectedFeatures.getArray().map(function (feature) {
                // return JSON.stringify(feature);
                return JSON.stringify(feature.id_);
                // return JSON.stringify(feature.values_.geometry.orientedFlatCoordinates_);
                // return JSON.stringify(feature.values_.geometry.extent_);
            });
            if (names.length > 0) {
                // addCargo();
                setCargoData([names.join(', ')]);
                // infoBox.innerHTML = names.join(', ');
            } else {
                setCargoData([]);
                // infoBox.innerHTML = 'None';
            }
        });

        const mousePosition = new MousePosition({
            coordinateFormat: createStringXY(5),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position'),
        });

        const projectionSelect = document.getElementById('projection');
        projectionSelect.addEventListener('change', function (event) {
            mousePosition.setProjection(event.target.value);
        });

        const precisionInput = document.getElementById('precision');
        precisionInput.addEventListener('change', function (event) {
            const format = createStringXY(event.target.valueAsNumber);
            mousePosition.setCoordinateFormat(format);
        });
        map.controls.push(mousePosition);

        console.log('aaaaaaaaaaaa', vectorSource);
    }, []);

    useEffect(() => {
        function a() {
            addCargo(cargoData);
        }
        a();
        console.log('cargoData', cargoData);
    }, [cargoData]);

    useEffect(() => {
        console.log('cargoList', cargoList);
    }, [cargoList]);

    return (
        <>
            <div
                id='map1'
                className='map'
                style={{ width: '98vw', height: '87vh' }}
            >
                <div style={{ margin: 10 }}>
                    <form>
                        <label>Projection </label>
                        <select id='projection' style={{ marginRight: 20 }}>
                            <option value='EPSG:4326'>EPSG:4326</option>
                            <option value='EPSG:3857'>EPSG:3857</option>
                        </select>
                        <label>Precision </label>
                        <input
                            id='precision'
                            type='number'
                            min='0'
                            max='12'
                            defaultValue='4'
                        />
                    </form>
                    <div
                        id='mouse-position'
                        style={{
                            position: 'absolute',
                            zIndex: 100,
                            width: '100%',
                            margin: '10px auto',
                            textAlign: 'center',
                            fontSize: 20,
                            fontWeight: 600,
                        }}
                    ></div>
                </div>
            </div>
            <div
                style={{
                    background: '#aaa',
                    height: 50,
                    position: 'relative',
                }}
            >
                화물 이름
                <div id='cargoName'>{cargoList}</div>
            </div>
        </>
    );
};

const mapStateToProps = ({ gloryReducer }) => {
    return {
        cargoList: gloryReducer.cargoList,
    };
};

const mapDispatchToProps = {
    addCargo: (cargoData) => addCargo(cargoData),
    // addCargo,
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoJsonCopy);
