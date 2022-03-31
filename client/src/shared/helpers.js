export const uuid = () => {
	let dt = new Date().getTime();

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
		/[xy]/g,
		function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
		}
	);
};

export const truncText = (text, limit) => {
	if (text.length > limit) {
		return text.slice(0, limit) + '...';
	}
	return text;
};
