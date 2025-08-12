import * as React from 'react';
import { FloatingFocusManager } from '@floating-ui/react';
import { useDialogRootContext } from '../root/dialog-root-context';
import { RemoveScroll } from 'react-remove-scroll';
import { useRenderElement } from '../../../../hooks';
import { ModernComponentProps } from '../../../../helpers/types';

/**
 * Renders a `<div>` element.
 */
export const DialogPopup = React.forwardRef(
	(props: DialogPopup.Props, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
		const { render, className, ...otherProps } = props;

		const {
			modal,
			closeOnFocusOut,
			mounted,
			status,
			floatingContext,
			titleId,
			descriptionId,
			initialFocus: initialFocusProp,
			removeScroll,
			closeElementRef,
			setFloating,
			getFloatingProps,
		} = useDialogRootContext();

		const popupRef = React.useRef<HTMLDivElement | null>(null);

		const initialFocus = initialFocusProp ?? closeElementRef ?? popupRef;

		const state: DialogPopup.State = React.useMemo(
			() => ({
				status,
			}),
			[status]
		);

		const element = useRenderElement('div', {
			render,
			className,
			state,
			ref: [forwardedRef, popupRef, setFloating],
			props: [
				{
					'aria-labelledby': titleId,
					'aria-describedby': descriptionId,
					'aria-modal': modal ? 'true' : undefined,
					...getFloatingProps(),
					style: { zIndex: 1000000 },
				},
				otherProps,
			],
			enabled: mounted,
		});

		if (!mounted) {
			return null;
		}

		return (
			<FloatingFocusManager
				initialFocus={initialFocus}
				returnFocus={false}
				context={floatingContext}
				modal={modal}
				closeOnFocusOut={closeOnFocusOut}
			>
				<RemoveScroll enabled={removeScroll}>{element}</RemoveScroll>
			</FloatingFocusManager>
		);
	}
);

export namespace DialogPopup {
	export interface State {
		status: 'open' | 'close' | undefined;
	}
	export interface Props extends ModernComponentProps<'div', State> {}
}
