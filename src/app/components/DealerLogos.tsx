import Image from "next/image";
import { BRAND } from "../lib/brand";

type LexusLockupProps = {
  className?: string;
  priority?: boolean;
};

/** Official Lexus lockup used on jimfalkbeverlyhillslexus.com (white, for dark UI). */
export function LexusLockup({ className, priority = false }: LexusLockupProps) {
  return (
    <Image
      src={BRAND.dealerLogoLockup}
      alt="Lexus"
      width={330}
      height={76}
      priority={priority}
      className={className ?? "h-10 w-auto md:h-12"}
    />
  );
}

type LexusEmblemProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

/** Official Lexus L emblem cropped from the same dealer lockup. */
export function LexusEmblem({ className, size = 40, priority = false }: LexusEmblemProps) {
  return (
    <Image
      src={BRAND.dealerLogoEmblem}
      alt=""
      width={size}
      height={size}
      priority={priority}
      className={className ?? "shrink-0"}
      aria-hidden
    />
  );
}
