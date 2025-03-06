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
  const [otherText, setOtherText] = useState("");

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

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherText(e.target.value);
    const newValue = (value as string[]).filter((v) => v !== "기타");
    onChange(id, [...newValue, e.target.value]);
  };

  return (
    <div>
      <label>{label}</label>
      {type === "text" && (
        <input type="text" value={value as string} onChange={handleChange} />
      )}
      {type === "checkbox" &&
        options?.map((opt) => (
          <span
            key={opt}
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <input
              type="checkbox"
              value={opt}
              checked={(value as string[]).includes(opt)}
              onChange={handleChange}
            />
            <label style={{ marginLeft: "5px" }}>{opt}</label>
            {opt === "기타" && (value as string[]).includes("기타") && (
              <input
                type="text"
                value={otherText}
                onChange={handleOtherChange}
                placeholder="직접 입력"
                style={{
                  marginLeft: "5px",
                  padding: "3px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            )}
          </span>
        ))}
      {type === "radio" &&
        options?.map((opt) => (
          <label key={opt} style={{ marginRight: "10px" }}>
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
