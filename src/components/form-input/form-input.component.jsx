import { GroupContainer, Input, FormInputLabel } from "./form-input.styles.jsx";

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <GroupContainer>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel shrink={otherProps.value.length}>
          {label}
        </FormInputLabel>
      )}
    </GroupContainer>
  );
};
