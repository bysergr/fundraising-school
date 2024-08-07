import * as React from 'react';

interface TabsProps extends React.HTMLProps<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
}

const Tabs: React.FC<TabsProps> = ({ value, defaultValue, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || value);

  // Update activeTab if the value prop changes
  React.useEffect(() => {
    if (value) setActiveTab(value);
  }, [value]);

  return (
    <div className={className} {...props}>
      {React.Children.map(props.children, (child) =>
        React.cloneElement(child as React.ReactElement, { activeTab, setActiveTab }),
      )}
    </div>
  );
};

interface TabsListProps extends React.HTMLProps<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md ${className}`}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab?: string;
  setActiveTab?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, activeTab, setActiveTab, ...props }, ref) => (
    <button
      ref={ref}
      className={`${value} ${activeTab} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 ${activeTab === value ? 'activeTab' : 'unActiveTab'} ${className}`}
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      onClick={() => setActiveTab && setActiveTab(value)}
      {...props}
    />
  ),
);
TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLProps<HTMLDivElement> {
  value: string;
  activeTab?: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, activeTab, ...props }, ref) => (
    <div
      ref={ref}
      className={`mt-2 ${activeTab === value ? '' : 'hidden'} ${className}`}
      {...props}
    />
  ),
);
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };
