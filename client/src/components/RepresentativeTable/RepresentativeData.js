const RepresentativeData = ({ rep }) => {
	return (
		<tr key={rep.username}>
			<th scope='row'>{rep.username}</th>
			<td>{rep.fullname}</td>
			<td>{rep.jobTitle}</td>
			<td>{rep.email}</td>
			<td>{rep.mobileNo}</td>
		</tr>
	);
};

export default RepresentativeData;
