import { Link } from 'react-router-dom';
import {
	Badge,
	Table,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

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
					<th />
				</tr>
			</thead>
			<tbody>
				{appeals.map((ap) => {
					const donatedAmount =
						parseFloat(ap.donatedCash) +
						parseFloat(ap.donatedGoods);
					const disbursedAmount = parseFloat(ap.disbursedAmount);
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
							<td className='text-right'>
								<UncontrolledDropdown>
									<DropdownToggle
										className='btn-icon-only text-light'
										role='button'
										size='sm'
										color=''
										onClick={(e) => e.preventDefault()}>
										<i className='fas fa-ellipsis-v' />
									</DropdownToggle>
									<DropdownMenu
										className='dropdown-menu-arrow'
										right>
										<Link to={`appeals/${ap.id}`}>
											<DropdownItem>
												Manage Appeal
											</DropdownItem>
										</Link>
									</DropdownMenu>
								</UncontrolledDropdown>
							</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
