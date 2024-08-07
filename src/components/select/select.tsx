import { useRef } from "react";
import classNames from "classnames";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { ISelectorProps, DropdownItem } from "./select.types";
import Profile from "../icons/profile";
import UpArrow from "../icons/arrow_up";
import DownArrow from "../icons/arrow_down";
import { useSelectorController } from "./useSelect";
import { Label } from "./label/label";

const DEFAULT_PLACEHOLDER = "Select...";

export const Select = (props: ISelectorProps): JSX.Element => {
  const {
    id,
    isDisabled,
    label,
    placeholder = DEFAULT_PLACEHOLDER,
    error,
    hasImage = false,
  } = props;
  const {
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
  } = useSelectorController(props);

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
    <div className="rodolfo-components">
      <div
        id={id}
        ref={dropdownRef}
        className="rodolfo-components-font-[Inter]"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={isDisabled}
      >
        <div
          data-testid="dropdown-toggle"
          onClick={isDisabled ? () => null : onChangeMenuStatus}
          className={classNames(
            "rodolfo-components-flex rodolfo-components-items-center rodolfo-components-flex-wrap rodolfo-components-justify-between rodolfo-components-h-[38px] rodolfo-components-border rodolfo-components-relative rodolfo-components-rounded-lg rodolfo-components-px-4 rodolfo-components-w-full",
            {
              "rodolfo-components-bg-[#dde1e9] rodolfo-components-cursor-not-allowed":
                isDisabled,
              "rodolfo-components-bg-white": !isDisabled,
              "rodolfo-components-border-focus": isFocused,
              "rodolfo-components-border-[#D1D5DB] hover:rodolfo-components-shadow-custom hover:rodolfo-components-border-[#C0C9D7]":
                !isFocused && !isDisabled && !hasError,
              "rodolfo-components-border-red-400": hasError,
            }
          )}
          role="button"
          aria-controls="dropdown-menu"
          aria-label="Toggle Dropdown"
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
                disabled={isDisabled}
                className={classNames(
                  "rodolfo-components-text-[#7d7d7e] rodolfo-components-cursor-pointer rodolfo-components-text-sm/[22px] rodolfo-components-w-full rodolfo-components-outline-none rodolfo-components-bg-transparent",
                  {
                    "rodolfo-components-cursor-not-allowed": isDisabled,
                  }
                )}
                aria-autocomplete="list"
                aria-controls="dropdown-menu"
                aria-label="Search"
              />
            </div>
          </div>
          {isOpen ? (
            <UpArrow aria-hidden="true" />
          ) : (
            <DownArrow aria-hidden="true" />
          )}
        </div>
        {hasError && (
          <div
            className="rodolfo-components-text-sm rodolfo-components-text-red-400 rodolfo-components-mt-1"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <div className="rodolfo-components-relative">
          {isOpen && (
            <div
              id="dropdown-menu"
              data-testid="dropdown-menu"
              className={
                "rodolfo-components-absolute rodolfo-components-bg-white rodolfo-components-w-full rodolfo-components-max-h-52 rodolfo-components-overflow-y-auto rodolfo-components-py-2  rodolfo-components-rounded-lg rodolfo-components-shadow-custom rodolfo-components-z-10 rodolfo-components-mt-1"
              }
              role="listbox"
              aria-labelledby={id}
              aria-activedescendant={selectedItem?.value}
            >
              {filteredItems.length > 0 ? (
                <ul role="presentation">
                  {filteredItems?.map((item: DropdownItem) => (
                    <li
                      role="option"
                      key={item.value}
                      onClick={() => handleChange(item)}
                      className={classNames(
                        "rodolfo-components-flex rodolfo-components-items-center rodolfo-components-h-[34px] rodolfo-components-px-4 rodolfo-components-flex rodolfo-components-items-center rodolfo-components-cursor-pointer ",
                        {
                          "rodolfo-components-bg-gray-100 ":
                            selectedItem?.value === item.value,
                          "hover:rodolfo-components-bg-blue-50":
                            selectedItem?.value !== item.value,
                        }
                      )}
                      aria-selected={selectedItem?.value === item.value}
                    >
                      {hasImage && (
                        <Profile
                          className="rodolfo-components-mr-2 rodolfo-components-min-w-4"
                          aria-hidden="true"
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
    </div>
  );
};
