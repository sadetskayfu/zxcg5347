import * as React from 'react';
import { Dialog } from '../../../shared/ui/dialog';
import { SelectArea } from 'react-leaflet-select-area';
import { Button } from '../../../shared/ui/button';
import { HTMLProps } from '../../../shared/helpers/types';
import styles from './map-select-area.module.scss';

type Bounds = [[number, number], [number, number]];

export const MapSelectArea = () => {
	const [openDialog, setOpenDialog] = React.useState<boolean>(false);
	const [bounds, setBounds] = React.useState<Bounds | null>(null);

	const handleChangeBounds = React.useCallback((bounds: Bounds | null) => {
		if (bounds) {
			setOpenDialog(true);
		}
		setBounds(bounds);
	}, []);

	return (
		<>
			<SelectArea onBoundsChange={handleChangeBounds} />
			<Dialog.Root
				role="alertdialog"
				closeOnOutsidePress={false}
				closeOnFocusOut={false}
				removeScroll={false}
				initialFocus={-1}
				open={openDialog}
				setOpen={setOpenDialog}
			>
				<Dialog.Portal>
					<Dialog.Popup
						className={styles['dialog']}
						contentClassName={styles['dialog-content']}
						onMouseDown={(event: React.MouseEvent) => {
							// Фикс проблемы залипания ctrl. Если мы кликаем по dialog с зажатой клавишей ctrl и dialog получает фокус, почему-то состояние ctrl не сбрасывается в false, и область можно выбирать без зажатие ctrl, 
							if (event.ctrlKey) {
							  event.preventDefault();
							}
						  }}
					>
						<Dialog.Title className={styles['dialog-title']}>
							Координаты выбранной области
						</Dialog.Title>
						<Dialog.Description render={<DisplayBounds bounds={bounds} />} />
						<Dialog.Close
							render={<Button className={styles['dialog-close']}>Закрыть</Button>}
						/>
					</Dialog.Popup>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
};

const DisplayBounds = ({ bounds, ...otherProps }: { bounds: Bounds | null } & HTMLProps) => {
	if (!bounds)
		return (
			<span className={styles['bounds']} {...otherProps}>
				Область не выбрана
			</span>
		);

	const [[lat1, lng1], [lat2, lng2]] = bounds;

	return (
		<div className={styles['bounds']} {...otherProps}>
			<div className={styles['bounds__row']}>
				<span>Юго-запад</span>
				<span>
					Широта {lat1.toFixed(4)}, Долгота {lng1.toFixed(4)}
				</span>
			</div>
			<span
				aria-orientation="horizontal"
				role="separator"
				className={styles['bounds__separator']}
			/>
			<div className={styles['bounds__row']}>
				<span>Северо-восток</span>
				<span>
					Широта {lat2.toFixed(4)}, Долгота {lng2.toFixed(4)}
				</span>
			</div>
		</div>
	);
};
