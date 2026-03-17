import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ className, children, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} {...rest}>
      {children}
    </svg>
  );
}

export function SolidHealthIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21c-.3 0-.6-.1-.8-.3-3.1-2.7-5.2-4.8-6.6-6.6C3.2 12.3 2.5 10.6 2.5 9c0-3.1 2.4-5.5 5.4-5.5 1.8 0 3.2.8 4.1 2.2.9-1.4 2.4-2.2 4.1-2.2 3 0 5.4 2.4 5.4 5.5 0 1.6-.7 3.3-2.1 5.1-1.3 1.8-3.5 4-6.6 6.6-.2.2-.5.3-.8.3ZM11 9h-1v2H8v1h2v2h1v-2h2v-1h-2V9Z" />
    </BaseIcon>
  );
}

export function SolidProductivityIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 20a1 1 0 0 1-1-1V5a1 1 0 1 1 2 0v13h15a1 1 0 1 1 0 2H4Zm4-3a1 1 0 0 1-1-1v-3a1 1 0 1 1 2 0v3a1 1 0 0 1-1 1Zm4 0a1 1 0 0 1-1-1V9a1 1 0 1 1 2 0v7a1 1 0 0 1-1 1Zm4 0a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v9a1 1 0 0 1-1 1Zm4 0a1 1 0 0 1-1-1v-5a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1Z" />
    </BaseIcon>
  );
}

export function SolidSafetyIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 2.5a1 1 0 0 1 .4.1l7 3A1 1 0 0 1 20 6.5v5.7c0 4-2.3 7-7.3 9.2a1.8 1.8 0 0 1-1.4 0C6.3 19.1 4 16.1 4 12.2V6.5a1 1 0 0 1 .6-.9l7-3a1 1 0 0 1 .4-.1Zm3.7 7.9a1 1 0 0 0-1.4-1.4l-3.1 3.1-1.5-1.5A1 1 0 0 0 8.3 12l2.2 2.2a1 1 0 0 0 1.4 0l3.8-3.8Z" />
    </BaseIcon>
  );
}

export function SolidGlossaryIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M6 3h9.5A3.5 3.5 0 0 1 19 6.5V19a1 1 0 0 1-1.6.8c-.8-.6-1.7-.8-2.7-.8H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3Zm0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8.7c.8 0 1.6.1 2.3.3V6.5A1.5 1.5 0 0 0 15.5 5H6Zm2 3h6a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Zm0 4h6a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2Z" />
    </BaseIcon>
  );
}

export function SolidCalculatorIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm0 3v3h10V5H7Zm1.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm-8 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm4-1a1 1 0 0 1 1 1v3h-2v-2h-1v-2h2Z" />
    </BaseIcon>
  );
}

export function SolidWarningIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12.9 3.6a1 1 0 0 0-1.8 0L2.8 19A1 1 0 0 0 3.7 20h16.6a1 1 0 0 0 .9-1.5L12.9 3.6ZM12 9a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Zm0 9a1.2 1.2 0 1 0 0-2.4A1.2 1.2 0 0 0 12 18Z" />
    </BaseIcon>
  );
}

export function SolidCaseIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M9 3h6a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v3.5a1 1 0 0 1-.8 1l-7 1.2a6 6 0 0 1-2 0l-7-1.2a1 1 0 0 1-.8-1V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2Zm0 3h6V5H9v1Zm-5 7.3V18a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4.7l-6.5 1.1a8 8 0 0 1-2.7 0L4 13.3Z" />
    </BaseIcon>
  );
}