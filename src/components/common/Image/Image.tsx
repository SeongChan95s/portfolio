import { useState, type HTMLAttributes, type ReactElement } from 'react';
import { Skeleton } from '../Skeleton';

interface SkeletonImageProps {
	className?: string;
	src: string | undefined | null;
	alt: string;
	props?: React.ImgHTMLAttributes<HTMLImageElement>;
}

/**
 * 스켈레톤 UI를 보여주는 두 가지 경우
 * 1. API Fetch 가 아직 완료 되지 않아서 src 가 없는 경우
 * 2. src 는 있지만 image 로드가 완료 되지 않은 경우
 */
export default function Image({ className, src, alt, ...props }: SkeletonImageProps) {
	const [isLoading, setIsLoading] = useState(true);

	// 1. API Fetch 가 아직 완료 되지 않아서 src 가 없는 경우
	if (!src) return <Skeleton fill />;

	return (
		<>
			{isLoading && <Skeleton fill />}
			<img
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
