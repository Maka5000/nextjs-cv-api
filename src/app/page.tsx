import { Suspense } from "react";
import LoginForm from "./ui/LoginForm";
import LoginFormSkeleton from "./ui/skeletons/LoginFormSkeleton";

export default function LoginPage() {
  return (
    <div className="container mx-auto min-h-screen place-content-center">
      <div
        className={`
            max-w-80 
            m-auto 
            text-center 
            border-solid 
            border-2 
            rounded-xl 
            p-3
            `}
      >
        <h1 className="sm:text-3xl md:text-5xl font-bold mb-12">
          CV API Dashboard
        </h1>
        <Suspense fallback={<LoginFormSkeleton />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
