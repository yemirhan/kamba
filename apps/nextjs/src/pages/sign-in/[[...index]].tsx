import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <div className="flex flex-col absolute items-center justify-center inset-0">
    <SignIn path="/sign-in" routing="path" afterSignInUrl={"/workspaces"} signUpUrl="/sign-up" />
  </div>
);

export default SignInPage;
