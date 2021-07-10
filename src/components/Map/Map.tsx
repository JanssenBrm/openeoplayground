import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import styles from './Map.module.css';
import {UiInteractionType} from '../../stores/ui/ui.model';
import {useSelector} from 'react-redux';
import {AppStore} from '../../stores/app.model';
import DrawLayer from './Layers/DrawLayer';



const Map = () => {
    const interactionType: UiInteractionType = useSelector((state: AppStore) => state.ui.interaction)
    return (
        <MapContainer className={styles.MapContainer} center={[50.7191078335712, 4.721902473674258]} zoom={8}
                      zoomControl={false}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <DrawLayer interaction={interactionType}></DrawLayer>
        </MapContainer>
    )
}

export default Map;
