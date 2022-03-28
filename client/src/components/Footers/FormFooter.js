import SubmitButton from 'components/UI/Form/SubmitButton';
import ReturnButton from 'components/UI/ReturnButton';
import { Button } from 'reactstrap';

const FormFooter = ({ onReset, isSubmitting, size = 'sm' }) => {
	return (
		<div className='d-flex align-items-center'>
			<ReturnButton color='warning' size={size} />

			<Button
				color='danger'
				size={size}
				type='reset'
				onClick={() => onReset()}>
				<i className='fas fa-trash-alt'></i> CLEAN
			</Button>

			<SubmitButton
				color='success'
				size={size}
				isSubmitting={isSubmitting}
				type='submit'
				className='ml-auto'>
				SUBMIT <i className='fas fa-paper-plane'></i>
			</SubmitButton>
		</div>
	);
};

export default FormFooter;
