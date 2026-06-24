"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    searchParams.get("error") === "invalid_link"
      ? "비밀번호 리셋 링크가 유효하지 않거나 만료되었습니다. 다시 발송해주세요."
      : ""
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "" || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(
        "비밀번호 리셋 링크 발송에 실패했습니다. 잠시 후 다시 시도해주세요."
      );
      return;
    }

    setSuccessMessage("비밀번호 리셋 링크를 이메일로 발송했습니다.");
  }

  return (
    <>
      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
      {successMessage && (
        <Toast
          message={successMessage}
          variant="success"
          onClose={() => setSuccessMessage("")}
        />
      )}
      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
        <h1 className="mb-2 text-center text-xl font-semibold text-[var(--text)]">
          비밀번호 찾기
        </h1>
        <p className="mb-8 text-center text-sm text-[var(--text-sub)]">
          가입하신 이메일로 비밀번호 리셋 링크를 보내드립니다.
        </p>
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
          <button
            type="submit"
            disabled={email === "" || isSubmitting}
            className="btn-primary mt-2 rounded-md px-4 py-2 text-sm font-medium"
          >
            {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ForgotPasswordForm />
    </Suspense>
  );
}
