import { useField } from 'formik';
import moment from 'moment';
import Datetime from 'react-datetime';
import {
	FormText,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	Label,
} from 'reactstrap';

const formatDate = (momentDate) => {
	return moment(momentDate).format('YYYY-MM-DD');
};

const FieldDate = ({ label, ...props }) => {
	const [field, meta, helper] = useField(props);
	return (
		<>
			{label && <Label>{label}</Label>}
			<InputGroup>
				<InputGroupAddon addonType='prepend'>
					<InputGroupText>
						<i className='ni ni-calendar-grid-58' />
					</InputGroupText>
				</InputGroupAddon>
				<Datetime
					{...props}
					{...field}
					onChange={(val) => {
						helper.setValue(formatDate(val._d));
					}}
				/>
			</InputGroup>
			{meta.error ? (
				<FormText className='text-red'>{meta.error}</FormText>
			) : null}
		</>
	);
};

export default FieldDate;
