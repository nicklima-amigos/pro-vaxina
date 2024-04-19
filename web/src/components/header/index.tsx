import { cn } from '@/lib/utils';
import React from 'react';

interface HeaderProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const styles = {
  header:
	'flex items-center justify-between bg-red-600 text-2xl p-4 text-center',
    	title: 'text-yellow-100',	   
  	buttonContainer: 'flex items-center gap-4',
};
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, title, children }, ref) => {
    return (
      <div className={cn(styles.header, className)} ref={ref}>
      <h1 className={cn(styles.title)}>{title}</h1>
      <div className={cn(styles.buttonContainer)}>{children}</div>
      </div>
    );
  }
);
Header.displayName = 'Header';

export { Header };
