import type { ComponentMeta, ComponentStory } from "@storybook/react";
// eslint-disable-next-line no-restricted-imports
import React from "react";

import { CopyLinkButton } from "./CopyLinkButton";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Molecules/CopyLinkButton",
  component: CopyLinkButton,
} as ComponentMeta<typeof CopyLinkButton>;

const Template: ComponentStory<typeof CopyLinkButton> = () => {
  return <CopyLinkButton url="https://www.google.com/?hl=ja" />;
};

export const Normal = Template.bind({});
