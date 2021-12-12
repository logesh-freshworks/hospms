import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { forwardRef, PropsWithoutRef, ComponentPropsWithoutRef } from "react"
import { useFormContext } from "react-hook-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, labelProps, name, type, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(", ")
      : errors[name]?.message || errors[name]

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          {label}

          <Input disabled={isSubmitting} {...register(name)} type={type} />
        </FormLabel>

        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

export default LabeledTextField
