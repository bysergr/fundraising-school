import type { IconProps } from "./home";

export const AgendaIcon = ({ stroke }: IconProps) => {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path d="M21 10.5V6.5C21 5.96957 20.7893 5.46086 20.4142 5.08579C20.0391 4.71071 19.5304 4.5 19 4.5H5C4.46957 4.5 3.96086 4.71071 3.58579 5.08579C3.21071 5.46086 3 5.96957 3 6.5V20.5C3 21.6 3.9 22.5 5 22.5H12" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M16 2.5V6.5" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8 2.5V6.5" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 10.5H21" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M21.2899 15.2C20.9492 14.861 20.5155 14.6306 20.0438 14.538C19.5721 14.4455 19.0835 14.4949 18.6399 14.68C18.3399 14.8 18.0699 14.98 17.8399 15.21L17.4999 15.55L17.1499 15.21C16.8103 14.8693 16.3772 14.637 15.9054 14.5427C15.4336 14.4483 14.9445 14.4961 14.4999 14.68C14.1999 14.8 13.9399 14.98 13.7099 15.21C12.7599 16.15 12.7099 17.74 13.9099 18.95L17.4999 22.5L21.0999 18.95C22.2999 17.74 22.2399 16.15 21.2899 15.21V15.2Z" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
};








