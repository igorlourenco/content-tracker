
export async function contentNotesFetcher (url: string, startDate: string, finalDate: string, project: string) {
	const response = await fetch(`${url}/?startDate=${encodeURIComponent(startDate)}&finalDate=${encodeURIComponent(finalDate)}&project=${encodeURIComponent(project)}`, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		credentials: 'same-origin'
	})

	return response.json()
}
