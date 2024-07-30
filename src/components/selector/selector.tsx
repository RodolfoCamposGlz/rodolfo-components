type SelectorProps = {
  title: string;
  description: string;
};

export const Selector = ({ title, description }: SelectorProps) => {
  return (
    <div className="rodolfo-components">
      <div className="rodolfo-components-bg-red-700 rodolfo-components-rounded-lg rodolfo-components-shadow-lg rodolfo-components-overflow-hidden sm:max-w-xs lg:max-w-sm xl:max-w-md">
        <div className="rodolfo-components-px-6 rodolfo-components-py-4">
          <h2 className="rodolfo-components-font-sans rodolfo-components-text-red-700 rodolfo-components-font-bold rodolfo-components-text-xl rodolfo-components-mb-2">
            {title}
          </h2>
          <p className="rodolfo-components-bg-red rodolfo-components-border-none rodolfo-components-rounded-none rodolfo-components-font-sans rodolfo-components-text-gray-700 rodolfo-components-text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
