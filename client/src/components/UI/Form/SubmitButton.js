import { Button, Spinner } from 'reactstrap';

const SubmitButton = ({ isSubmitting, children, onLoadText, ...props }) => {
	return (
		<Button disabled={isSubmitting} {...props}>
			{isSubmitting ? (
				<>
					<Spinner size='sm' /> {onLoadText}
				</>
			) : (
				children
			)}
		</Button>
	);
};

export default SubmitButton;
