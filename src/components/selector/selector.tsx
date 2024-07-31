import React, { useState, useEffect, useRef, useMemo } from "react";
import classNames from "classnames";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ISelectorProps, DropdownItem } from "./selector.types";

const DEFAULT_PLACEHOLDER = "Select...";

const dropdownClass = classNames(
  "rodolfo-components-absolute rodolfo-components-bg-white rodolfo-components-w-full rodolfo-components-max-h-52 rodolfo-components-overflow-y-auto rodolfo-components-py-2  rodolfo-components-rounded-lg rodolfo-components-shadow-custom rodolfo-components-z-10 rodolfo-components-mt-1"
);

const Label = ({ label }: { label: string }) => {
  return (
    <div
      data-testid="test-label"
      className="rodolfo-components-flex rodolfo-components-top-[-8px] rodolfo-components-left-[12px] rodolfo-components-bg-white rodolfo-components-absolute"
    >
      <label className="rodolfo-components-text-xs/[16px] rodolfo-components-text-[#B2B6BD]">
        {label}
      </label>
    </div>
  );
};

export const Selector = ({
  id,
  label,
  options,
  hasImage = true,
  placeholder = DEFAULT_PLACEHOLDER,
  isSorted = false,
  onSelect,
}: ISelectorProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (item: DropdownItem): void => {
    const { value } = item;
    setSelectedItem(item);
    onSelect?.(value);
    setIsOpen(false);
    setInputValue("");
  };

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
      return options.slice().sort((a, b) => a.label.localeCompare(b.label));
    }
    return options;
  }, [isSorted, options]);

  const sortBySelectedItem = (): DropdownItem[] => {
    const index = sortedOptions.findIndex(
      (v) => v.value === selectedItem?.value
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

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => {
      setIsOpen(false);
      setIsFocused(false);
      if (selectedItem) {
        setInputValue("");
      }
    },
  });

  return (
    <div id={id} ref={dropdownRef} className="rodolfo-components">
      <div
        data-testid="dropdown-toggle"
        onClick={onChangeMenuStatus}
        className={classNames(
          "rodolfo-components-flex rodolfo-components-items-center rodolfo-components-flex-wrap rodolfo-components-justify-between rodolfo-components-h-[38px] rodolfo-components-border rodolfo-components-relative rodolfo-components-bg-white rodolfo-components-rounded-lg rodolfo-components-px-4 rodolfo-components-w-full ",
          {
            "rodolfo-components-border-focus": isFocused,
            "rodolfo-components-border-[#D1D5DB] hover:rodolfo-components-shadow-custom hover:rodolfo-components-border-[#C0C9D7]":
              !isFocused,
          }
        )}
      >
        <Label label={label} />
        <div className="rodolfo-components-grid rodolfo-components-flex-1 rodolfo-components-flex-shrink-1 rodolfo-components-basis-0">
          {!inputValue && (
            <div
              data-testid="selected-value"
              className={classNames(
                "rodolfo-components-font-sm/[22px] rodolfo-components-truncate rodolfo-components-max-w-full rodolfo-components-row-start-1 rodolfo-components-row-end-2 rodolfo-components-col-start-1 rodolfo-components-col-end-3 rodolfo-components-w-full",
                {
                  "rodolfo-components-text-[#7d7d7e]": selectedItem,
                  "rodolfo-components-text-[#b2b6bd]": !selectedItem,
                }
              )}
            >
              {selectedItem ? selectedItem?.label : placeholder}
            </div>
          )}
          <div className="rodolfo-components-inline-grid rodolfo-components-row-start-1 rodolfo-components-row-end-2 rodolfo-components-col-start-1 rodolfo-components-col-end-3">
            <input
              data-testid="input-search"
              role="combobox"
              ref={inputRef}
              onChange={onSearchOption}
              value={inputValue}
              className="rodolfo-components-text-[#7d7d7e] rodolfo-components-cursor-pointer rodolfo-components-text-sm/[22px] rodolfo-components-w-full rodolfo-components-outline-none rodolfo-components-bg-transparent"
            />
          </div>
        </div>
        <img src={`/${isOpen ? "up" : "down"}.svg`} />
      </div>
      <div className="rodolfo-components-relative">
        {isOpen && (
          <div data-testid="dropdown-menu" className={dropdownClass}>
            {filteredItems.length > 0 ? (
              <ul role="menu">
                {filteredItems?.map((item) => (
                  <li
                    role="menuitem"
                    key={item.value}
                    onClick={() => handleChange(item)}
                    className={classNames(
                      "rodolfo-components-flex rodolfo-components-items-center rodolfo-components-h-[34px] rodolfo-components-px-2 rodolfo-components-flex rodolfo-components-items-center rodolfo-components-cursor-pointer ",
                      {
                        "rodolfo-components-bg-gray-100 ":
                          selectedItem?.value === item.value,
                        "hover:rodolfo-components-bg-blue-50":
                          selectedItem?.value !== item.value,
                      }
                    )}
                  >
                    {hasImage && (
                      <img
                        src={item.imageUrl}
                        alt="image"
                        loading="lazy"
                        className="rodolfo-components-mr-2 rodolfo-components-min-w-4"
                      />
                    )}
                    <span className="rodolfo-components-truncate rodolfo-components-max-w-full rodolfo-components-text-custom-sm rodolfo-components-font-normal rodolfo-components-leading-custom rodolfo-components-tracking-custom rodolfo-components-text-sm rodolfo-components-text-[#6B7280]">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rodolfo-components-flex rodolfo-components-justify-center">
                <p className="rodolfo-components-text-sm rodolfo-components-text-[#b2b6bd]">
                  No options
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
