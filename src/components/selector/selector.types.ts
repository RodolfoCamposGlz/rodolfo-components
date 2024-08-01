export interface ISelectorProps {
  id?: string;
  label: string;
  options: DropdownItem[];
  placeholder?: string;
  isSorted?: boolean;
  onSelect?: (val: DropdownItem["value"]) => void;
  hasImage?: boolean;
  defaultValue?: DropdownItem["value"];
  isDisabled?: boolean;
  error?: string;
}

export interface DropdownItem {
  label: string;
  value: string;
}
