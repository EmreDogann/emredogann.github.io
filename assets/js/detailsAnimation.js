function setDetailsHeight(selector, wrapper = document) {
	const setHeight = (detail, open = false) => {
		detail.open = open;

		// From: https://stackoverflow.com/a/29881817
		var computedStyle = getComputedStyle(detail);
		var elementHeight = detail.clientHeight;  // height with padding
		var elementWidth = detail.clientWidth;   // width with padding
		elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
		elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

		detail.dataset.width = elementWidth;
		detail.style.setProperty(open ? `--expanded` : `--collapsed`,`${elementHeight}px`);
	}
	const details = wrapper.querySelectorAll(selector);
	const RO = new ResizeObserver(entries => {
		return entries.forEach(entry => {
			const detail = entry.target;
			const openStatus = detail.open;
			const width = parseInt(detail.dataset.width, 10);

			if (width !== entry.contentRect.width) {
				detail.removeAttribute('style');
				setHeight(detail);
				setHeight(detail, true);
				detail.open = openStatus;
			}
		})
	});
	details.forEach(detail => {
		RO.observe(detail);
	});
}

setDetailsHeight('details');