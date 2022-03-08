import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';

const ReturnButton = () => {
	const history = useHistory();
	return (
		<Button
			color='warning'
			size='sm'
			type='button'
			onClick={() => history.goBack()}>
			<i className='fas fa-arrow-circle-left'></i> RETURN
		</Button>
	);
};

export default ReturnButton;
