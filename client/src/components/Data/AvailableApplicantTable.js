import { Link } from 'react-router-dom';
import {
	Table,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

export const AvailableApplicantTable = ({ applicants }) => {
	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					<th>Username</th>
					<th>Full Name</th>
					<th>ID Number</th>
					<th>Household Income</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{applicants.map((ap) => (
					<tr key={ap.id}>
						<td>{ap.username}</td>
						<td>{ap.fullname}</td>
						<td>{ap.IDno}</td>
						<td>RM{ap.householdIncome}</td>
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
										to={`/representative/applicants/${ap.IDno}`}>
										<DropdownItem>
											View Profile
										</DropdownItem>
									</Link>
									<Link
										to='./../disbursements/new'
										state={ap}>
										<DropdownItem>Select</DropdownItem>
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
