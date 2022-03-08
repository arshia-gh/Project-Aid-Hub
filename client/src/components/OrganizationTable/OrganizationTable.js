import { useState } from 'react';

// reactstrap components
import { Table } from 'reactstrap';
import ItemData from 'components/OrganizationTable/ItemData';
import ItemToolBar from './ItemToolBar';

const OrganizationTable = ({ organizations, location }) => {
	const [activeOrg, setActiveOrg] = useState();

	return (
		<>
			<Table className='align-items-center table-flush' responsive>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>ID</th>
						<th scope='col'>Name</th>
						<th scope='col'>Address</th>
						<th scope='col' />
					</tr>
				</thead>
				<tbody onMouseLeave={() => setActiveOrg(null)}>
					{organizations.map((org) => (
						<tr
							onMouseEnter={() => setActiveOrg(org.id)}
							key={org.id}>
							<ItemData
								org={org}
								isActive={activeOrg === org.id}
							/>
							<ItemToolBar
								orgId={org.id}
								pathname={location.pathname}
							/>
						</tr>
					))}
				</tbody>
			</Table>
		</>
	);
};

export default OrganizationTable;
