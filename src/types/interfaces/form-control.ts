/**
 * 表單錯誤型別
 */
export type FormErrors = Record<string, any> | null;

/**
 * 表單元件
 *
 * @export
 * @interface FormControl
 * @template D - 資料型別
 */
export interface FormControl<D> {

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

}
