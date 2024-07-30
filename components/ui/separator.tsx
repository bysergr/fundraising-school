import * as React from 'react';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
    const classes = `shrink-0 bg-border ${orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'} ${className}`;
    return (
      <div
        ref={ref}
        role={decorative ? 'presentation' : 'separator'}
        aria-orientation={orientation}
        className={classes}
        {...props}
      />
    );
  },
);

Separator.displayName = 'Separator';

export { Separator };
