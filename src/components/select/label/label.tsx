export const Label = ({ label }: { label: string }) => {
  return (
    <div
      data-testid="test-label"
      className="rodolfo-components-flex rodolfo-components-px-1 rodolfo-components-top-[-8px] rodolfo-components-left-[8px] rodolfo-components-bg-white rodolfo-components-absolute"
    >
      <label className="rodolfo-components-text-xs/[16px] rodolfo-components-text-[#B2B6BD]">
        {label}
      </label>
    </div>
  );
};
