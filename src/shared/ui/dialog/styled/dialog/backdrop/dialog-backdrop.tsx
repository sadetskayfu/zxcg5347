
import { Backdrop } from '../../../../backdrop';
import { BaseDialog } from '../../../base';

export const DialogBackdrop = ({ visible = true }: DialogBackdrop.Props) => {
	return (
		<BaseDialog.Backdrop
			render={(props, state) => (
				<Backdrop open={state.status === 'open'} visible={visible} {...props} />
			)}
		/>
	);
};

export namespace DialogBackdrop {
    export interface Props {
        /**
         * Применить визуальные стили, такие как backgroundColor и blur
         * 
         * @default true
         */
        visible?: boolean
    }
}
