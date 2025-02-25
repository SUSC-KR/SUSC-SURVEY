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
      <p>{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default FormSection;
