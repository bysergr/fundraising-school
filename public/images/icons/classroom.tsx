import type { IconProps } from './home';

export const ClassRoomIcon = ({ stroke }: IconProps) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M22 8.5L16 12.5L22 16.5V8.5Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 6.5H4C2.89543 6.5 2 7.39543 2 8.5V16.5C2 17.6046 2.89543 18.5 4 18.5H14C15.1046 18.5 16 17.6046 16 16.5V8.5C16 7.39543 15.1046 6.5 14 6.5Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
