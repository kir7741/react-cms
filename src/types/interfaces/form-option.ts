// Enums
import { ValidatorType } from "types/enum/validator-type";

export interface FormOption {

	/**
	 * 表單驗證列舉
	 */
	validators?: ValidatorType[];

	/**
	 * 非同步表單驗證列舉
	 * TODO: 待捕
	 */
	asyncValidators?: unknown;

	/**
	 * 表單更新時機
	 */
	updateOn?: 'change' | 'blur' | 'submit';

}
