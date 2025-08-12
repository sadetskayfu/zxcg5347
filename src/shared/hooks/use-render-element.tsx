import * as React from 'react';
import { mergeProps, mergePropsN } from '../helpers/merge-props';
import type {
	ModernComponentProps,
} from '../helpers/types';
import { resolveClassName } from '../helpers/resolve-class-name';
import { useMergeRefs } from '@floating-ui/react';
import { classNames } from '../helpers/class-names';
import { EMPTY_OBJECT } from '../constants';

type IntrinsicTagName = keyof React.JSX.IntrinsicElements;
type Props<TagName> = TagName extends keyof React.JSX.IntrinsicElements
	? React.JSX.IntrinsicElements[TagName]
	: React.HTMLAttributes<any>;

interface UseRenderElementParams<
	TagName extends IntrinsicTagName,
	ElementType extends Element,
	State extends Record<string, any>,
	Enabled extends boolean | undefined = undefined,
> {
	props:
		| Props<TagName>
		| Array<Props<TagName> | undefined | ((props: Props<TagName>) => Props<TagName>)>;
	className?: string | ((state: State) => string);
	render?:
		| React.ReactElement<Record<string, unknown>>
		| ((props: React.HTMLAttributes<any>, state: State) => React.ReactElement<Record<string, any>>);
	state?: State;
	ref?: React.Ref<ElementType> | (React.Ref<ElementType> | undefined)[];
	enabled?: Enabled;
}

export function useRenderElement<
	TagName extends IntrinsicTagName,
	ElementType extends Element,
	State extends Record<string, any>,
	Enabled extends boolean | undefined = undefined,
>(
	tagName: TagName,
	params: UseRenderElementParams<TagName, ElementType, State, Enabled>
): Enabled extends false ? null : React.ReactElement<Record<string, any>> {
	const { render, className, props, state = EMPTY_OBJECT as State, ref, enabled = true } = params;

	const outProps: React.HTMLAttributes<any> & React.RefAttributes<any> = enabled
		? Array.isArray(props)
			? mergePropsN(props)
			: props
		: EMPTY_OBJECT;

	const childRef = getChildRef(render)

	outProps.ref = useMergeRefs(
		Array.isArray(ref) ? [childRef, outProps.ref, ...ref] : [childRef, outProps.ref, ref]
	);

	if (!enabled) return null as Enabled extends false ? null : React.ReactElement<Record<string, any>>

	if (className) {
		outProps.className = classNames(outProps.className, [resolveClassName(className, state)]);
	}

	if (render) {
		if (typeof render === 'function') {
			return render(outProps, state) as Enabled extends false ? null : React.ReactElement<Record<string, any>>
		}

		const mergedProps = mergeProps(outProps, render.props)

		return React.cloneElement(render, mergedProps) as Enabled extends false ? null : React.ReactElement<Record<string, any>>
	}

	return renderTag(tagName, outProps) as Enabled extends false ? null : React.ReactElement<Record<string, any>>
}

function renderTag(TagName: React.ElementType, props: Record<string, any>) {
	if (TagName === 'button') {
		return <button type="button" {...props} />;
	}
	if (TagName === 'img') {
		return <img alt="" {...props} />;
	}
	return React.createElement(TagName, props);
}

function getChildRef<ElementType extends React.ElementType, State>(
	render: ModernComponentProps<ElementType, State>['render']
): React.RefCallback<any> | null {
	if (render && typeof render !== 'function') {
		return render.props.ref // only work in react v.19+ / render.ref for <19
	}
	return null;
}
