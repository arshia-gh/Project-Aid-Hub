import Select from 'react-select';
import { FormText, Label } from 'reactstrap';
import { useField } from 'formik';

const FieldSelect = ({ label, options, ...props }) => {
	const [field, meta, helper] = useField(props);
	return (
		<>
			{Label && <label>{label}</label>}
			<Select
				{...field}
				{...props}
				options={options}
				isSearchable
				value={
					options
						? options.find((option) => option.value === field.value)
						: ''
				}
				onChange={(option) => {
					helper.setValue(props.getOptionValue(option));
				}}
			/>
			{meta.error ? (
				<FormText className={meta.touched ? 'text-red' : ''}>
					{meta.error}
				</FormText>
			) : null}
		</>
	);
};

export default FieldSelect;
