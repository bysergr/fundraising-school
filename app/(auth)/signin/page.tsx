import LinkedInSignIn from '@/components/auth/linkedin-sign-in';
import Logo from '@/components/ui/logo';

export default function Page() {
  return (
    <div className="flex size-full flex-col justify-around px-8 py-6 lg:p-0">
      <div className="flex flex-col items-center justify-between gap-12 ">
        <div className="block w-56 md:w-72 lg:hidden">
          <Logo />
        </div>
        <h3 className="h3 mb-4 mt-8 max-w-xs text-center text-neutral-900">
          Elevate your fundraising skills
          <span className="mt-3 block text-sm font-normal text-neutral-500 sm:mt-4 sm:text-base lg:hidden">
            Sign up now
          </span>
        </h3>

        <LinkedInSignIn className="hidden lg:flex" />
      </div>
      <LinkedInSignIn className="mx-auto lg:hidden" />
    </div>
  );
}
