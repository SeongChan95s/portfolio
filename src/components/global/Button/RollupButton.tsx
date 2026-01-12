import { classNames } from '../../../utils/classNames';
import styles from './RollupButton.module.scss';

interface ButtonProps {
	id?: string;
	className?: string;
	type?: 'button' | 'submit' | 'reset';
	size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
	color?: 'normal' | 'primary';
	shape?: 'rect' | 'rounded' | 'round';
	active?: boolean;
	fill?: boolean;
	form?: string;
	formAction?: (formData: FormData) => void;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	children?: React.ReactNode;
}

export default function RollupButton({
	id,
	className: classNameProp,
	type = 'button',
	size = 'md',
	color = 'normal',
	shape = 'rounded',
	active = false,
	fill = false,
	form,
	formAction,
	onClick,
	disabled = false,
	children
}: ButtonProps) {
	const className = classNames(
		styles.button,
		styles[size],
		styles[color],
		styles[shape],
		active && styles.active,
		fill && styles.fill,
		disabled && styles.disabled,
		'button',
		classNameProp
	);

	return (
		<button
			className={className}
			id={id}
			type={type}
			form={form}
			formAction={formAction}
			onClick={onClick}>
			<div className={styles.children}>{children}</div>
			<div className={styles.children}>{children}</div>
		</button>
	);
}
