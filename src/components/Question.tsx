import { useState } from "react";

interface QuestionProps {
  id: string;
  type: "text" | "checkbox" | "radio" | string;
  label: string;
  options?: string[];
  onChange: (id: string, value: string | string[]) => void;
}

const Question: React.FC<QuestionProps> = ({
  id,
  type,
  label,
  options,
  onChange,
}) => {
  const [value, setValue] = useState<string | string[]>(
    type === "checkbox" ? [] : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "checkbox") {
      const newValue = e.target.checked
        ? [...(value as string[]), e.target.value]
        : (value as string[]).filter((v) => v !== e.target.value);
      setValue(newValue);
      onChange(id, newValue);
    } else {
      setValue(e.target.value);
      onChange(id, e.target.value);
    }
  };

  return (
    <div>
      <label>{label}</label>
      {type === "text" && (
        <input type="text" value={value as string} onChange={handleChange} />
      )}
      {type === "checkbox" &&
        options?.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              value={opt}
              checked={(value as string[]).includes(opt)}
              onChange={handleChange}
            />
            {opt}
          </label>
        ))}
      {type === "radio" &&
        options?.map((opt) => (
          <label key={opt}>
            <input
              type="radio"
              name={id}
              value={opt}
              checked={value === opt}
              onChange={handleChange}
            />
            {opt}
          </label>
        ))}
    </div>
  );
};

export default Question;
