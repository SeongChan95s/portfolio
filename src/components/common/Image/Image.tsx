import { useState, useRef, useEffect } from 'react';
import { Skeleton } from '../Skeleton';

interface SkeletonImageProps {
	className?: string;
	src: string | undefined | null;
	alt: string;
	props?: React.ImgHTMLAttributes<HTMLImageElement>;
}

export default function Image({ className, src, alt, ...props }: SkeletonImageProps) {
	const [isLoading, setIsLoading] = useState(true);
	const imgRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		const img = imgRef.current;
		if (img && img.complete && img.naturalHeight !== 0) {
			setIsLoading(false);
		}
	}, [src]);

	if (!src) return <Skeleton fill />;

	return (
		<>
			{isLoading && <Skeleton fill />}
			<img
				ref={imgRef}
				className={className}
				src={src}
				alt={alt}
				onLoad={() => {
					setIsLoading(false);
				}}
				{...props}
			/>
		</>
	);
}
