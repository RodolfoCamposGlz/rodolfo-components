import { useState, useEffect, useMemo, useRef } from "react";
import {
  DropdownControllerProps,
  DropdownItem,
  UseSelectorControllerReturn,
} from "./select.types";

export const useSelectorController = ({
  defaultValue,
  options,
  isSorted,
  error,
  onSelect,
}: DropdownControllerProps): UseSelectorControllerReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasError = error ? true : false;

  const handleChange = (item: DropdownItem): void => {
    const { value } = item;
    setSelectedItem(item);
    onSelect?.(value);
    setIsOpen(false);
    setInputValue("");
  };

  useEffect(() => {
    if (defaultValue) {
      const findValue = options.find(
        (v: DropdownItem) => v.value === defaultValue
      ) as DropdownItem;
      setSelectedItem(findValue);
    }
  }, [defaultValue, options]);

  const onSearchOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onChangeMenuStatus = (): void => {
    if (isOpen) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Backspace" && selectedItem && !inputValue) {
      setSelectedItem(null);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Attach the keydown event listener to the document
      document.addEventListener("keydown", handleKeyDown);

      // Cleanup the event listener on component unmount
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isFocused, inputValue]);

  const sortedOptions: DropdownItem[] = useMemo(() => {
    if (isSorted) {
      return options
        .slice()
        .sort((a: DropdownItem, b: DropdownItem) =>
          a.label.localeCompare(b.label)
        );
    }
    return options;
  }, [isSorted, options]);

  const sortBySelectedItem = (): DropdownItem[] => {
    const index = sortedOptions.findIndex(
      (v: DropdownItem) => v.value === selectedItem?.value
    );
    if (index !== -1) {
      const sorted = [...sortedOptions];
      const [item] = sorted.splice(index, 1);
      sorted.unshift(item);
      return sorted;
    }
    return sortedOptions;
  };

  const searchItems = (): DropdownItem[] => {
    return sortedOptions.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const filteredItems: DropdownItem[] = useMemo(() => {
    //search items
    if (inputValue) return searchItems();
    //show sorted options
    if (isSorted && !selectedItem) return sortedOptions;
    //default options
    if (!isSorted) return options;
    //Set selected item to the first position and sort the array
    if (selectedItem && isSorted) return sortBySelectedItem();
    return options;
  }, [isSorted, options, selectedItem, inputValue]);

  return {
    isOpen,
    inputValue,
    selectedItem,
    isFocused,
    inputRef,
    hasError,
    handleChange,
    onSearchOption,
    onChangeMenuStatus,
    filteredItems,
    setIsOpen,
    setIsFocused,
    setInputValue,
    setSelectedItem,
  };
};
