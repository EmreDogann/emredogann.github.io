document.addEventListener('DOMContentLoaded', function (event) {
	// Added in "pointer-events" styles to enable closeOnOutsideClick on mobile.
	const customLightboxHTML = `<div id="glightbox-body" class="glightbox-container">
		<div class="gloader visible"></div>
		<div class="goverlay"></div>
		<div class="gcontainer" style="pointer-events: none">
		<div id="glightbox-slider" class="gslider"></div>
		<button class="gnext gbtn" style="pointer-events: auto" tabindex="0" aria-label="Next" data-customattribute="example">{nextSVG}</button>
		<button class="gprev gbtn" style="pointer-events: auto" tabindex="1" aria-label="Previous">{prevSVG}</button>
		<button class="gclose gbtn" style="pointer-events: auto" tabindex="2" aria-label="Close">{closeSVG}</button>
	</div>
	</div>`;

	let customSlideHTML = `<div class="gslide">
		<div class="gslide-inner-content">
			<div class="ginner-container">
				<div class="gslide-media" style="pointer-events: auto">
				</div>
				<div class="gslide-description">
					<div class="gdesc-inner">
						<h4 class="gslide-title"></h4>
						<div class="gslide-desc"></div>
					</div>
				</div>
			</div>
		</div>
	</div>`;

	const glightbox = GLightbox({
		lightboxHTML: customLightboxHTML,
		slideHTML: customSlideHTML,
		openEffect: 'zoomQuick',
		closeEffect: 'zoomQuick',
		cssEfects: {
			// This are some of the animations included, no need to overwrite
			fade: { in: 'fadeIn', out: 'fadeOut' },
			zoomQuick: { in: 'zoomInQuick', out: 'zoomOutQuick' }
		},
		touchNavigation: true,
		touchFollowAxis: true,
		zoomable: true,
		dragToleranceY: 35,
		keyboardNavigation: true,
		closeButton: true,
		closeOnOutsideClick: true
	});

	// Required JS to enable closeOnOutsideClick on mobile.
	glightbox.on('open', () => {
		let gbody = document.querySelector('#glightbox-body');

		gbody.querySelector('.goverlay').addEventListener('touchend', function (event) {
			if (event.target.id !== 'your_modal_id') {
				glightbox.close();
				return;
			}
		});
	});

	const glightboxSingle = GLightbox({
		selector: '.glightbox-single',
		lightboxHTML: customLightboxHTML,
		slideHTML: customSlideHTML,
		openEffect: 'zoomQuick',
		closeEffect: 'zoomQuick',
		cssEfects: {
			// This are some of the animations included, no need to overwrite
			fade: { in: 'fadeIn', out: 'fadeOut' },
			zoomQuick: { in: 'zoomInQuick', out: 'zoomOutQuick' }
		},
		touchNavigation: false,
		touchFollowAxis: false,
		zoomable: true,
		draggable: false,
		dragToleranceY: 35,
		keyboardNavigation: false,
		closeButton: true,
		closeOnOutsideClick: true,
		videosWidth: '75vw',
		plyr: {
			config: {
				hideControls: true,
				controls: [
					'play-large', // The large play button in the center
					// 'restart', // Restart playback
					// 'rewind', // Rewind by the seek time (default 10 seconds)
					'play', // Play/pause playback
					// 'fast-forward', // Fast forward by the seek time (default 10 seconds)
					'progress', // The progress bar and scrubber for playback and buffering
					'current-time', // The current time of playback
					'duration', // The full duration of the media
					'mute', // Toggle mute
					'volume', // Volume control
					// 'captions', // Toggle captions
					'settings', // Settings menu
					// 'pip', // Picture-in-picture (currently Safari only)
					// 'airplay', // Airplay (currently Safari only)
					// 'download', // Show a download button with a link to either the current source or a custom URL you specify in your options
					'fullscreen' // Toggle fullscreen
				]
			}
		}
	});

	function closeLightbox(e) {
		if (e.key === 'Escape') {
			glightboxSingle.close();
		}
	}

	glightboxSingle.on('open', () => {
		document.addEventListener('keydown', closeLightbox);
	});

	glightboxSingle.on('close', () => {
		document.removeEventListener('keydown', closeLightbox);
	});

	glightboxSingle.on('open', () => {
		let gbody = document.querySelector('#glightbox-body');

		gbody.querySelector('.goverlay').addEventListener('touchend', function (event) {
			if (event.target.id !== 'your_modal_id') {
				glightboxSingle.close();
				return;
			}
		});
	});
});
