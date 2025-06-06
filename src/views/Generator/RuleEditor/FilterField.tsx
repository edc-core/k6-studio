import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

import { FieldGroup } from '@/components/Form'
import { TestRule } from '@/types/rules'

export function FilterField({
  field,
}: {
  field: 'filter' | 'extractor.filter' | 'replacer.filter'
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TestRule>()
  const fieldName = `${field}.path` as const

  return (
    <FieldGroup
      name={fieldName}
      label="Filter"
      hint="Filter requests by URL (regex supported by single quoting entire value, Example: '/api/v[0-9]+/users')"
      errors={errors}
    >
      <TextField.Root
        placeholder="Filter by URL"
        css={{ marginBottom: 'var(--space-2)' }}
        id={fieldName}
        {...register(fieldName)}
      />
    </FieldGroup>
  )
}
