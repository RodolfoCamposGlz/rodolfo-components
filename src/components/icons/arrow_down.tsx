import React from "react";

const DownArrow = ({ ...rest }: React.SVGProps<SVGSVGElement>): JSX.Element => {
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
          d="M15.8333 7.5L10 13.3333L4.16666 7.5"
          stroke="#b2b6bd"
          stroke-width="1.66667"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  );
};

export default DownArrow;
