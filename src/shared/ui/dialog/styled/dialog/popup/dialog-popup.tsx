
import { classNames } from '../../../../../helpers/class-names';
import { BaseDialog } from '../../../base';
import styles from './dialog-popup.module.scss';

export const DialogPopup = (props: DialogPopup.Props) => {
	const {
		className,
		contentClassName,
		children,
		contentStyle,
		...otherProps
	} = props;

	return (
		<BaseDialog.Popup
			className={state =>
				classNames(styles['popup'], [className], {
					[styles['open']]: state.status === 'open',
					[styles['close']]: state.status === 'close',
				})
			}
			{...otherProps}
		>
			<div className={classNames(styles['content'], [contentClassName])} style={contentStyle}>
				{children}
			</div>
		</BaseDialog.Popup>
	);
};

export namespace DialogPopup {
	export interface Props extends Omit<BaseDialog.Popup.Props, 'render' | 'className'> {
        className?: string
		contentClassName?: string;
		contentStyle?: React.CSSProperties;
	}
}
