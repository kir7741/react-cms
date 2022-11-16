import React, { InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import styles from './index.css';

interface RangeSliderProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * 樣式設定
	 *
	 * @type {string}
	 * @memberof RangeSliderProperty
	 */
	className?: string;

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof RangeSliderProperty
	 */
	updateCtrlValidity?: () => void;

	/**
	 * change 時觸發的函式
	 *
	 * @memberof RangeSliderProperty
	 */
	onChangeValue: (val: string) => void;

}

const RangeSlider: React.FC<RangeSliderProperty> = ({
	className,
	min = 0,
	max = 100,
	value = 0,
	step = 0,
	updateCtrlValidity = () => {},
	onChangeValue = () => {}

}) => {

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
	};

	return (
		<div className={classnames(styles.rangeSlider, className)}>
			<input
				type="range"
				min={min}
				max={max}
				value={value}
				step={step}
				onChange={e => handleInputChange(e)}
			/>
		</div>
	);
};

export default RangeSlider;
