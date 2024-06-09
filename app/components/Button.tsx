import React from "react";
export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disabled?: boolean;
  text?: string;
}

const Button = ({ onClick, ...props }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={"hover:!bg-gray-600 hover:!border-black"}
      style={{
        borderRadius: "50%",
        backgroundColor: "orange",
        padding: "0.5rem",
        width: "3rem",
        height: "3rem",
        transition: "background-color 0.3s",
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
