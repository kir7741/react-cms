const setCtrlValue = <T, R>(form: T, ctrlName: keyof T, value: R): Partial<T> => ({
	[ctrlName]: {
		...form[ctrlName],
		value
	}
} as Partial<T>);

export {
	setCtrlValue
};
