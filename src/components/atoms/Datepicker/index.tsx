import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Calendar from 'images/icon/calendar.inline.svg';
import Input from 'components/atoms/Input';
import moment, { Moment } from 'moment';
import styles from './index.css';
import { DatepickerModeType } from 'types/enum/datepicker-mode-type';

/**
 * 樣式的介面
 *
 * @interface StyleMap
 */
interface StyleMap {
	inputField: string;
	label: string;
	inputWrapper: string;
	input: string;
	error: string;
}

interface DatepickerProperty extends InputHTMLAttributes<HTMLInputElement> {

	/**
	 * 樣式的種類
	 *
	 * @type {Partial<StyleMap>}
	 * @memberof InputProperty
	 */
	styleMap?: Partial<StyleMap>;

	/**
	 * label 文字
	 *
	 * @type {string}
	 * @memberof DatepickerProperty
	 */
	labelText?: string;

	/**
	 * 錯誤訊息
	 *
	 * @type {string}
	 * @memberof DatepickerProperty
	 */
	errorMsg?: string;

	/**
	 * 是否在 blur 時觸發檢核
	 *
	 * @type {boolean}
	 * @memberof DatepickerProperty
	 */
	validOnBlur?: boolean;

	/**
	 * 更新表單檢核狀態
	 *
	 * @memberof DatepickerProperty
	 */
	updateCtrlValidity?: () => void,

	/**
	 * change 時觸發的函式
	 *
	 * @memberof DatepickerProperty
	 */
	onChangeValue: (val: string | number) => void

	/**
	 * blur 時觸發的函式
	 *
	 * @memberof DatepickerProperty
	 */
	blur?: () => void

}

const monthList = [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


const Datepicker: React.FC<DatepickerProperty> = ({
	styleMap = {},
	placeholder = '',
	value = '',
	labelText = '',
	errorMsg = '',
	validOnBlur = false,
	disabled,
	updateCtrlValidity = () => {},
	onChangeValue,
	blur = () => {}
}) => {

	const isInit = useRef(true);
	// TODO: 切換模式
	const [mode, setMode] = useState(DatepickerModeType.YEAR);
	const [selectingYearRange, setSelectingYearRange] = useState(Math.floor(+moment().format('yyyy') / 12));
	const [selectingDate, setSelectingDate] = useState(moment());
	const monthChange = (time: Moment) => {

	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const val = e.target.value;
		onChangeValue(val);
	};

	const onClickLastBtn = () => {
		switch(mode) {

			case DatepickerModeType.YEAR:
				setSelectingYearRange(selectingYearRange - 1);
				break;
			case DatepickerModeType.MONTH:
				setSelectingDate(moment(selectingDate).subtract(1, 'year'));
				break;
			case DatepickerModeType.DATE:
				setSelectingDate(moment(selectingDate).subtract(1, 'month'));
				break;
			default:
				break;

		}
	}

	const onClickNextBtn = () => {
		switch(mode) {

			case DatepickerModeType.YEAR:
				setSelectingYearRange(selectingYearRange + 1);
				break;
			case DatepickerModeType.MONTH:
				setSelectingDate(moment(selectingDate).add(1, 'year'));
				break;
			case DatepickerModeType.DATE:
				setSelectingDate(moment(selectingDate).add(1, 'month'));
				break;
			default:
				break;

		}
	}

	const onFocus = () => {
		console.log('focus')
	}

	useEffect(() => {

		if (isInit.current) {
			isInit.current = false;
			return;
		}

		if (!validOnBlur) {
			updateCtrlValidity();
		}

	}, [value]);

	const yearList = Array(12).fill(0).map((_, index) => index + (12 * selectingYearRange));

	// TODO: 1. 三個日期列表樣式調整 2. 動態計算月份跟日期
	const startOfMonth = moment(selectingDate).startOf('month').format('d');
	const endOfMonth = moment(selectingDate).endOf('month').format('d');
	const totalDaysOfMonth = moment().daysInMonth() // 31
	const lastMonthDayList = new Array(+startOfMonth).fill(0).map((_, index) => moment(moment().startOf('month')).subtract(index + 1, 'days').format('D')).reverse();
	const daysList = new Array(totalDaysOfMonth).fill(0).map((_, index) => index + 1);
	const nextMonthDayList = new Array(6 - (+endOfMonth)).fill(0).map((_, index) => moment(moment().endOf('month')).add(index + 1, 'days').format('D'));

	return (
		<div className={styles.datepicker}>
			<Input
				readOnly
				type="text"
				disabled={disabled}
				placeholder={placeholder}
				styleMap={styleMap}
				onChangeValue={onChangeValue}
				onFocus={onFocus}
			/>
			<div
				className={styles.icon}
				onKeyDown={() => {}}
				role="button"
				tabIndex={0}
				onClick={onFocus}
			>
				<Calendar />
			</div>
			<div className={styles.calendar}>
				<div className={styles.calendarHeader}>
					<div
						role='button'
						tabIndex={0}
						className={styles.lastBtn}
						onKeyPress={() => {}}
						onClick={() => onClickLastBtn()}
					>&lt;</div>
					<div>
						{
							mode === DatepickerModeType.YEAR && `${yearList[0]} - ${yearList[11]}`
						}
						{
							mode === DatepickerModeType.MONTH && selectingDate.format('yyyy')
						}
						{
							mode === DatepickerModeType.DATE && selectingDate.format('MMM yyyy')
						}
					</div>
					<div
						role='button'
						tabIndex={0}
						className={styles.nextBtn}
						onKeyPress={() => {}}
						onClick={() => onClickNextBtn()}
					>&gt;</div>
				</div>
				<div className={styles.calendarBody}>

					{
						mode === DatepickerModeType.DATE && (
							<>
								<div className={styles.calendarDay}>
									<span>Su</span>
									<span>Mo</span>
									<span>Tu</span>
									<span>We</span>
									<span>Th</span>
									<span>Fr</span>
									<span>Sa</span>
								</div>
								<div className={styles.calendarDate}>
									{
										lastMonthDayList.map(v =>
											<span
												className={styles.notSelectingMonthDate}
												key={v}
											>{v}</span>
										)
									}
									{
										daysList.map(v =>
											<span key={v}>{v}</span>
										)
									}
									{
										nextMonthDayList.map(v =>
											<span
												className={styles.notSelectingMonthDate}
												key={v}
											>
												{v}
											</span>
										)
									}
								</div>
							</>
						)
					}

					{
						mode === DatepickerModeType.YEAR && (
							<>
								<div className={styles.calendarYear}>
									{
										yearList.map(y => (
											<span key={y}>{y}</span>
										))
									}
								</div>
							</>
						)
					}

					{
						mode === DatepickerModeType.MONTH && (
							<>
								<div className={styles.calendarMonth}>

									{
										monthList.map(m =>
											<span key={m}>{m}</span>
										)
									}
								</div>

							</>
						)
					}

				</div>

			</div>
		</div>
	);
}

export default Datepicker;
