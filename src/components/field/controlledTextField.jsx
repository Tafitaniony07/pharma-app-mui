import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const ControlledTextField = ({
	name,
	control,
	label,
	defaultValue,
	rules,
	error,
	setClientName,
	helperText,
	fullWidth = true,
	setValue,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={defaultValue}
			rules={rules}
			render={({ field }) => (
				<TextField
					{...field}
					label={label}
					error={!!error}
					helperText={helperText}
					fullWidth={fullWidth}
					sx={{
						mt: 2,
					}}
					onChange={(e) => {
						field.onChange(e);
						if (setClientName) {
							setClientName(e.target.value); // Mise à jour de clientName dans useTransaction
						}
						if (setValue) {
							setValue(name, e.target.value);
						}
					}}
				/>
			)}
		/>
	);
};

ControlledTextField.propTypes = {
	name: PropTypes.string.isRequired,
	control: PropTypes.object.isRequired,
	label: PropTypes.string,
	defaultValue: PropTypes.any,
	rules: PropTypes.object,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	fullWidth: PropTypes.bool,
	setValue: PropTypes.func,
	setClientName: PropTypes.func,
};

export default ControlledTextField;
