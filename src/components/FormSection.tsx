import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {description.trim()}
      </ReactMarkdown>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
