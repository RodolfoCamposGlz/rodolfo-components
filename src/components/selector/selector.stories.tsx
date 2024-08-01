import type { Meta, StoryFn } from "@storybook/react";
import { Selector } from "./selector";
import { ISelectorProps } from "./selector.types";

const mockUnSorted = [
  { label: "Nectarine", value: "nectarine" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
  { label: "Honeydew", value: "honeydew" },
  { label: "Cherry", value: "cherry" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Apple", value: "apple" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Orange", value: "orange" },
  { label: "Banana", value: "banana" },
  { label: "Lemon", value: "lemon" },
  { label: "Papaya", value: "papaya" },
  { label: "Quince", value: "quince" },
  { label: "Date", value: "date" },
  { label: "Mango", value: "mango" },
];

export default {
  title: "Components/Checkbox",
  component: Selector,
} as Meta;

const Template: StoryFn<ISelectorProps> = (args) => {
  return <Selector {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Fruit",
  hasImage: true,
  options: mockUnSorted,
};

export const Sorted = Template.bind({});
Sorted.args = {
  label: "Label",
  isSorted: true,
  hasImage: true,
  options: mockUnSorted,
};

export const DefaultValue = Template.bind({});
DefaultValue.args = {
  label: "Label",
  isSorted: true,
  hasImage: true,
  defaultValue: "papaya",
  options: mockUnSorted,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Label",
  isSorted: true,
  hasImage: true,
  defaultValue: "papaya",
  options: mockUnSorted,
  isDisabled: true,
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  isSorted: true,
  hasImage: true,
  defaultValue: "papaya",
  options: mockUnSorted,
  error: "Fruit is required",
};
