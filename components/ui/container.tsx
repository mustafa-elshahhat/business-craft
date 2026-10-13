import type { ComponentPropsWithoutRef } from "react";

/** Site content width: 1280px content + 48px gutters on desktop. */
export function Container({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`mx-auto w-full max-w-[86rem] px-5 sm:px-6 md:px-8 xl:px-12 ${className}`} {...props} />;
}
