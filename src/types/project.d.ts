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
	| 'tailwind css';

type Tool =
	| 'adobe photoshop'
	| 'adobe illustrator'
	| 'adobe xd'
	| 'figma'
	| 'visual code'
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
	| 'react query'
	| 'zustand'
	| 'next auth'
	| 'mongo DB'
	| 'aws s3'
	| 'react hook form'
	| 'zod'
	| 'bootstrap'
	| 'tailwind css'
	| 'gsap'
	| 'swiper'
	| 'splitting.js'
	| 'locomotive'
	| 'lodash'
	| 'lenis'
	| 'motion'
	| 'firebase';

type Task =
	| '리서치'
	| '컨셉'
	| '페르소나'
	| '심볼&로고'
	| '컬러'
	| '타이포그래피'
	| '와이어프레임'
	| '프로토타입'
	| '코딩'
	| '웹표준 검사'
	| '크로스 브라우징'
	| '호스팅'
	| '운영&유지보수'
	| '개선&고도화';

type Link = 'pages' | 'docs' | 'etc';

interface Project {
	id: number;
	name: string;
	categories: Category[];
	thumbnail: string;
	visual: string;
	slogan: string;
	desc: string;
	concept: string;
	features: {
		title: string;
		desc?: string;
		image?: string;
	}[];
	languages: Language[];
	libraries: Library[] | null;
	tools: Tool[];
	links: { [key: string]: string }[];
	contribution: number;
	date: string;
	tasks: Task[];
}
