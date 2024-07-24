import clsx from 'clsx';
import Link from 'next/link';

export default function Logo({
  height = '100%',
  width = '100%',
  className = '',
}: {
  height?: string;
  width?: string;
  className?: string;
}) {
  return (
    <Link href="/" className="block w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className={clsx(className, '[&>th]:stroke-0')}
        data-name="Layer 1"
        viewBox="0 0 1037.7 314.74"
      >
        <path
          d="M614.03 237.05l-6.74-16.63-22.11-54.6-2.29-5.64h-30.54c-.93 0-1.57.94-1.22 1.81l6.24 15.57 5.21 13.59-.21.29-19.76 49.18-27.33-80.44h-37.66l57.85 149.51c1.19 3.07 5.47 3.21 6.86.23l36.61-78.58 31.12 77.59c1.27 3.16 5.77 3.11 6.96-.09l55.33-148.67h-34.9l-23.43 76.88z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M699.97 250.66L762.33 250.66 762.33 219.25 699.97 219.25 699.97 192.05 770.42 192.05 770.42 160.64 680.54 160.64 667.57 196.05 667.57 309.67 773.18 309.67 773.18 278.26 699.97 278.26 699.97 250.66z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M814.23 249.36L876.6 249.36 876.6 217.96 814.23 217.96 814.23 190.75 884.69 190.75 884.69 159.34 781.84 159.34 781.84 308.37 887.45 308.37 887.45 276.96 814.23 276.96 814.23 249.36z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M5.23 196.61L39.17 196.61 39.17 314.23 76.61 314.23 76.61 196.61 111.93 196.61 111.93 160.17 5.23 160.17 5.23 196.61z"
          className="fill-[white]"
        ></path>
        <path
          d="M149.78 277.35L149.46 277.35 149.46 273.92 149.78 273.92 149.78 255.23 212.14 255.23 212.14 218.78 149.78 218.78 149.78 196.61 220.23 196.61 220.23 160.17 119.21 160.17 119.22 204.59 109.76 204.7 112.34 313.14 112.34 314.23 222.99 314.23 222.99 277.79 149.78 277.79 149.78 277.35z"
          className="fill-[white]"
        ></path>
        <path
          d="M451.3 218.78L395.18 218.78 395.18 160.17 357.75 160.17 357.75 314.23 395.18 314.23 395.18 255.23 451.3 255.23 451.3 314.23 488.73 314.23 488.73 209.27 469.39 160.17 451.3 160.17 451.3 218.78z"
          className="fill-[white]"
        ></path>
        <path
          d="M115.51 129.87l-13.69-29.65-3.85 3.68c-2.18 2.08-5.5 4.13-9.85 6.1-4.25 1.93-9.52 2.9-15.65 2.9-5.26 0-10.02-.88-14.13-2.6-4.07-1.71-7.61-4.18-10.52-7.34-2.93-3.18-5.22-7.07-6.8-11.56-1.61-4.56-2.42-9.7-2.42-15.27 0-5.17.88-10 2.63-14.36 1.75-4.38 4.17-8.26 7.19-11.53 2.99-3.24 6.48-5.79 10.37-7.55 3.86-1.75 7.95-2.64 12.15-2.64 5.52 0 10.43 1.04 14.59 3.1 4.48 2.22 8.09 4.35 10.72 6.35l3.93 2.98 12.84-30.86-2.69-1.72c-4.32-2.76-9.92-5.35-16.65-7.71-6.86-2.41-14.8-3.62-23.59-3.62-9.56 0-18.43 1.71-26.38 5.08-7.97 3.38-14.92 8.22-20.65 14.38-5.72 6.14-10.18 13.52-13.24 21.92-3.04 8.34-4.58 17.61-4.58 27.56 0 8.95 1.52 17.49 4.51 25.39 3 7.93 7.42 15.06 13.14 21.2 5.74 6.16 12.82 11.08 21.06 14.63 8.19 3.53 17.59 5.44 27.95 5.68.47 0 .93.01 1.39.01 6.28 0 12.14-.74 17.42-2.2 5.58-1.54 10.39-3.36 14.3-5.41 3.97-2.08 6.68-3.73 8.26-5.05l2.24-1.87z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M342.7 112.91L283.71 112.91 283.71 11.3 251.37 11.3 251.37 144.4 342.7 144.4 342.7 112.91z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M471.56 103.06c3.55-8.18 5.34-17.06 5.34-26.41 0-5.79-.73-11.43-2.16-16.88 0 0-.91-3.6-1.23-4.1-.58-1.72-1.22-3.42-1.95-5.09a69.976 69.976 0 00-14.78-21.72A71.292 71.292 0 00435.08 14c-8.18-3.61-17.02-5.44-26.26-5.44s-18.25 1.83-26.43 5.44c-8.14 3.59-15.39 8.6-21.56 14.88a70.164 70.164 0 00-14.51 21.72c-3.48 8.16-5.25 16.93-5.25 26.05 0 4.7.46 9.27 1.35 13.7.25 1.25.54 2.48.86 3.7s.04.14.1.36c.03.1.05.21.08.31.29 1.02.87 3.01 1.31 4.26 0 0 .01.02.02.03.47 1.35.97 2.7 1.53 4.02 3.47 8.14 8.36 15.4 14.53 21.57 6.17 6.18 13.43 11.07 21.57 14.54 8.16 3.48 17.04 5.25 26.39 5.25s18.05-1.77 26.22-5.25a70.281 70.281 0 0021.72-14.51c6.29-6.17 11.27-13.43 14.81-21.58m-30.47-12.21c-1.75 4.38-4.2 8.29-7.28 11.62a32.505 32.505 0 01-10.77 7.71c-4.09 1.82-8.59 2.74-13.37 2.74-5.02 0-9.7-.93-13.91-2.76-.36-.16-.72-.33-1.07-.5-.44-.22-1.25-.63-2.11-1.08a34.931 34.931 0 01-8.04-6.19c-3.23-3.33-5.77-7.23-7.57-11.58-1.79-4.34-2.7-9.1-2.7-14.15s.89-10.04 2.63-14.46c1.74-4.41 4.23-8.32 7.4-11.64 3.16-3.31 6.88-5.92 11.05-7.75 4.16-1.82 8.75-2.75 13.64-2.75s9.49.93 13.64 2.75c.76.34 1.51.71 2.24 1.09 0 0 1.09.46 3.72 2.28 1.8 1.28 3.46 2.73 4.99 4.35 3.13 3.34 5.63 7.27 7.43 11.7 1.79 4.41 2.7 9.26 2.7 14.42s-.88 9.83-2.63 14.18"
          className="fill-[#070707]"
        ></path>
        <path
          d="M517.55 96.19L551.18 142.69 555.44 142.69 590.58 92.75 590.58 144.4 622.91 144.4 622.91 81.16 622.91 62.92 622.91 59.22 622.91 50.46 622.91 6.18 616.81 6.18 580.61 56.41 572.22 68.04 571.5 69.04 570.05 71.05 553.73 93.7 492.01 6.18 486.06 6.18 486.06 144.4 517.55 144.4 517.55 96.19z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M725.25 122.65c2.72-5.24 4.09-11.65 4.09-19.06 0-8.31-2.67-15.55-7.94-21.53-2.71-3.07-5.96-5.78-9.72-8.1 1.96-1.72 3.71-3.62 5.24-5.71 4.28-5.82 6.45-13.09 6.45-21.61 0-11.74-4.46-20.74-13.25-26.76-8.34-5.7-19.56-8.59-33.35-8.59h-40.64v133.1h45.58c5.86 0 11.62-.7 17.12-2.07 5.65-1.41 10.81-3.73 15.33-6.88 4.64-3.24 8.37-7.55 11.09-12.79m-56.77-79.87h9.49c4.02 0 7.19.84 9.4 2.48 1.21.9 2.82 2.57 2.82 6.67 0 2.9-.88 5.42-2.68 7.7-1.58 2.01-4.15 2.98-7.84 2.98h-11.2V42.78zm25.96 66.34c-1.24 1.54-2.95 2.64-5.21 3.38-2.56.84-5.49 1.26-8.71 1.26h-12.05V94.1h10.34c3.22 0 6.35.34 9.3 1.01 2.57.59 4.66 1.6 6.2 3.01 1.23 1.13 1.83 2.92 1.83 5.46 0 2.3-.56 4.11-1.71 5.53"
          className="fill-[#070707]"
        ></path>
        <path d="M738.21 11.3H770.5500000000001V144.4H738.21z" className="fill-[#070707]"></path>
        <path
          d="M822.52 119.85h36.52l9.67 24.55h37.04L845.85 6.35h-6.36L779.58 144.4h32.72l10.22-24.55zm18.77-45.06l6.56 16.64h-13.49l6.93-16.64zM109.55 91.03s.95 6.18 3.76 12.01c3.47 8.14 8.36 15.4 14.54 21.57 6.17 6.18 13.43 11.07 21.57 14.54 8.16 3.48 17.04 5.25 26.39 5.25s18.05-1.77 26.22-5.25a70.281 70.281 0 0021.72-14.51c6.29-6.17 11.27-13.43 14.81-21.58 3.55-8.18 5.34-17.06 5.34-26.41 0-5.8-.73-11.46-2.17-16.92l-1.26-3.92.08-.02c-.26-.79-.55-1.58-.84-2.36l-.03-.09c-.35-.93-.72-1.85-1.11-2.76a69.976 69.976 0 00-14.78-21.72A71.414 71.414 0 00202.09 14c-8.18-3.61-17.02-5.44-26.26-5.44S157.58 10.39 149.4 14c-8.14 3.59-15.39 8.6-21.56 14.88a70.164 70.164 0 00-14.51 21.72c-3.48 8.16-5.25 16.93-5.25 26.05 0 4.94.51 9.74 1.5 14.38zm47.32 16.55l.17-.23 3.6 2.32-3.77-2.08zM143.88 62.2c1.74-4.4 4.23-8.32 7.4-11.64 3.16-3.31 6.88-5.92 11.05-7.75 4.15-1.82 8.75-2.75 13.64-2.75s9.49.93 13.64 2.75c.72.31 1.41.66 2.1 1.02l.02-.02c1.41.75 3.71 2.17 6.65 4.63.75.67 1.48 1.37 2.18 2.11 3.13 3.34 5.63 7.27 7.43 11.7 1.79 4.41 2.7 9.26 2.7 14.42s-.88 9.83-2.63 14.18c-1.75 4.38-4.2 8.29-7.28 11.62a32.505 32.505 0 01-10.77 7.71c-4.1 1.82-8.59 2.74-13.37 2.74-5.02 0-9.7-.93-13.91-2.75a34.92 34.92 0 01-11.23-7.77c-3.23-3.33-5.77-7.23-7.57-11.58-1.79-4.34-2.7-9.1-2.7-14.15s.89-10.04 2.63-14.46M916.15 60.29l16.32-15.78c2.97-2.84 5.31-5.18 7-7.03 1.69-1.84 2.91-3.52 3.66-5.03.74-1.51 1.11-3.11 1.11-4.8 0-2.05-.54-3.64-1.61-4.76-1.07-1.12-2.67-1.68-4.81-1.68-1.31 0-2.47.35-3.48 1.04-1.01.7-1.81 1.72-2.41 3.08-.59 1.36-.92 3.07-.98 5.12h-14.98c.12-5.32 1.22-9.64 3.3-12.97 2.08-3.32 4.81-5.79 8.2-7.39 3.39-1.6 7.1-2.4 11.15-2.4 4.99 0 9.07.88 12.22 2.63 3.15 1.75 5.47 4.08 6.95 6.98 1.48 2.9 2.23 6.07 2.23 9.52 0 2.72-.4 5.21-1.2 7.48-.8 2.27-2.19 4.62-4.15 7.07-1.96 2.45-4.73 5.33-8.29 8.66l-9.19 8.52h23.9v13.24h-44.94V60.27zM965.28 40.07c0-4.83.45-9.25 1.34-13.24.89-3.99 2.32-7.4 4.28-10.25 1.96-2.84 4.56-5.03 7.8-6.57s7.18-2.31 11.82-2.31 8.56.77 11.77 2.31c3.21 1.54 5.81 3.73 7.8 6.57 1.99 2.84 3.43 6.26 4.32 10.25.89 3.99 1.34 8.4 1.34 13.24s-.45 9.34-1.34 13.33c-.89 3.99-2.33 7.41-4.32 10.25-1.99 2.84-4.59 5.02-7.8 6.53-3.21 1.51-7.13 2.27-11.77 2.27s-8.58-.75-11.82-2.27c-3.24-1.51-5.84-3.69-7.8-6.53-1.96-2.84-3.39-6.26-4.28-10.25-.89-3.99-1.34-8.43-1.34-13.33m34.68 0c0-2.48-.09-4.85-.27-7.12-.18-2.27-.58-4.28-1.2-6.03s-1.56-3.14-2.81-4.17c-1.25-1.03-2.97-1.54-5.17-1.54s-3.92.51-5.17 1.54-2.19 2.42-2.81 4.17c-.62 1.75-1.03 3.76-1.2 6.03a90.09 90.09 0 00-.27 7.12c0 2.6.09 5.03.27 7.3.18 2.27.58 4.26 1.2 5.99.62 1.72 1.56 3.08 2.81 4.08s2.97 1.5 5.17 1.5 3.92-.5 5.17-1.5 2.18-2.36 2.81-4.08c.62-1.72 1.03-3.72 1.2-5.99.18-2.27.27-4.7.27-7.3M916.15 132.88l16.32-15.78c2.97-2.84 5.31-5.18 7-7.03 1.69-1.84 2.91-3.52 3.66-5.03.74-1.51 1.11-3.11 1.11-4.81 0-2.05-.54-3.64-1.61-4.76-1.07-1.12-2.67-1.68-4.81-1.68-1.31 0-2.47.35-3.48 1.04-1.01.7-1.81 1.72-2.41 3.08-.59 1.36-.92 3.07-.98 5.12h-14.98c.12-5.32 1.22-9.64 3.3-12.97 2.08-3.32 4.81-5.79 8.2-7.39 3.39-1.6 7.1-2.4 11.15-2.4 4.99 0 9.07.88 12.22 2.63 3.15 1.75 5.47 4.08 6.95 6.98 1.48 2.9 2.23 6.07 2.23 9.52 0 2.72-.4 5.21-1.2 7.48-.8 2.27-2.19 4.62-4.15 7.07-1.96 2.45-4.73 5.33-8.29 8.66l-9.19 8.52h23.9v13.24h-44.94v-11.52zM993.54 132.25h-29.69v-12.42l28-38.9h17.21v38.08h7.49v13.24h-7.49v12.15h-15.52v-12.15zm1.16-13.24v-20.4l-14.54 20.4h14.54z"
          className="fill-[#070707]"
        ></path>
        <path
          d="M332.33 266.15c-2.47 2.36-6.24 4.69-11.2 6.93-4.83 2.19-10.82 3.29-17.82 3.29-6 0-11.4-.99-16.07-2.96-4.62-1.94-8.63-4.73-11.93-8.32-3.32-3.61-5.92-8.02-7.72-13.13-1.84-5.21-2.77-11.07-2.77-17.43 0-5.9 1.01-11.4 2.99-16.35 1.99-4.98 4.74-9.4 8.18-13.13 3.39-3.68 7.35-6.57 11.77-8.57 4.37-1.99 9-2.99 13.76-2.99 6.27 0 11.85 1.18 16.57 3.51 5.14 2.54 9.27 4.99 12.29 7.28l5.27 4 15.44-37.1-3.62-2.31c-5.04-3.22-11.57-6.25-19.41-9-8.01-2.81-17.27-4.23-27.53-4.23-11.16 0-21.52 1.99-30.8 5.93-9.31 3.95-17.43 9.6-24.13 16.81-6.69 7.18-11.89 15.79-15.46 25.6-3.54 9.73-5.34 20.54-5.34 32.13 0 10.44 1.77 20.41 5.26 29.62 3.51 9.26 8.67 17.59 15.34 24.75 6.7 7.2 14.98 12.95 24.6 17.09 9.56 4.12 20.52 6.35 32.61 6.63.55.01 1.1.01 1.64.01 7.33 0 14.16-.86 20.32-2.57 6.5-1.79 12.11-3.92 16.69-6.31 4.71-2.46 7.79-4.35 9.68-5.93l3.01-2.51-16.48-35.7-5.18 4.94z"
          className="fill-[white]"
        ></path>
        <path
          d="M1020.75 160.75L975.45 160.75 931.9 209.93 931.9 160.75 896.97 160.75 896.97 306.96 931.9 306.96 931.9 252.34 934.68 249.56 976.18 306.96 1019.94 306.96 959.8 226.91 1020.75 160.75z"
          className="fill-[#070707]"
        ></path>
      </svg>
    </Link>
  );
}