import { Link } from 'react-router-dom';
import {
	Table,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

export const AppealDisbursementsTable = ({ disbursements }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Disbursement Date</th>
					<th>Amount</th>
					<th>Description</th>
					<th>Applicant Name</th>
					<th>Applicant IDno</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{disbursements.map((d, key) => (
					<tr key={key}>
						<td>{d.disbursementDate}</td>
						<td>RM{parseFloat(d.amount).toFixed(2)}</td>
						<td>{d.description}</td>
						<td>{d.User.fullname}</td>
						<td>{d.User.IDno}</td>
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
									<Link
										to={`/representative/applicants/${d.User.IDno}`}>
										<DropdownItem>
											View Applicant Profile
										</DropdownItem>
									</Link>
								</DropdownMenu>
							</UncontrolledDropdown>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};
