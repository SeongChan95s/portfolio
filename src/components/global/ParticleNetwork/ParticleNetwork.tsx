import { useEffect, useRef, useCallback } from 'react';

interface Particle {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	opacity: number;
}

interface ParticleNetworkProps {
	particleCount?: number;
	connectionDistance?: number;
	color?: string;
	maxSpeed?: number;
	className?: string;
}

function ParticleNetwork({
	particleCount = 60,
	connectionDistance = 150,
	color = '255, 255, 255',
	maxSpeed = 0.4,
	className = ''
}: ParticleNetworkProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const particlesRef = useRef<Particle[]>([]);
	const animationIdRef = useRef<number>(0);

	const initParticles = useCallback(
		(width: number, height: number) => {
			particlesRef.current = Array.from({ length: particleCount }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * maxSpeed * 2,
				vy: (Math.random() - 0.5) * maxSpeed * 2,
				radius: Math.random() * 1.5 + 0.5,
				opacity: Math.random() * 0.5 + 0.3
			}));
		},
		[particleCount, maxSpeed]
	);

	const animate = useCallback(
		(ctx: CanvasRenderingContext2D, width: number, height: number) => {
			ctx.clearRect(0, 0, width, height);

			const particles = particlesRef.current;

			// 파티클 이동 + 경계 반사
			for (const p of particles) {
				p.x += p.vx;
				p.y += p.vy;

				if (p.x < 0 || p.x > width) p.vx *= -1;
				if (p.y < 0 || p.y > height) p.vy *= -1;
			}

			// 연결선 그리기 — 거리 기반 투명도
			for (let i = 0; i < particles.length; i++) {
				for (let j = i + 1; j < particles.length; j++) {
					const dx = particles[i].x - particles[j].x;
					const dy = particles[i].y - particles[j].y;
					const dist = Math.sqrt(dx * dx + dy * dy);

					if (dist < connectionDistance) {
						const lineOpacity = (1 - dist / connectionDistance) * 0.25;
						ctx.beginPath();
						ctx.strokeStyle = `rgba(${color}, ${lineOpacity})`;
						ctx.lineWidth = 0.5;
						ctx.moveTo(particles[i].x, particles[i].y);
						ctx.lineTo(particles[j].x, particles[j].y);
						ctx.stroke();
					}
				}
			}

			for (const p of particles) {
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
				ctx.fill();
			}

			animationIdRef.current = requestAnimationFrame(() => animate(ctx, width, height));
		},
		[color, connectionDistance]
	);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		/** 캔버스를 부모 크기에 맞추고 DPR 처리 */
		const resize = () => {
			const parent = canvas.parentElement;
			if (!parent) return;

			const dpr = window.devicePixelRatio || 1;
			const rect = parent.getBoundingClientRect();

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;
			canvas.style.width = `${rect.width}px`;
			canvas.style.height = `${rect.height}px`;
			ctx.scale(dpr, dpr);

			initParticles(rect.width, rect.height);
		};

		resize();
		animate(
			ctx,
			canvas.width / (window.devicePixelRatio || 1),
			canvas.height / (window.devicePixelRatio || 1)
		);

		window.addEventListener('resize', resize);

		return () => {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(animationIdRef.current);
		};
	}, [animate, initParticles]);

	return (
		<canvas
			ref={canvasRef}
			className={className}
			style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
		/>
	);
}

export default ParticleNetwork;
