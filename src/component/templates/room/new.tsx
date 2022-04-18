/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { useState } from "react";
import { DoorEnter } from "tabler-icons-react";
import { z } from "zod";

import { Title } from "@/component/atoms/Title";
import { supabase } from "@/utils/supabase";

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

  const handleSubmit = async (values: { roomName: any }) => {
    setRoomId(nanoid());

    await supabase
      .from("rooms")
      // eslint-disable-next-line @typescript-eslint/naming-convention
      .insert([{ room_id: roomId, name: values.roomName }]);

    router.push({
      pathname: `/room/${roomId}`,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="部屋名を決めよう" />
      <div className="mt-10">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
    </div>
  );
};
