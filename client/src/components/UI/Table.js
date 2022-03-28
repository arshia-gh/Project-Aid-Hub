import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Badge,
	Table,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownToggle,
	DropdownItem,
} from 'reactstrap';

const ToolBar = ({ item, links }) => {
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
					{links.map(({ url, content }) => (
						<Link to={url(item)} key={url(item)}>
							<DropdownItem>{content}</DropdownItem>
						</Link>
					))}
				</DropdownMenu>
			</UncontrolledDropdown>
		</td>
	);
};

const CustomTable = ({ data, headers, rowKey, links, hoverable = false }) => {
	const [activeItem, setActiveItem] = useState(null);
	const keys = Object.keys(headers);

	return (
		<Table className='align-items-center table-flush' responsive>
			<thead className='thead-light'>
				<tr>
					{Object.keys(headers).map((key) => (
						<th scope='col' key={key}>
							{headers[key]}
						</th>
					))}
					{links && <th scope='col' />}
				</tr>
			</thead>
			<tbody
				onMouseLeave={
					hoverable ? () => setActiveItem(null) : undefined
				}>
				{data.map((item) => (
					<tr
						onMouseEnter={
							hoverable
								? () => setActiveItem(item[rowKey])
								: undefined
						}
						key={item[rowKey]}>
						<td>
							{hoverable ? (
								<Badge
									color='primary'
									style={{
										cursor: 'default',
									}}
									className={
										item[rowKey] === activeItem
											? 'text-white bg-blue'
											: ''
									}>
									{item[rowKey]}
								</Badge>
							) : (
								item[rowKey]
							)}
						</td>
						{keys.map((key) =>
							key !== rowKey ? (
								<td key={key}>{item[key]}</td>
							) : null
						)}
						{links && <ToolBar links={links} item={item} />}
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default CustomTable;
