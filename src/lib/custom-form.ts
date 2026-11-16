export type CustomFormField = {
  _key: string;
  label: string;
  inputType: "text" | "email" | "tel" | "number" | "textarea" | "select";
  placeholder?: string | null;
  required?: boolean | null;
  fullWidth?: boolean | null;
  options?: string[] | null;
};

export function isCustomFormField<T extends { _key: string; label?: string | null; inputType?: string | null }>(field: T): field is T & CustomFormField {
  return Boolean(field.label?.trim()) && ["text", "email", "tel", "number", "textarea", "select"].includes(field.inputType ?? "");
}

export function customRequestBody(fields: CustomFormField[], form: FormData) {
  return fields.map(field => `${field.label}: ${String(form.get(`field-${field._key}`) ?? "").trim()}`).join("\n\n");
}
