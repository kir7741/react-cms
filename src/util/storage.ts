import { StorageType } from 'types/enum/storage-type';

/**
 * 加入前綴字
 *
 * @param {string} key
 */
const prefix = (key: string) => `reactCms-${key}`;

/**
 * 儲存資料
 *
 * @template T - 欲儲存的資料型別
 * @param {string} key - 名稱
 * @param {StorageType} type - 儲存類型
 * @param {T} data - 欲儲存的資料
 */
const setItem = <T>(key: string, type: StorageType, data: T) => {

	const fullKey = prefix(key);

	switch (type) {

		case StorageType.SESSION:
			sessionStorage.setItem(fullKey, JSON.stringify(data));
			break;

		case StorageType.LOCAL:
			localStorage.setItem(fullKey, JSON.stringify(data));
			break;

		default:
			break;

	}

};

/**
 * 取得資料
 *
 * @template T - 欲回傳的資料型別
 * @param {string} key - 名稱
 * @param {StorageType} type - 儲存類型
 * @return {T}
 */
const getItem = <T>(key: string, type: StorageType): T => {

	const fullKey = prefix(key);

	switch (type) {

		case StorageType.SESSION:
			return JSON.parse(sessionStorage.getItem(fullKey) as string) as T;

		case StorageType.LOCAL:
			return JSON.parse(localStorage.getItem(fullKey) as string) as T;

		default:
			return null as T;

	}

}

/**
 * 移除資料
 *
 * @param {string} key - 名稱
 * @param {StorageType} type - 儲存類型
 */
const removeItem = (key: string, type: StorageType) => {

	const fullKey = prefix(key);

	switch (type) {

		case StorageType.SESSION:
			sessionStorage.removeItem(fullKey);
			break;

		case StorageType.LOCAL:
			localStorage.removeItem(fullKey);
			break;

		default:
			break;

	}

};

/**
 * 清空資料
 *
 * @param {StorageType} type - 儲存類型
 */
const clear = (type: StorageType) => {

	switch (type) {

		case StorageType.SESSION:
			sessionStorage.clear();
			break;

		case StorageType.LOCAL:
			localStorage.clear();
			break;

		default:
			break;

	}

}

export {
	getItem,
	setItem,
	removeItem,
	clear
};
