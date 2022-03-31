import React from 'react';
import ConditionalWrapper from 'components/Utils/ConditionalWrapper';
import { useField } from 'formik';
import {
	Label,
	Input,
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	FormText,
} from 'reactstrap';

const Field = React.forwardRef(({ label, prepend, append, ...props }, ref) => {
	const [field, meta] = useField(props);
	return (
		<>
			{label && <Label htmlFor={props.id || props.name}>{label}</Label>}
			<ConditionalWrapper
				component={InputGroup}
				condition={prepend || append}>
				{prepend && (
					<InputGroupAddon addonType='prepend'>
						<InputGroupText>{prepend}</InputGroupText>
					</InputGroupAddon>
				)}
				<Input
					id={props.id || props.name}
					ref={ref}
					{...field}
					{...props}
				/>
				{append && (
					<InputGroupAddon addonType='append'>
						<InputGroupText>{append}</InputGroupText>
					</InputGroupAddon>
				)}
			</ConditionalWrapper>
			{meta.error ? (
				<FormText className={meta.touched ? 'text-red' : ''}>
					{meta.error}
				</FormText>
			) : null}
		</>
	);
});

export default Field;
