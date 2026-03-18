import {Field, FieldError, FieldLabel} from '@/components/ui/field';
import {Input} from '@/components/ui/input';

type InputWithFieldProps = {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
};

export function InputWithField({
  label,
  placeholder,
  type = 'text',
  id,
  value,
  onChange,
  error
}: InputWithFieldProps) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        className="mb-1 h-12 px-4 py-3"
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
