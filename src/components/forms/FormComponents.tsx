import type React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
      {label}
    </label>
    <input
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error ? "border-red-500" : ""
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[]
  error?: string
}

export const Select: React.FC<SelectProps> = ({ label, options, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
      {label}
    </label>
    <select
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error ? "border-red-500" : ""
      }`}
      {...props}
    >
      <option value="">Seleccione una opción</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
)

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
      {label}
    </label>
    <textarea
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
        error ? "border-red-500" : ""
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs italic">{error}</p>}
  </div>
)

