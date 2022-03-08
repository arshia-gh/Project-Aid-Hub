import ReturnButton from './ReturnButton';
import { Button } from 'reactstrap';

const FormFooter = ({ onReset }) => {
	return (
		<div className='d-flex align-items-center'>
			<ReturnButton />

			<Button
				color='danger'
				size='sm'
				type='reset'
				onClick={() => onReset()}>
				<i className='fas fa-trash-alt'></i> CLEAN
			</Button>

			<Button color='success' size='sm' type='submit' className='ml-auto'>
				SUBMIT <i className='fas fa-paper-plane'></i>
			</Button>
		</div>
	);
};

export default FormFooter;
