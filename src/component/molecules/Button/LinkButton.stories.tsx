import type { ComponentMeta, ComponentStory } from "@storybook/react";
// eslint-disable-next-line no-restricted-imports
import React from "react";

import { LinkButton } from "./LinkButton";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Molecules/LinkButton",
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>;

const Template: ComponentStory<typeof LinkButton> = () => {
  return <LinkButton url="https://www.google.com/?hl=ja" text="テスト" />;
};

export const Normal = Template.bind({});
