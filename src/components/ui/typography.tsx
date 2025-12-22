import React from "react";

type Props = {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
};

export const Typography: React.FC<Props> = ({
  as: Component = "div",
  children,
  className = "",
}) => {
  return (
    <Component className={`prose prose-sm sm:prose md:prose-lg ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
