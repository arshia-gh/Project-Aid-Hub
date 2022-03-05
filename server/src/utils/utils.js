export const generateApplicantUsername = (id) =>
	'AP' + id.toString().padStart(12, '0');

export const generateRepresentativeUsername = (username) => 'OP' + username;
