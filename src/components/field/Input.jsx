import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

export default function InputAddProduct({
  params,
  field,
  control,
  errors,
  setValue
}) {
  if (params?.inputProps.ref.current?.value)
    setValue('fournisseur', params?.inputProps.ref.current?.value)
  return (
    <Controller
      name={field.name}
      control={control}
      rules={{ required: "Veuillez remplir ce champ" }}
      
      render={({field: {onChange, onBlur, value }}) => (
        <TextField
          {...params}
          // {...controllerField}
          label={field.label}
          color="primary"
          fullWidth
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
          type={field.type}
          value={value}
          onChange={onChange}
          focused = {value || field?.autoFocus ?true:undefined}
          autoFocus={field?.autoFocus}
          select={field.type === "select"}
        >
          {field.type === "select" &&
            field.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
      )}
    />
  );
}
