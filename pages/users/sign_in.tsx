import { Button, Input } from "@mantine/core";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/utils/supabase";

const SignIn = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  type formData = {
    email: string;
    password: string;
  };
  const { control, handleSubmit } = useForm<formData>();
  const RunSignIn = async ({ email, password }: formData) => {
    await supabase.auth.signIn({
      email,
      password,
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 w-full  bg-white shadow sm:max-w-xl sm:rounded-lg">
        <form onSubmit={handleSubmit(RunSignIn)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange } }) => {
              return (
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  type="email"
                  placeholder="メールアドレス"
                />
              );
            }}
            rules={{
              required: "必須項目です。",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスが不適切です。",
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange } }) => {
              return (
                <Input
                  onBlur={onBlur}
                  onChange={onChange}
                  type="password"
                  placeholder="パスワード(8文字以上)"
                />
              );
            }}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
            }}
          />
          <div className="h-4" />
          <Button>送信</Button>
          <div className="h-4" />
          {/* <Link href="/users/sign_up"> */}
          <Link href="/">
            <a className=" font-bold hover:text-gray-500">
              {/* サインアップはこちら */}
              サインアップは現在できません
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
