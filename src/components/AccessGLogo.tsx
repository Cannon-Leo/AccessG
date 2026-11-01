import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light" | "symbol";
  className?: string;
  height?: number;
}

export function AccessGLogo({ variant = "dark", className = "", height = 36 }: LogoProps) {
  if (variant === "symbol") {
    return (
      <Image
        src="/branding/favicon.png"
        alt="AccessG Mark"
        width={height}
        height={height}
        className={`w-auto object-contain ${className}`}
        priority
      />
    );
  }

  const src = variant === "dark" ? "/branding/logo-dark.png" : "/branding/logo-light.png";

  return (
    <Image
      src={src}
      alt="AccessG"
      width={160}
      height={height}
      className={`h-9 w-auto object-contain ${className}`}
      priority
    />
  );
}

