/**
 * 功能選單之介面
 *
 * @export
 * @interface Menu
 */
export interface Menu {

	/**
	 * id
	 *
	 * @type {string}
	 * @memberof Menu
	 */
	id: string;

	/**
	 * 選單名稱
	 *
	 * @type {string}
	 * @memberof Menu
	 */
	name: string;

	/**
	 * 路由名稱
	 *
	 * @type {string}
	 * @memberof Menu
	 */
	path: string;

	/**
	 * 子功能列表
	 *
	 * @type {Menu[]}
	 * @memberof Menu
	 */
	subMenus: Menu[];

}
