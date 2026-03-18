import {Field, FieldError, FieldLabel} from '@/components/ui/field';
import {Textarea} from '@/components/ui/textarea';

export function TextAreaWithField({
  label,
  placeholder,
  id,
  value,
  onChange,
  error
}: {
  label: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea
        id={id}
        className="h-32 px-4 py-3"
        rows={5}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
