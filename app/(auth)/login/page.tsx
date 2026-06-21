"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function getLoginErrorMessage(message: string) {
  if (message.includes("Invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (message.includes("Email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  return "로그인에 실패했습니다. 잠시 후 다시 시도해주세요.";
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormFilled = email !== "" && password !== "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(getLoginErrorMessage(error.message));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  }

  return (
    <>
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <h1 className="mb-8 text-center text-xl font-semibold text-[var(--text)]">
          한입 링크
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--text)]"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className="input-field rounded-md px-3 py-2 text-base"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-[var(--text)]"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="input-field rounded-md px-3 py-2 text-base"
            />
          </div>
          <button
            type="submit"
            disabled={!isFormFilled || isSubmitting}
            className="btn-primary mt-2 rounded-md px-4 py-2 text-sm font-medium"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </>
  );
}
