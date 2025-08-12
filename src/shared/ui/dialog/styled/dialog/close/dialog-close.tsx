
import { classNames } from '../../../../../helpers/class-names';
import { Button } from '../../../../button';
import { BaseDialog } from '../../../base';
import styles from './dialog-close.module.scss';

export const DialogClose = (props: DialogClose.Props) => {
	const { className, ...otherProps } = props;

	return (
		<BaseDialog.Close
			render={<Button className={classNames(styles['close-button'], [className])}>x</Button>}
			{...otherProps}
		/>
	);
};

export namespace DialogClose {
	export interface Props extends Omit<BaseDialog.Close.Props, 'className' | 'render'> {
		className?: string;
	}
}
