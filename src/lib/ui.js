import { get } from 'svelte/store'
import { parseError } from './errors'
import { activeModal, toasts, showMarketList, activeError } from './stores'

export function setPageTitle(title) {
	document.title = `${title} | CAP`;
}

export function focusInput(id, select) {
	const elem = document.getElementById(id);
	if (elem) {
		elem.focus();
		if (select) elem.select();
	}
}

let toastId = 0;

// Toasts
export function showToast(message, type) {
	if (!message) return;
	if (!type) type = 0; // 0 = error, 1 = success, 2 = info
	toastId++;
	toasts.update((_toasts) => {
		_toasts.push({message, type, id: toastId});
		return _toasts;
	});
	let _toastId = toastId;
	setTimeout(() => {
		hideToast(_toastId);
	}, 7*1000);
}

export function hideToast(id) {
	toasts.update((_toasts) => {
		_toasts = _toasts.filter((t) => {
			return t.id != id;
		});
		return _toasts;
	});
}

// Error modal
export function showError(e) {
	const message = parseError(e);
	if (!message) return;
	if (typeof(e) == 'object') {
		try {
			e = JSON.stringify(e);
		} catch(_e) {
			e = e.toString();
		} finally {}
	}
	activeError.set({message, rawError: e});
}
export function hideError() {
	activeError.set({})
}

// Modals
export function showModal(name, data) {
	activeModal.set({name, data});
}
export function hideModal() {
	activeModal.set({});
}

function hidePopovers() {
	const ae = get(activeError);
	if (ae && ae.message) {
		hideError();
	} else {
		hideModal();
		showMarketList.set(false);
	}
}

export function hidePopoversOnClick(ev) {
	if (ev.altKey || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.defaultPrevented) return true;
	hidePopovers();
}

export function hidePopoversOnKeydown(ev) {
	if (ev.key == 'Escape') hidePopovers();
}
