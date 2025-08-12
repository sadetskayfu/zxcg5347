import { Map } from '../features/map';
import './styles/main.scss';
import styles from './app.module.scss';
import { classNames } from '../shared/helpers/class-names';

export const App = () => {
	return (
		<div className={styles['app']}>
			<header className={styles['header']}>
				<div className="container">
					<h1>Hello world</h1>
				</div>
			</header>
			<section className={classNames(styles['section'], ['container'])}>
				<Map />
			</section>
		</div>
	);
};
