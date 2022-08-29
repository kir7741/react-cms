/**
 * 使用者之介面
 *
 * @export
 * @interface User
 */
export interface User {

	/**
	 * 使用者 id
	 *
	 * @type {number}
	 * @memberof User
	 */
	id: number;

	/**
	 * 使用者帳號
	 *
	 * @type {string}
	 * @memberof User
	 */
	account: string;

	/**
	 * 市話號碼
	 *
	 * @type {string}
	 * @memberof User
	 */
	telPhone: string;

	/**
	 * 手機號碼
	 *
	 * @type {string}
	 * @memberof User
	 */
	mobilePhone: string;

};
