import { MapContainer, TileLayer } from 'react-leaflet';
import { MapSelectArea } from './select-area/map-select-area';
import { LatLngExpression } from 'leaflet';
import { classNames } from '../../shared/helpers/class-names';
import styles from './map.module.scss';
import 'leaflet/dist/leaflet.css';

const defaultPosition: LatLngExpression = [51.505, -0.09];
const defaultZoom = 13

export const Map = () => {
	return (
		<section className={classNames(styles['section'], ['container'])}>
			<h2>Зажмите клавишу ctrl и левую кнопку мыши, рисуйте, отпускайте - все просто!</h2>
			<MapContainer
				center={defaultPosition}
				zoom={defaultZoom}
				className={styles['map']}
				scrollWheelZoom={true}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<MapSelectArea />
			</MapContainer>
		</section>
	);
};
