import { Table } from 'reactstrap';

export const CashDonationsTable = ({ cashDonations }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Received Date</th>
					<th>Amount</th>
					<th>Payment Channel</th>
					<th>Reference Number</th>
				</tr>
			</thead>
			<tbody>
				{cashDonations.map((cd) => (
					<tr key={cd.id}>
						<td>{cd.receivedDate}</td>
						<td>RM{parseFloat(cd.amount).toFixed(2)}</td>
						<td>{cd.paymentChannel}</td>
						<td>{cd.referenceNo}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
