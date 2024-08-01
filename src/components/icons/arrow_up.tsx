import React from "react";

const UpArrow = ({ ...rest }: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <div>
      <svg
        {...rest}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.16665 12.5L9.99998 6.66667L15.8333 12.5"
          stroke="#7d7d7e"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default UpArrow;
