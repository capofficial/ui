

export function getUserSetting(key) {
	const userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
	return userSettings[key];
}

export function saveUserSetting(key, value) {
	let userSettings = JSON.parse(localStorage.getItem('userSettings') || '{}');
	userSettings[key] = value;
	localStorage.setItem('userSettings', JSON.stringify(userSettings));
}