import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import Calendar from 'images/icon/calendar.inline.svg';
import ExpandMore from 'images/icon/expand-more.inline.svg';
import ExpandLess from 'images/icon/expand-less.inline.svg';
import LeftArrow from 'images/icon/left-arrow.inline.svg';
import RightArrow from 'images/icon/right-arrow.inline.svg';
import Input from 'components/atoms/Input';
import { DatepickerModeType } from 'types/enum/datepicker-mode-type';
import moment from 'moment';
import classnames from 'classnames';
import styles from './index.module.css';

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
	 * 初始值
	 *
	 * @type {string}
	 * @memberof DatepickerProperty
	 */
	value?: string;

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

// TODO: onClick 上下箭頭功能合併（next, prev）
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
	const [mode, setMode] = useState(DatepickerModeType.DATE);
	const [isOpen, setIsOpen] = useState(false);
	const [selectingYearRange, setSelectingYearRange] = useState(Math.floor(+moment().format('yyyy') / 12));
	const initValue = moment(value).isValid() ? moment(value) : moment();
	const [selectingYearMonth, setSelectingYearMonth] = useState(initValue);

	/**
	 * 點擊方向鍵頭按鈕
	 *
	 * @params {1 | -1} addNum - 點擊按鈕的類別： 1 表示 下一頁  -1 表示 上一頁
	 */
	const onClickArrow = (addNum: 1 | -1) => {
		switch(mode) {

			case DatepickerModeType.YEAR:
				setSelectingYearRange(selectingYearRange + addNum);
				break;
			case DatepickerModeType.MONTH:
				setSelectingYearMonth(pre => moment(pre).add(addNum, 'year'));
				break;
			case DatepickerModeType.DATE:
				setSelectingYearMonth(pre => moment(pre).add(addNum, 'month'))
				break;
			default:
				break;

		}
	}

	const changeMode = () => {
		switch(mode) {
			case DatepickerModeType.YEAR:
			case DatepickerModeType.MONTH:
				setMode(DatepickerModeType.DATE);
				break;
			case DatepickerModeType.DATE:
				setMode(DatepickerModeType.YEAR);
				break;
			default:
				break;
		}
	}

	const onClickYear = (year: number) => {
		setSelectingYearMonth(pre => moment(pre).year(year));
		setMode(DatepickerModeType.MONTH);
	}

	const onClickMonth = (month: number) => {
		setSelectingYearMonth(pre => moment(pre).month(month))
		setMode(DatepickerModeType.DATE);
	}

	// TODO: FocusOut
	// TODO: FocusEvent.relatedTarget
	// TODO: reposition
	const onClickDate = (date: number) => {
		const newDate = moment(selectingYearMonth).date(date);
		onChangeValue(newDate.format('yyyy-MM-DD'));
		setIsOpen(false);
	}

	const onFocus = () => {
		setIsOpen(true);
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
	const startOfMonth = moment(selectingYearMonth).startOf('month').format('d');
	const endOfMonth = moment(selectingYearMonth).endOf('month').format('d');
	const totalDaysOfMonth = selectingYearMonth.daysInMonth();
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
				value={value}
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
			{
				isOpen && (
					<div className={styles.calendar}>
						<div className={styles.calendarHeader}>
							<div
								role='button'
								tabIndex={0}
								className={styles.prevBtn}
								onKeyPress={() => {}}
								onClick={() => onClickArrow(-1)}
							>
								<LeftArrow />
							</div>
							<div
								role='button'
								tabIndex={0}
								className={styles.modeBtn}
								onKeyPress={() => {}}
								onClick={() => changeMode()}
							>
								{
									mode === DatepickerModeType.YEAR && <>{`${yearList[0]} - ${yearList[11]}`}<ExpandMore /></>
								}
								{
									mode === DatepickerModeType.MONTH && <>{selectingYearMonth.format('yyyy')}<ExpandMore /></>
								}
								{
									mode === DatepickerModeType.DATE && <>{selectingYearMonth.format('MMM yyyy')}<ExpandLess /></>
								}
							</div>
							<div
								role='button'
								tabIndex={0}
								className={styles.nextBtn}
								onKeyPress={() => {}}
								onClick={() => onClickArrow(1)}
							>
								<RightArrow />
							</div>
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
													<span
														key={v}
														role='button'
														tabIndex={0}
														onKeyPress={() => {}}
														onClick={() => onClickDate(v)}
														className={+initValue.format('D') === v ? classnames(styles.active) : ''}


													>{v}</span>
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
									<div className={styles.calendarYear}>
										{
											yearList.map(y => (
												<span
													key={y}
													role='button'
													tabIndex={0}
													onKeyPress={() => {}}
													onClick={() => onClickYear(y)}
													className={+selectingYearMonth.format('yyyy') === y ? classnames(styles.active) : ''}
												>{y}</span>
											))
										}
									</div>
								)
							}

							{
								mode === DatepickerModeType.MONTH && (
									<div className={styles.calendarMonth}>

										{
											monthList.map((m, index) =>
												<span
													key={m}
													role='button'
													tabIndex={0}
													onKeyPress={() => {}}
													onClick={() => onClickMonth(index)}
													className={+selectingYearMonth.format('M') === index + 1 ? classnames(styles.active) : ''}
												>{m}</span>
											)
										}
									</div>
								)
							}

						</div>

					</div>
				)
			}

		</div>
	);
}

export default Datepicker;
