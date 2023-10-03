export function getParsedDateFromIso(dateIso: string) {
	let [date, time] = dateIso.split('T');
	date = date.split('-').reverse().join('.');
	time = time.slice(0, 5);
	return `${date} ${time}`;
}
