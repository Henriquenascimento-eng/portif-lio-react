import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactValues } from '@/lib/contactSchema'
import { Button } from '../ui/Button'

// O componente só desenha e valida; quem envia de verdade é a página (via hook useSendMessage).
type Props = { onSend: (values: ContactValues) => Promise<unknown> }
type Status = { type: 'success' | 'error'; text: string } | null

export function ContactForm({ onSend }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), mode: 'onTouched' })
  const [status, setStatus] = useState<Status>(null)

  const submit = handleSubmit(async (values) => {
    setStatus(null)
    try {
      await onSend(values)
      reset()
      setStatus({ type: 'success', text: 'Mensagem enviada! Respondo assim que puder.' })
    } catch (error) {
      setStatus({
        type: 'error',
        text: error instanceof Error ? error.message : 'Não foi possível enviar a mensagem.',
      })
    }
  })

  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 p-6">
      <Field id="name" label="Nome" error={errors.name?.message}>
        <input
          id="name"
          className="field"
          autoComplete="name"
          {...fieldProps('name', errors.name)}
          {...register('name')}
        />
      </Field>
      <Field id="email" label="E-mail" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          className="field"
          autoComplete="email"
          {...fieldProps('email', errors.email)}
          {...register('email')}
        />
      </Field>
      <Field id="message" label="Mensagem" error={errors.message?.message}>
        <textarea
          id="message"
          rows={5}
          className="field"
          {...fieldProps('message', errors.message)}
          {...register('message')}
        />
      </Field>
      <Button type="submit" loading={isSubmitting}>
        {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
      </Button>
      {status && (
        <p role={status.type === 'error' ? 'alert' : 'status'} className="font-bold">
          {status.text}
        </p>
      )}
    </form>
  )
}

function fieldProps(id: string, error: unknown) {
  return { 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined }
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-extrabold">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-bold text-[#c02a40] dark:text-[#ff9aa9]">
          {error}
        </p>
      )}
    </div>
  )
}
