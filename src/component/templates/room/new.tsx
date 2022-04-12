/* eslint-disable no-console */
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { VFC } from "react";

export const RoomNew: VFC = () => {
  const form = useForm({
    initialValues: {
      roomName: "",
      // termsOfService: false,
    },

    validate: {
      // eslint-disable-next-line arrow-body-style
      roomName: (value) => {
        return /^\S+@\S+$/.test(value) ? null : "Invalid roomName";
      },
    },
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          return console.log(values);
        })}
      >
        <TextInput
          required
          label="部屋名"
          placeholder="てつこさんの部屋"
          {...form.getInputProps("roomName")}
        />

        {/* <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        /> */}

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
};
