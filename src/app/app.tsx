import { Map } from '../features/map';
import './styles/main.scss';
import styles from './app.module.scss';

export const App = () => {
	return (
		<div className={styles['app']}>
			<header className={styles['header']}>
				<div className="container">
					<h1>Нарисуйте границы и получите их координаты!</h1>
				</div>
			</header>
			<Map />
		</div>
	);
};
