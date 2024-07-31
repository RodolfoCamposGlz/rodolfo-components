import type { Meta, StoryFn } from "@storybook/react";
import { Selector } from "./selector";
import { ISelectorProps } from "./selector.types";

const meta = {
  title: "Example/Selector",
  component: Selector,
  tags: ["docsPage"],
} satisfies Meta<typeof Selector>;

export default meta;

const Template: StoryFn<ISelectorProps> = (args) => {
  return <Selector {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  isSorted: true,
  hasImage: true,
  options: [
    { label: "Nectarine", value: "nectarine", imageUrl: "/profile.svg" },
    { label: "Fig", value: "fig", imageUrl: "/profile.svg" },
    { label: "Grape", value: "grape", imageUrl: "/profile.svg" },
    { label: "Honeydew", value: "honeydew", imageUrl: "/profile.svg" },
    { label: "Cherry", value: "cherry", imageUrl: "/profile.svg" },
    { label: "Kiwi", value: "kiwi", imageUrl: "/profile.svg" },
    { label: "Apple", value: "apple", imageUrl: "/profile.svg" },
    { label: "Elderberry", value: "elderberry", imageUrl: "/profile.svg" },
    { label: "Orange", value: "orange", imageUrl: "/profile.svg" },
    { label: "Banana", value: "banana", imageUrl: "/profile.svg" },
    { label: "Lemon", value: "lemon", imageUrl: "/profile.svg" },
    { label: "Papaya", value: "papaya", imageUrl: "/profile.svg" },
    { label: "Quince", value: "quince", imageUrl: "/profile.svg" },
    { label: "Date", value: "date", imageUrl: "/profile.svg" },
    { label: "Mango", value: "mango", imageUrl: "/profile.svg" },
  ],
};
