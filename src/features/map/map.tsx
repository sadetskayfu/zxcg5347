import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './map.module.scss';
import 'leaflet/dist/leaflet.css';
import { MapSelectArea } from './select-area/map-select-area';

const position = [51.505, -0.09];

export const Map = () => {
	return (
		<>
			<MapContainer
				center={position}
				zoom={13}
				className={styles['map']}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapSelectArea />
			</MapContainer>
		</>
	);
};
