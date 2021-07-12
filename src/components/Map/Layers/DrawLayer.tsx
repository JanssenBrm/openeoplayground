import {Control} from "leaflet";
import React, {useEffect, useRef, useState} from "react"
import {FeatureGroup, useMap} from "react-leaflet";
import {EditControl} from "react-leaflet-draw";
import {useDispatch, useSelector} from "react-redux";
import {AppStore} from "../../../stores/app.model";
import {UiInteractionType} from "../../../stores/ui/ui.model";
import { FeatureGroup as LeafletFeatureGroup } from 'leaflet';
import { setFeature } from "../../../stores/params";
import { setInteractionType } from "../../../stores/ui";


export interface DrawLayerProps {
    interaction: UiInteractionType;
}

const DrawLayer = (props: DrawLayerProps) => {
    const dispatch = useDispatch();
    const map = useMap();
    const [geometry, setGeometry] = useState(undefined);
    const drawRef = useRef<Control>();
    const layerRef = useRef<LeafletFeatureGroup>(null);

    const feature: any = useSelector((state: AppStore) => state.params.feature)

    useEffect(() => {
        if (drawRef.current) {
            if (props.interaction === UiInteractionType.NONE) {
                map.removeControl(drawRef.current);
            } else {
                map.addControl(drawRef.current);
            }
        }
    }, [map, props.interaction]);

    useEffect(() => {
        if (!feature && layerRef.current) {
            layerRef.current.clearLayers();
        }
    }, [feature]);

    useEffect(() => {
        dispatch(setFeature(geometry))
        dispatch(setInteractionType(UiInteractionType.NONE))
    }, [dispatch, geometry]);

    return (
        <FeatureGroup ref={layerRef}
        >
            <EditControl
                onMounted={(ctl: Control) => drawRef.current = ctl}
                onCreated={(event: any) => setGeometry(event.layer.toGeoJSON())}
                position="topright"
                draw={{
                    polyline: false,
                    polygon: true,
                    rectangle: true,
                    circle: false,
                    marker: false,
                    circlemarker: false
                }}
            />
        </FeatureGroup>
    )
}

export default DrawLayer
