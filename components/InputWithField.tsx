import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputWithField({label, placeholder, type, id}: {label: string, placeholder: string, type: string, id: string}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input className="mb-4 px-4 py-3 h-12" id={id} name={id}type={type} placeholder={placeholder} />
    </Field>
  )
}
