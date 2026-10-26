
import { useState } from 'react'
import { shippingSchema } from '../schemas/shippingSchema'
import type { ShippingDetails } from '../types/product'

interface ShippingPageProps {
  initialDetails: ShippingDetails
  onContinue: (details: ShippingDetails) => void
  onBack: () => void
}

export default function ShippingPage({
  initialDetails,
  onContinue,
  onBack,
}: ShippingPageProps) {
    const [details, setDetails] =
     useState<ShippingDetails>(initialDetails)
    const [errors, setErrors] = useState<
    Partial<Record<keyof ShippingDetails, string>>
  >({})

  function handleChange(field: keyof ShippingDetails, value: string) {
    setDetails((previous) => ({ ...previous, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = shippingSchema.safeParse(details)

    if (!result.success) {
      const nextErrors: Partial<
        Record<keyof ShippingDetails, string>
      > = {}

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ShippingDetails

        if (!nextErrors[field]) {
          nextErrors[field] = issue.message
        }
      })

      setErrors(nextErrors)
      return
    }

    setErrors({})
    onContinue(result.data)
  }

  const fields: {
    name: keyof ShippingDetails
    label: string
    type: string
  }[] = [
    { name: 'fullName', label: 'Full Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone Number', type: 'tel' },
    { name: 'address', label: 'Address', type: 'text' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'postalCode', label: 'Postal Code', type: 'text' },
  ]

  return (
    <main className="container py-4">
      <h1 className="h2 mb-2">Shipping Details</h1>
      <p className="text-secondary mb-4">
        Enter your details to continue with your order.
      </p>

      <form
        className="card shadow-sm p-4"
        onSubmit={handleSubmit}
        noValidate
      >
        {fields.map((field) => (
          <div className="mb-3" key={field.name}>
            <label className="form-label" htmlFor={field.name}>
              {field.label}
            </label>

            <input
              id={field.name}
              type={field.type}
              className={`form-control ${
                errors[field.name] ? 'is-invalid' : ''
              }`}
              value={details[field.name]}
              onChange={(event) =>
                handleChange(field.name, event.target.value)
              }
            />

            {errors[field.name] && (
              <div className="invalid-feedback">
                {errors[field.name]}
              </div>
            )}
          </div>
        ))}

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onBack}
          >
            Back to Cart
          </button>

          <button type="submit" className="btn btn-primary">
            Continue to Summary
          </button>
        </div>
      </form>
    </main>
  )
}
