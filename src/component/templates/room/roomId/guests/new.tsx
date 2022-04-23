import { Box, Button, Group, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import type { VFC } from "react";
import { DoorEnter } from "tabler-icons-react";
import { z } from "zod";

import { Title } from "@/component/atoms/Title";
import { supabase } from "@/utils/supabase";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "3~10文字で入力してください。" })
    .max(10, { message: "3~10文字で入力してください。" }),
});

export const GuestsNew: VFC = () => {
  const router = useRouter();
  const standByPath = router.asPath.replace("/guests/new", "");
  const roomId = standByPath.split("/")[2];

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: "てつこ",
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    const guestId = nanoid();
    // TODO:dbfunctionでひとまとめにする
    await supabase
      .from("users")
      .insert([{ user_id: guestId, name: values.name, user_type: "GUEST" }]);

    await supabase
      .from("guest_users")
      .insert([{ user_id: guestId, name: values.name }]);

    await supabase
      .from("game_results")
      .insert([{ user_id: guestId, room_id: roomId }]);

    router.push({
      pathname: standByPath,
      query: { uid: guestId },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-16">
      <Title title="名前を入力しよう" />

      <div className="mt-10">
        <Box sx={{ maxWidth: 300 }} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              return handleSubmit(values);
            })}
          >
            <TextInput
              required
              label="名前"
              placeholder="てつこさんの部屋"
              classNames={{ label: "text-slate-100 font-bold" }}
              {...form.getInputProps("name")}
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
