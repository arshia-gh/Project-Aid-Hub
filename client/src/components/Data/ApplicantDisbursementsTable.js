import { Table } from 'reactstrap';

export const ApplicantDisbursementsTable = ({ disbursements }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Disbursement Date</th>
					<th>Amount</th>
					<th>Description</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{disbursements.map((d, key) => (
					<tr key={key}>
						<td>{d.disbursementDate}</td>
						<td>RM{parseFloat(d.amount).toFixed(2)}</td>
						<td>{d.description}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
