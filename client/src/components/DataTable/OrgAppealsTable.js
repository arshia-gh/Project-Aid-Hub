import { Badge, Table } from 'reactstrap';

const getStatusBadge = (status) => {
	const color =
		status === 'collecting'
			? 'success'
			: status === 'disbursing'
			? 'primary'
			: 'warning';
	return <Badge color={color}>{status.toUpperCase()}</Badge>;
};

export const OrgAppealsTable = ({ appeals }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Status</th>
					<th>Title</th>
					<th>Target Amount</th>
					<th>Donated Amount</th>
					<th>Disbursed Amount</th>
				</tr>
			</thead>
			<tbody>
				{appeals.map((ap) => {
					const donatedAmount =
						parseFloat(ap.donatedCash ?? 0) +
						parseFloat(ap.donatedGoods ?? 0);
					const disbursedAmount = parseFloat(ap.disbursedAmount ?? 0);
					return (
						<tr key={ap.id}>
							<td>{getStatusBadge(ap.outcome)}</td>
							<td>{ap.title}</td>
							<td>RM{ap.targetAmount}</td>
							<td>
								RM
								{donatedAmount.toFixed(2)}
							</td>
							<td>RM{disbursedAmount.toFixed(2)}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
