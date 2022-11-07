import React from 'react';
import classnames from 'classnames';
import Input from 'components/atoms/Input';
import Textarea from 'components/atoms/Textarea';
import PasswordInput from 'components/atoms/PasswordInput';
import DropdownSelect from 'components/atoms/DropdownSelect';
import useForm from 'util/hook/useForm';
import { FormControl, FormControlBase } from 'types/interfaces/form-control';
import { fakeOptions } from 'types/constants/fake-options';
import { RadioGroup } from 'components/atoms/RadioGroup';
import { CheckboxGroup } from 'components/atoms/CheckboxGroup';

import globalStyles from 'global.css';
import styles from './index.css';

interface FormInputs {
	textInput: FormControl<string>;
	numberInput: FormControl<number>;
	disableInput: FormControl<string>;
	passWordInput: FormControl<string>;
	subInput1: FormControl<string>;
	subInput2: FormControl<string>;
	textarea: FormControl<string>;
	selectInput: FormControl<string>;
	radioInput: FormControl<string>;
	checkboxInput: FormControl<boolean[]>;
}

const FormInputs: React.FC = () => {

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
		textarea: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		selectInput: {
			value: '',
			errors: null,
			options: {
				validators: []
			}
		},
		radioInput: {
			value: 'M',
			errors: null,
			options: {
				validators: []
			}
		},
		checkboxInput: {
			value: [false , false, true],
			errors: null,
			options: {
				validators: []
			}
		}

	})

	return (
		<div className={classnames(styles.formInputs, globalStyles.row2)}>
			<div className={styles.leftPart}>
				<Input
					type="text"
					placeholder='請輸入'
					value={form.textInput.value}
					errorMsg=''
					onChangeValue={val => setCtrlValue('textInput', val)}
				/>
				<Input
					type="number"
					placeholder='請輸入'
					value={form.numberInput.value}
					errorMsg=''
					onChangeValue={val => setCtrlValue('numberInput', val)}
				/>
				<Input
					disabled
					type="text"
					placeholder='請輸入'
					value={form.disableInput.value}
					errorMsg=''
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
						onChangeValue={val => setCtrlValue('subInput1', val)}
					/>
					<Input
						type="text"
						placeholder='請輸入'
						value={form.subInput2.value}
						errorMsg=''
						onChangeValue={val => setCtrlValue('subInput2', val)}
					/>
				</div>

				<Textarea
					value={form.textarea.value}
					placeholder='請輸入'
					className={styles.textarea}
					onBlur={() => {}}
					onChangeValue={val => setCtrlValue('textarea', val)}
				/>

			</div>

			<div className={styles.rightPart}>
				<DropdownSelect
					options={fakeOptions}
					selectedId={form.selectInput.value}
					onChangeValue={val => setCtrlValue('selectInput', val)}
				/>

				<RadioGroup
					value={form.radioInput.value}
					styleMap={({
						radioGroup: styles.radioGroup,
						radio: styles.radio
					})}
					name='radioInput'
					errorMsg=''
					options={[{id: 'M', name: '男'}, {id: 'F', name: '女'}]}
					onChangeValue={val => setCtrlValue('radioInput', val)}
				/>

				<CheckboxGroup
					value={form.checkboxInput.value}
					styleMap={({
						checkboxGroup: styles.checkboxGroup,
						checkbox: styles.checkbox
					})}
					errorMsg=''
					options={['選項A', '選項B', '選項C']}
					onGroupChangeValue={val => setCtrlValue('checkboxInput', val)}
				/>
			</div>

		</div>
	)
};

export default FormInputs;
