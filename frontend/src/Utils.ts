export const getVideoID = (url: string) => {
	const id = url.split('v=')[1];
	const ampersandPosition = id.indexOf('&');
	if(ampersandPosition !== -1) {
		return id.substring(0, ampersandPosition);
	}
	return id;
}
