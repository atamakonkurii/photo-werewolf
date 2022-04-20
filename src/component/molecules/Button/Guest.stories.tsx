import type { ComponentMeta, ComponentStory } from "@storybook/react";
// eslint-disable-next-line no-restricted-imports
import React from "react";

import { Guest } from "./Guest";

// eslint-disable-next-line import/no-default-export
export default {
  title: "Molecules/Guest",
  component: Guest,
} as ComponentMeta<typeof Guest>;

const Template: ComponentStory<typeof Guest> = () => {
  return <Guest name="名前を入れてください" />;
};

export const Normal = Template.bind({});
