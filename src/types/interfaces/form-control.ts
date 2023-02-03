import { FormOption } from "./form-option";

/**
 * 表單錯誤型別
 */
export type FormErrors = Record<string, unknown> | null;

/**
 * 表單基礎型別
 */
export type FormControlBase<T> = {
	[k in keyof T]: T[k]
};

/**
 * 表單元件
 *
 * @export
 * @interface FormControl
 * @template D - 資料型別
 */
export interface FormControl<D = unknown> {

	/**
	 * 欄位資料
	 *
	 * @type {D}
	 * @memberof FormControl
	 */
	value: D;

	/**
	 * 欄位錯誤
	 *
	 * @type {FormErrors}
	 * @memberof FormControl
	 */
	errors: FormErrors;

	/**
	 * 表單額外設定
	 *
	 * @type {FormErrors}
	 * @memberof FormControl
	 */
	options?: FormOption;

}
