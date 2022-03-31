import { Table } from 'reactstrap';

export const GoodsTable = ({ goods }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Received Date</th>
					<th>Estimated Value</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				{goods.map((g) => (
					<tr key={g.id}>
						<td>{g.receivedDate}</td>
						<td>RM{parseFloat(g.estimatedValue).toFixed(2)}</td>
						<td>{g.description}</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
