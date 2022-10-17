import React from 'react';
import classnames from 'classnames';
import Input from 'components/atoms/Input';
import PasswordInput from 'components/atoms/PasswordInput';
import { FormControl, FormControlBase } from 'types/interfaces/form-control';

import globalStyles from 'global.css';
import styles from './index.css';
import useForm from '../../util/hook/useForm';

interface FormInputsProperty { }

interface FormInputs {
	textInput: FormControl<string>;
	numberInput: FormControl<number>;
	disableInput: FormControl<string>;
	passWordInput: FormControl<string>;
	subInput1: FormControl<string>;
	subInput2: FormControl<string>;
	test3: FormControl<string>;
	test4: FormControl<string>;
}

const FormInputs: React.FC<FormInputsProperty> = ({ className }) => {

	const [
		{ form },
		{ setCtrlValue, updateCtrlValidity, updateValidity, getCtrlErrorMsg}
	] = useForm<FormControlBase<FormInputs>>({
		textInput: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		numberInput: {
			value: 0,
			errors: null,
			options: {
				validators: []
			}
		},
		disableInput: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		passWordInput: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		subInput1: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		subInput2: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		test3: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		test4: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		}
	})

	return (
		<div
			className={classnames(styles.formInputs, globalStyles.row2)}
		>
			<div className={styles.leftPart}>
				<Input
					type="text"
					placeholder='請輸入'
					value={form.textInput.value}
					errorMsg=''
					updateCtrlValidity={() => {}}
					onChangeValue={val => setCtrlValue('textInput', val)}
				/>
				<Input
					type="number"
					placeholder='請輸入'
					value={form.numberInput.value}
					errorMsg=''
					updateCtrlValidity={() => {}}
					onChangeValue={val => setCtrlValue('numberInput', val)}
				/>
				<Input
					disabled
					type="text"
					placeholder='請輸入'
					value={form.disableInput.value}
					errorMsg=''
					updateCtrlValidity={() => {}}
					onChangeValue={val => setCtrlValue('disableInput', val)}
				/>
				<PasswordInput
					placeholder='密碼'
					value={form.passWordInput.value}
					validOnBlur
					onChangeValue={val => setCtrlValue('passWordInput', val)}
				/>

				<div className={classnames(globalStyles.row2)}>
					<Input
						type="text"
						placeholder='請輸入'
						value={form.subInput1.value}
						errorMsg=''
						updateCtrlValidity={() => {}}
						onChangeValue={val => setCtrlValue('subInput1', val)}
					/>
					<Input
						type="text"
						placeholder='請輸入'
						value={form.subInput2.value}
						errorMsg=''
						updateCtrlValidity={() => {}}
						onChangeValue={val => setCtrlValue('subInput2', val)}
					/>
				</div>
			</div>

			<div className={styles.rightPart}>
				<Input
					type="text"
					placeholder='請輸入'
					value={form.test3.value}
					errorMsg=''
					updateCtrlValidity={() => {}}
					onChangeValue={val => setCtrlValue('test3', val)}
				/>
				<Input
					type="text"
					placeholder='請輸入'
					value={form.test4.value}
					errorMsg=''
					updateCtrlValidity={() => {}}
					onChangeValue={val => setCtrlValue('test4', val)}
				/>
			</div>
		</div>
	)
};

export default FormInputs;
