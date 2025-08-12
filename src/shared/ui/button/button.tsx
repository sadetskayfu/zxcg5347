import * as React from 'react';
import { Ripple, useRipple } from '../../lib/ripple';
import { AdditionalClasses, classNames, Mods } from '../../helpers/class-names';
import { useRenderElement } from '../../hooks';
import { ModernComponentProps } from '../../helpers/types';
import styles from './button.module.scss';

export const Button = React.memo(
	React.forwardRef((props: Button.Props, forwardedRef: React.ForwardedRef<HTMLButtonElement>) => {
		const {
			render,
			className,
			children,
			borderRadius = 'm',
			variant = 'outlined',
			color = 'secondary',
			size = 's',
			disabled,
			fullWidth,
			disableRipple,
			disableRippleSpaceKey,
			...otherProps
		} = props;

		const { ripples, containerRef, removeRipple, ...rippleHandlers } = useRipple({
			disableRipple,
			disableSpaceKey: disableRippleSpaceKey,
		});

		const additionalClasses: AdditionalClasses = [
			styles[`variant-${variant}`],
			styles[`color-${color}`],
			styles[`size-${size}`],
			styles[`border-radius-${borderRadius}`]
		];

		const mods: Mods = {
			[styles['disabled']]: disabled,
			[styles['full-width']]: fullWidth,
		};

		const element = useRenderElement('button', {
			className,
			render,
			ref: forwardedRef,
			props: [
				{
					className: classNames(styles['button'], additionalClasses, mods),
					disabled,
					...rippleHandlers,
					children: (
						<>
							{children}
							<Ripple
								ref={containerRef}
								ripples={ripples}
								removeRipple={removeRipple}
							/>
						</>
					),
				},
				otherProps,
			],
		});

		return element;
	})
);

export namespace Button {
	export interface State {}
	export interface Props extends ModernComponentProps<'button', State> {
		fullWidth?: boolean;
		disableRipple?: boolean;
		disableRippleSpaceKey?: boolean;
		/**
		 * @default 's
		 */
		size?: 's';
		/**
		 * @default 'm'
		 */
		borderRadius?: 'm';
		/**
		 * @default 'secondary'
		 */
		color?: 'secondary';
		/**
		 * @default 'outlined'
		 */
		variant?: 'outlined';
	}
}
