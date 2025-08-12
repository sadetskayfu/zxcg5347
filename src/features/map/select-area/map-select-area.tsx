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
			<Dialog.Root initialFocus={-1} open={openDialog} setOpen={setOpenDialog}>
				<Dialog.Portal>
					<Dialog.Backdrop />
					<Dialog.Popup className={styles['dialog']} contentClassName={styles['dialog-content']}>
						<Dialog.Title className={styles['dialog-title']}>Выбранные координаты</Dialog.Title>
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
	if (!bounds) return <span className={styles['bounds']} {...otherProps}>Координаты не выбраны</span>;

	const [[lat1, lng1], [lat2, lng2]] = bounds;

	return (
		<div className={styles['bounds']} {...otherProps}>
            <div className={styles['bounds__row']}>
                <span>Юго-запад</span>
                <span>Широта {lat1.toFixed(4)}, Долгота {lng1.toFixed(4)}</span>
            </div>
            <span aria-orientation='horizontal' role='separator' className={styles['bounds__separator']}/>
            <div className={styles['bounds__row']}>
                <span>Северо-восток</span>
                <span>Широта {lat2.toFixed(4)}, Долгота {lng2.toFixed(4)}</span>
            </div>
		</div>
	);
};
