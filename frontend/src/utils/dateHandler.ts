export const dateToString = (date: Date): string => {
	return `${
		date.getFullYear() +
		'-' +
		(date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) +
		'-' +
		(date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) +
		'T' +
		(date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
		':' +
		(date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	}`;
};

export const stringToDate = (date: string): Date => {
	let dateSplit = date.split(/:|-|T/);
	let dateParts = dateSplit.map(Number);
	let newDate = new Date();
	newDate.setFullYear(dateParts[0]);
	newDate.setMonth(dateParts[1] - 1);
	newDate.setDate(dateParts[2]);
	newDate.setHours(dateParts[3]);
	newDate.setSeconds(dateParts[4]);
	return newDate;
};
