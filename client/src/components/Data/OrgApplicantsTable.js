import { Table } from 'reactstrap';

export const OrgApplicantsTable = ({ applicants }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Username</th>
					<th>Full Name</th>
					<th>ID Number</th>
					<th>Household Income</th>
				</tr>
			</thead>
			<tbody>
				{applicants.map((ap) => (
					<tr key={ap.id}>
						<td>{ap.username}</td>
						<td>{ap.fullname}</td>
						<td>{ap.IDno}</td>
						<td>RM{ap.householdIncome}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
