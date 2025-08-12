import React from 'react';
import { useLazyRef } from './use-lazy-ref';

const useInsertionEffect = (React as any)[
	`useInsertionEffect${Math.random().toFixed(1)}`.slice(0, -3)
];
const useSafeInsertionEffect =
	// React 17 doesn't have useInsertionEffect.
	useInsertionEffect &&
	// Preact replaces useInsertionEffect with useLayoutEffect and fires too late.
	useInsertionEffect !== React.useLayoutEffect
		? useInsertionEffect
		: (fn: any) => fn();

type Callback = (...args: any[]) => any;

type Stable<T extends Callback> = {
	/** The next value for callback */
	next: T | undefined;
	/** The function to be called by trampoline. This must fail during the initial render phase. */
	callback: T | undefined;
	trampoline: T;
	effect: () => void;
};

export function useEventCallback<T extends Callback>(callback: T | undefined): T {
	const stable = useLazyRef(createStableCallback).current;
	stable.next = callback;
	useSafeInsertionEffect(stable.effect);
	return stable.trampoline;
}

function createStableCallback() {
	const stable: Stable<any> = {
		next: undefined,
		callback: assertNotCalled,
		trampoline: (...args: []) => stable.callback?.(...args),
		effect: () => {
			stable.callback = stable.next;
		},
	};
	return stable;
}

function assertNotCalled() {
	throw new Error('Cannot call an event handler while rendering.');
}
