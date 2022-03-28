import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

const ReturnButton = (props) => {
	const navigate = useNavigate();

	return (
		<Button
			onClick={() => navigate(-1)}
			type='button'
			size='sm'
			color='warning'
			{...props}>
			<i className='fas fa-arrow-circle-left'></i> RETURN
		</Button>
	);
};

export default ReturnButton;
