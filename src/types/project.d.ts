type Category =
	| 'all'
	| 'service'
	| 'clone'
	| 'creative'
	| 'server'
	| 'interactive'
	| 'parallax'
	| 'responsive'
	| 'web'
	| 'mobile'
	| 'bootstrap'
	| 'tailwindCss';

type Tool =
	| 'adobePhotoshop'
	| 'adobeIllustrator'
	| 'adobeXd'
	| 'figma'
	| 'visualCode'
	| 'git';

type Language =
	| 'html5'
	| 'css3'
	| 'sass(scss)'
	| 'javascript'
	| 'jquery'
	| 'typescript'
	| 'react'
	| 'next.js';

type Library =
	| 'reactQuery'
	| 'bootstrap'
	| 'tailwindCss'
	| 'gsap'
	| 'swiper'
	| 'splitting.js';

interface Project {
	id: number;
	name: string;
	category: Category[];
	desc: string;
	// tools: tool[];
	languages: Language[];
	image: string;
	link: string;
}
