import { motion, type Variants } from 'motion/react';
import { Link } from 'react-router-dom';
import { IconGithub } from '@/components/common/Icon';
import styles from './Footer.module.scss';

const reveal: Variants = {
	hidden: { opacity: 0, y: 14 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }
	}
};

const NAV_LINKS = [
	{ label: 'Home', path: '/' },
	{ label: 'About', path: '/about' },
	{ label: 'Project', path: '/project' },
	{ label: 'Blog', path: '/blog' },
	{ label: 'Contact', path: '/contact' }
];

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.inner}>
				<div className={styles.footerTop}>
					<motion.div
						className={styles.left}
						variants={reveal}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}>
						<p className={styles.label}>저에게 궁금한 점이 있다면 언제든 연락주세요 :D</p>
						<a href="mailto:seongchan95s@gmail.com" className={styles.email}>
							seongchan95s@gmail.com
						</a>
						<p className={styles.tel}>010-3867-9431</p>
					</motion.div>

					<motion.nav
						className={styles.nav}
						variants={reveal}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}>
						<p className={styles.navTitle}>Pages</p>
						<ul className={styles.navList}>
							{NAV_LINKS.map(link => (
								<li key={link.path}>
									<Link to={link.path} className={styles.navLink}>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</motion.nav>
				</div>

				<motion.div
					className={styles.footerBar}
					variants={reveal}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}>
					<span className={styles.copyright}>&copy; {currentYear} SeongChan</span>

					<div className={styles.socialLinkWrap}>
						<a
							href="https://github.com/SeongChan95s"
							target="_blank"
							className={styles.socialLink}>
							<IconGithub />
							<span>GitHub</span>
						</a>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}
