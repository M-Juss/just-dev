import {Field, FieldLabel} from '@/components/ui/field';
import {Textarea} from '@/components/ui/textarea';

export function TextAreaWithField({
  label,
  placeholder,
  id
}: {
  label: string;
  placeholder: string;
  id: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Textarea id={id} className='px-4 py-3 h-12' rows={5} placeholder={placeholder} />
    </Field>
  );
}
