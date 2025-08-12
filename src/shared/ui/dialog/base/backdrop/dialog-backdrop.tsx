import * as React from 'react';
import { FloatingOverlay } from '@floating-ui/react';
import { DialogPopup } from '../popup/dialog-popup';
import { useDialogRootContext } from '../root/dialog-root-context';
import { resolveClassName } from '../../../../helpers/resolve-class-name';
import { HTMLProps } from '../../../../helpers/types';


/**
 * Renders a `<div>` element.
 */
export const DialogBackdrop = React.forwardRef(
	(props: DialogBackdrop.Props, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
		const { render, className: classNameProp, children, ...otherProps } = props;

		const { status, mounted } = useDialogRootContext();

		const state: DialogBackdrop.State = React.useMemo(() => ({ status }), [status]);

		if (!mounted) {
			return null;
		}

		const className = resolveClassName(classNameProp, state)

		if (render) {
			return render({ ref: forwardedRef, className, children, ...otherProps }, state)
		}

		return (
			<FloatingOverlay
				ref={forwardedRef}
				className={className}
				{...otherProps}
			>
				{children}
			</FloatingOverlay>
		);
	}
);

export namespace DialogBackdrop {
	export interface State extends DialogPopup.State {}
	export interface Props extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className'> {
		className?: string | ((state: State) => string | undefined);
		render?: (props: HTMLProps, state: State) => React.ReactElement
	}
}
