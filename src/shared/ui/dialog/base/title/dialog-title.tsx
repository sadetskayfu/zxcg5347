import * as React from 'react';
import { useDialogRootContext } from '../root/dialog-root-context';
import { useId, useModernLayoutEffect, useRenderElement } from '../../../../hooks';
import { ModernComponentProps } from '../../../../helpers/types';

/**
* Renders a `<h2>` element.
*/
export const DialogTitle = React.forwardRef(
  (props: DialogTitle.Props, forwardedRef: React.ForwardedRef<HTMLHeadingElement>) => {
    const { render, className, id: idProp, ...otherProps } = props;

    const id = useId(idProp)

    const { setTitleId } = useDialogRootContext()

    useModernLayoutEffect(() => {
        setTitleId(id)

        return () => {
            setTitleId(undefined)
        }
    }, [setTitleId, id])

    const element = useRenderElement('h2', {
      render,
      className,
      ref: forwardedRef,
      props: [{ id }, otherProps],
    });

    return element;
  }
);

export namespace DialogTitle {
  export interface State {}
  export interface Props extends ModernComponentProps<'h2', State> {}
}