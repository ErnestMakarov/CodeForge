document.querySelectorAll('.thumb').forEach(thumb => {
	thumb.addEventListener('click', function () {
		const mainPhoto = document.getElementById('mainPhoto');

		if (mainPhoto && this.src) {
			mainPhoto.src = this.src;

			document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));

			this.classList.add('active');
		}
	});
});
