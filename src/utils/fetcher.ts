
export default async function fetcher (url: string, date: string) {
	const response = await fetch(`${url}/?date=${encodeURIComponent(date)}`, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		credentials: 'same-origin'
	})

	return response.json()
}
