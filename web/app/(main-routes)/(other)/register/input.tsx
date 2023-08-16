import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from 'react';

type Props = {
  label: string;
  labelProps: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  error?: string;
};

export default function InputField({
  inputProps,
  label,
  labelProps,
  error,
}: Props) {
  return (
    <div>
      <label className="block text-sm font-bold text-white" {...labelProps}>
        {label}
        {inputProps.required ? (
          <span className="text-red-500 ml-1">*</span>
        ) : null}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 disabled:opacity-50"
        {...inputProps}
      />
      {error ? (
        <span className="text-red-500 text-xs italic">{error}</span>
      ) : null}
    </div>
  );
}
