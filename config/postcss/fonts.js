module.exports = {
	formats: 'local woff woff2',
	display: "swap",
	custom: {
		"Cera Pro": {
			variants: {
				normal: {
					
					400: {
						url: {
							woff: "../fonts/CeraPro-Regular.woff",
							woff2: "../fonts/CeraPro-Regular.woff2"
						}
					},
					500: {
						url: {
							woff: "../fonts/CeraPro-Medium.woff",
							woff2: "../fonts/CeraPro-Medium.woff2"
						}
					},
					600: {
						url: {
							woff: "../fonts/CeraPro-Bold.woff",
							woff2: "../fonts/CeraPro-Bold.woff2"
						}
					}
				}
			}
		},
	}
}