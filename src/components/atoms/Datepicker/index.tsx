import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import Calendar from 'images/icon/calendar.inline.svg';
import ExpandMore from 'images/icon/expand-more.inline.svg';
import ExpandLess from 'images/icon/expand-less.inline.svg';
import LeftArrow from 'images/icon/left-arrow.inline.svg';
import RightArrow from 'images/icon/right-arrow.inline.svg';
import Input from 'components/atoms/Input';
import { DatepickerModeType } from 'types/enum/datepicker-mode-type';
import moment from 'moment';
import classnames from 'classnames';
import Modal from 'components/molecules/Modal';
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
	onBlur?: () => void

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
	onBlur = () => {}
}) => {

	const isInit = useRef(true);
	const modalRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLDivElement>(null);
	const [mode, setMode] = useState(DatepickerModeType.DATE);
	const [isOpen, setIsOpen] = useState(false);
	const [selectingYearRange, setSelectingYearRange] = useState(Math.floor(+moment().format('yyyy') / 12));
	const initValue = moment(value).isValid() ? moment(value) : moment();
	const [selectingYearMonth, setSelectingYearMonth] = useState(initValue);
	const onClickWindow = useCallback((e: MouseEvent) => {
		e.stopPropagation();
		const targetDom = e.target as HTMLElement;
		if (
			!(modalRef.current as HTMLDivElement).contains(targetDom) &&
			!(inputRef.current as HTMLDivElement).contains(targetDom)
		) {
			setIsOpen(false);
		}
	}, []);

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

	// TODO: reposition

	/**
	 *
	 * @param date - 點擊的日期
	 * @param { -1 | 0 | 1} changeMonth - 點擊按鈕的類別： -1 表示 上個月 0 表示本月 1 表示 下個月
	 */
	const onClickDate = (date: number, changeMonth: -1 | 0 | 1) => {
		const newDate = moment(selectingYearMonth).month(selectingYearMonth.month() + changeMonth).date(date);
		setSelectingYearMonth(pre => moment(pre).month(moment(pre).month() + changeMonth));
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

	useEffect(() => {
		if (isOpen) {
			window.addEventListener('mousedown', onClickWindow);
		} else {
			window.removeEventListener('mousedown', onClickWindow);
		}
	}, [isOpen]);

	const yearList = Array(12).fill(0).map((_, index) => index + (12 * selectingYearRange));
	const startOfMonth = moment(selectingYearMonth).startOf('month').format('d');
	const endOfMonth = moment(selectingYearMonth).endOf('month').format('d');
	const totalDaysOfMonth = selectingYearMonth.daysInMonth();
	const lastMonthDayList = new Array(+startOfMonth).fill(0).map((_, index) => moment(moment(selectingYearMonth).startOf('month')).subtract(index + 1, 'days').format('D')).reverse();
	const daysList = new Array(totalDaysOfMonth).fill(0).map((_, index) => index + 1);
	const nextMonthDayList = new Array(6 - (+endOfMonth)).fill(0).map((_, index) => moment(moment(selectingYearMonth).endOf('month')).add(index + 1, 'days').format('D'));

	return (
		<div
			ref={inputRef}
			className={styles.datepicker}
		>
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

			<Modal
				isOpen={isOpen}
				ref={modalRef}
				styleMap={(
					{
						backdrop: styles.Datepicker,
						modalWrapper: '',
						modal: styles.datepickerModal
					}
				)}
				hasBackdrop={false}
				onClickBackdrop={() => {}}
			>
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
										{/* 上個月 */}
										{
											lastMonthDayList.map(v =>
												<span
													className={styles.notSelectingMonthDate}
													key={v}
													role='button'
													tabIndex={0}
													onKeyPress={() => {}}
													onClick={() => onClickDate(+v, -1)}
												>{v}</span>
											)
										}
										{/* 本月 */}
										{
											daysList.map(v =>
												<span
													key={v}
													role='button'
													tabIndex={0}
													onKeyPress={() => {}}
													onClick={() => onClickDate(v, 0)}
													className={+initValue.format('D') === v ? classnames(styles.active) : ''}


												>{v}</span>
											)
										}
										{/* 下個月 */}
										{
											nextMonthDayList.map(v =>
												<span
													className={styles.notSelectingMonthDate}
													key={v}
													role='button'
													tabIndex={0}
													onKeyPress={() => {}}
													onClick={() => onClickDate(+v, 1)}
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
			</Modal>

		</div>
	);
}

export default Datepicker;
