import * as React from 'react';
import { useDialogRootContext } from '../root/dialog-root-context';
import { useRenderElement } from '../../../../hooks';
import { ModernComponentProps } from '../../../../helpers/types';

/**
 * Renders a `<button>` element.
 */
export const DialogClose = React.forwardRef(
	(props: DialogClose.Props, forwardedRef: React.ForwardedRef<HTMLButtonElement>) => {
		const { render, className, ...otherProps } = props;

		const { setOpen, closeElementRef } = useDialogRootContext();

		const element = useRenderElement('button', {
			render,
			className,
			ref: [forwardedRef, closeElementRef],
			props: [{ onClick: () => setOpen(false) }, otherProps],
		});

		return element;
	}
);

export namespace DialogClose {
	export interface State {}
	export interface Props extends ModernComponentProps<'button', State> {}
}
