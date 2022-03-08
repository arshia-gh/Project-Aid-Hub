// reactstrap components

const ItemData = ({ applicant }) => {
	return (
		<>
			<th scope='row'>{applicant.fullname}</th>
			<td>{applicant.IDno}</td>
			<td>RM{applicant.householdIncome}</td>
			<td>{applicant.address}</td>
		</>
	);
};

export default ItemData;
