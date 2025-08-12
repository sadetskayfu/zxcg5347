import * as React from 'react';
import { useDialogRootContext } from '../root/dialog-root-context';
import { useId, useModernLayoutEffect, useRenderElement } from '../../../../hooks';
import { ModernComponentProps } from '../../../../helpers/types';

/**
* Renders a `<p>` element.
*/
export const DialogDescription = React.forwardRef(
  (props: DialogDescription.Props, forwardedRef: React.ForwardedRef<HTMLParagraphElement>) => {
    const { render, className, id: idProp, ...otherProps } = props;

    const id = useId(idProp)

    const { setDescriptionId } = useDialogRootContext()

    useModernLayoutEffect(() => {
        setDescriptionId(id)

        return () => {
            setDescriptionId(undefined)
        }
    }, [setDescriptionId, id])

    const element = useRenderElement('p', {
      render,
      className,
      ref: forwardedRef,
      props: [{ id }, otherProps],
    });

    return element;
  }
);

export namespace DialogDescription {
  export interface State {}
  export interface Props extends ModernComponentProps<'p', State> {}
}