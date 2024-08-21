import type { IconProps } from './home';

export const StartupsIcon = ({ stroke }: IconProps) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M4.5 17C3 18.26 2.5 22 2.5 22C2.5 22 6.24 21.5 7.5 20C8.21 19.16 8.2 17.87 7.41 17.09C7.02131 16.719 6.50929 16.5046 5.97223 16.488C5.43516 16.4714 4.91088 16.6537 4.5 17Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5L9 12.5C9.53214 11.1194 10.2022 9.79607 11 8.55C12.1652 6.68699 13.7876 5.15305 15.713 4.0941C17.6384 3.03514 19.8027 2.48637 22 2.5C22 5.22 21.22 10 16 13.5C14.7369 14.2987 13.3968 14.9687 12 15.5Z"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.5H4C4 12.5 4.55 9.47002 6 8.50002C7.62 7.42002 11 8.50002 11 8.50002"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.5V20.5C12 20.5 15.03 19.95 16 18.5C17.08 16.88 16 13.5 16 13.5"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
