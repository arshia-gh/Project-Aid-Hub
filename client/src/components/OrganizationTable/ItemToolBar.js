import { Link } from 'react-router-dom';

import {
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
} from 'reactstrap';

const ItemToolBar = ({ pathname, orgId }) => {
	return (
		<td className='text-right'>
			<UncontrolledDropdown>
				<DropdownToggle
					className='btn-icon-only text-light'
					href='#pablo'
					role='button'
					size='sm'
					color=''
					onClick={(e) => e.preventDefault()}>
					<i className='fas fa-ellipsis-v' />
				</DropdownToggle>
				<DropdownMenu className='dropdown-menu-arrow' right>
					<Link to={`${pathname}/${orgId}`}>
						<DropdownItem>View Representatives</DropdownItem>
					</Link>
					<Link to={`${pathname}/${orgId}/new-representative`}>
						<DropdownItem>Add Representative</DropdownItem>
					</Link>
				</DropdownMenu>
			</UncontrolledDropdown>
		</td>
	);
};

export default ItemToolBar;
