/* eslint-disable no-console */
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { DoorEnter } from "tabler-icons-react";
import { z } from "zod";

const schema = z.object({
  roomName: z
    .string()
    .min(3, { message: "3~10文字で入力してください。" })
    .max(10, { message: "3~10文字で入力してください。" }),
});

export const RoomNew: VFC = () => {
  const [roomId, setRoomId] = useState(nanoid());
  const router = useRouter();

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      roomName: "てつこさんの部屋",
    },
  });

  return (
    <div className="mt-10">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit(() => {
            setRoomId(nanoid());
            console.log(roomId);
            router.push({
              pathname: `/room/${roomId}/standby`,
              // query: { roomName: values.roomName },
            });
          })}
        >
          <TextInput
            required
            label="部屋名"
            placeholder="てつこさんの部屋"
            classNames={{ label: "text-slate-100 font-bold" }}
            {...form.getInputProps("roomName")}
          />

          <Group position="center" mt="md">
            <Button
              type="submit"
              color="violet"
              leftIcon={<DoorEnter size={18} />}
            >
              決定
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};
