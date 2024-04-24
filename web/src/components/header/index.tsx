import { cn } from '@/lib/utils';
import React from 'react';
import Link from 'next/link';
import { Button } from '../button';

interface HeaderProps {
  className?: string;
  title: string;
  children?: React.ReactNode;
}
const styles = {
  header:
    'flex items-center justify-between bg-blue-300 text-2xl p-4 text-center',
  buttonContainer: 'flex items-center gap-4',
  titleContainer: 'flex items-center gap-4',
};
const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, title = 'Pro-Vaxina', children }, ref) => {
    return (
      <div className={cn(styles.header, className)} ref={ref}>
        <div className={styles.titleContainer}>
          <Link href="/">
            <Button variant="default">Home</Button>
          </Link>
          <h3>{title}</h3>
        </div>
        <div className={cn(styles.buttonContainer)}>{children}</div>
      </div>
    );
  },
);
Header.displayName = 'Header';

export { Header };
