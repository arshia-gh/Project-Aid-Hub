import { Table } from 'reactstrap';
import RepresentativeData from './RepresentativeData';

const RepresentativeTable = ({ representatives }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th scope='col'>Username</th>
					<th scope='col'>Fullname</th>
					<th scope='col'>Job Title</th>
					<th scope='col'>Email Address</th>
					<th scope='col'>HP Number</th>
				</tr>
			</thead>
			<tbody>
				{representatives.map((rep) => (
					<RepresentativeData rep={rep} />
				))}
			</tbody>
		</Table>
	);
};

export default RepresentativeTable;
