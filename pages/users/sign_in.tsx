import { Button, IconKey, IconMail } from "@supabase/ui";
import { Input } from "@supabase/ui";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

import { supabase } from "@/utils/supabase";

const SignIn = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  type formData = {
    email: string;
    password: string;
  };
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>();
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
                  label="Email"
                  icon={<IconMail />}
                  error={errors.email ? errors.email.message : ""}
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
                  icon={<IconKey />}
                  label="Password"
                  error={errors.password ? errors.password.message : ""}
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
          <Button block>送信</Button>
          <div className="h-4" />
          <Link href="/users/sign_up">
            <a className=" font-bold hover:text-gray-500">
              サインアップはこちら
            </a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
