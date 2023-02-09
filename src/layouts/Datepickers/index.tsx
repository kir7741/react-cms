import React from 'react';
import classnames from 'classnames';
import useForm from 'util/hook/useForm';
import Datepicker from 'components/atoms/Datepicker';
import { FormControl, FormControlBase } from 'types/interfaces/form-control';

import Grid from 'grid.css';
import styles from './index.module.css';

interface FormDatepickers {
	datepicker: FormControl<string>;
}

const Datepickers: React.FC = () => {

	const [
	 { form },
	 { setCtrlValue }
	] = useForm<FormControlBase<FormDatepickers>>({
	 datepicker: {
		 value: '',
		 errors: null,
		 options: {
			 validators: []
		 }
	 }
	});

	return (
		<div className={classnames(styles.formInputs, Grid.row2)}>
			<div className={styles.leftPart}>
				<Datepicker
					placeholder='請輸入'
					value={form.datepicker.value}
					errorMsg=''
					onChangeValue={val => setCtrlValue('datepicker', val)}
				/>

			</div>
		</div>
	);

}

export default Datepickers;
