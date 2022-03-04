export const generateUsername = (id) => {
	const date = new Date();
	const year = date.getFullYear().toString().padStart(4, '0');
	const month = date.getMonth().toString().padStart(2, '0');
	const day = date.getDay().toString().padStart(2, '0');
	const dateString = year + month + day;

	return 'AP' + dateString + id.toString().padStart(4, '0');
};
