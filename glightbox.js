document.addEventListener('DOMContentLoaded', function(event) {
	const lightbox = GLightbox(	
		{
			openEffect: "zoomQuick",
			closeEffect: "zoomQuick",
			cssEfects: {
				// This are some of the animations included, no need to overwrite
				fade: { in: 'fadeIn', out: 'fadeOut' },
				zoomQuick: { in: 'zoomInQuick', out: 'zoomOutQuick' }
			  },
			touchNavigation: true,
			touchFollowAxis: true,
			keyboardNavigation: true,
			closeButton: true,
			closeOnOutsideClick: true
		}
	);
})
