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

export interface DropdownControllerProps {
  defaultValue?: string;
  options: DropdownItem[];
  isSorted?: boolean;
  error?: string;
  onSelect?: (value: string) => void;
}

export interface UseSelectorControllerReturn {
  isOpen: boolean;
  inputValue: string;
  selectedItem: DropdownItem | null;
  isFocused: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  hasError: boolean;
  handleChange: (item: DropdownItem) => void;
  onSearchOption: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMenuStatus: () => void;
  filteredItems: DropdownItem[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<DropdownItem | null>>;
}
