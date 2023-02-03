import { Validators } from "util/validator-fn";
import { ValidatorType } from "types/enum/validator-type";
import { FormErrors } from "types/interfaces/form-control";

const validatorsMap: Record<string, <D>(value: D) => FormErrors> = {
	[ValidatorType.REQUIRED]: Validators.require
};

export default validatorsMap;
