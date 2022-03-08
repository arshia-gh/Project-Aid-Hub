// reactstrap components
import { Badge } from 'reactstrap';

const ItemData = ({ org, isActive }) => {
	return (
		<>
			<th scope='row'>
				<Badge
					color='primary'
					style={{
						cursor: 'default',
					}}
					className={isActive ? 'text-white bg-blue' : ''}>
					{org.id}
				</Badge>
			</th>
			<td>{org.name}</td>
			<td>{org.address}</td>
		</>
	);
};

export default ItemData;
