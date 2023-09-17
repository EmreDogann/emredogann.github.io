module.exports = {
	plugins: {
		tailwindcss: { config: './tailwind.config.js' },
		...(process.env.NODE_ENV === 'production' ? { cssnano: {}, autoprefixer: {} } : {})
	  }
};