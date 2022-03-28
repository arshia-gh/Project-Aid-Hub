const ConditionalWrapper = ({
	condition,
	component: Wrapper,
	children,
	...props
}) => {
	return condition ? <Wrapper {...props}>{children}</Wrapper> : children;
};

export default ConditionalWrapper;
