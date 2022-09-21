// Enums
import { ValidatorType } from "types/enum/validator-type";
import { FormErrors } from "./form-control";

export interface FormOption {

	/**
	 * 表單驗證列舉
	 */
	validators?: Array<ValidatorType | ((val: unknown) => FormErrors)>;

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
