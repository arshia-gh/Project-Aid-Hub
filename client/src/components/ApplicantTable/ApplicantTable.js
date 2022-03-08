// reactstrap components
import { Table } from 'reactstrap';
import ItemData from 'components/ApplicantTable/ItemData';

const ApplicantTable = ({ applicants }) => {
	return (
		<>
			<Table className='align-items-center table-flush' responsive>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>Fullname</th>
						<th scope='col'>IDno</th>
						<th scope='col'>Household Income</th>
						<th scope='col'>address</th>
						<th scope='col' />
					</tr>
				</thead>
				<tbody>
					{applicants.map((applicant) => (
						<tr key={applicant.username}>
							<ItemData applicant={applicant} />
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default ApplicantTable;
