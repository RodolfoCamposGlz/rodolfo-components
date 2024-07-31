export interface ISelectorProps {
  id?: string;
  label: string;
  options: DropdownItem[];
  placeholder?: string;
  isSorted?: boolean;
  onSelect?: (val: DropdownItem["value"]) => void;
  hasImage?: boolean;
}

export interface DropdownItem {
  label: string;
  value: string;
  imageUrl?: string;
}
