import type { Meta, StoryObj } from "@storybook/react";
import { Selector } from "./selector";

const meta = {
  title: "Example/Selector",
  component: Selector,
  tags: ["docsPage"],
  argTypes: {
    title: {
      control: { type: "text" },
    },
    description: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Selector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Selector Title",
    description: "This is a selector",
  },
};
