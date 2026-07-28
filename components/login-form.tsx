"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin, useForgotPassword, useGoogleLogin } from "@/hooks/useAuth";
import { ArrowLeft } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending: isLoggingIn, error: loginError } = useLogin();
  const { mutate: forgotPassword, isPending: isSendingReset, isSuccess: resetSent, error: forgotError } = useForgotPassword();
  const loginWithGoogle = useGoogleLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
  };

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword({ email: forgotEmail });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">

          {mode === "login" && (
            <form className="p-6 md:p-8" onSubmit={handleLogin}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your portfolio admin
                  </p>
                </div>

                {loginError && (
                  <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    Email atau password salah. Silakan coba lagi.
                  </div>
                )}

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="youremail@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoggingIn}
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <button
                      type="button"
                      className="ml-auto text-sm underline-offset-2 hover:underline text-muted-foreground"
                      onClick={() => setMode("forgot")}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoggingIn}
                  />
                </Field>

                <Field>
                  <Button type="submit" className="w-full" disabled={isLoggingIn}>
                    {isLoggingIn ? "Logging in..." : "Login"}
                  </Button>
                </Field>

                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  Or continue with
                </FieldSeparator>

                <Field className="grid grid-cols-1 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    onClick={loginWithGoogle}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="mr-2 h-4 w-4"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Login with Google
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          )}

          {mode === "forgot" && (
            <form className="p-6 md:p-8" onSubmit={handleForgotPassword}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Reset Password</h1>
                  <p className="text-balance text-muted-foreground">
                    Masukkan email kamu, kami akan kirim link reset password.
                  </p>
                </div>

                {resetSent ? (
                  <div className="rounded-md bg-green-500/10 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                    Link reset password telah dikirim ke email kamu. Cek inbox (atau spam).
                  </div>
                ) : (
                  <>
                    {forgotError && (
                      <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
                        Terjadi kesalahan. Silakan coba lagi.
                      </div>
                    )}

                    <Field>
                      <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="youremail@example.com"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        disabled={isSendingReset}
                      />
                    </Field>

                    <Field>
                      <Button type="submit" className="w-full" disabled={isSendingReset}>
                        {isSendingReset ? "Sending..." : "Send Reset Link"}
                      </Button>
                    </Field>
                  </>
                )}

                <Field>
                  <button
                    type="button"
                    className="w-full text-sm text-muted-foreground underline-offset-2 hover:underline"
                    onClick={() => setMode("login")}
                  >
                    <ArrowLeft /> Back to login
                  </button>
                </Field>
              </FieldGroup>
            </form>
          )}

          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-2">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}