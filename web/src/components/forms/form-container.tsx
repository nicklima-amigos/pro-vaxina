import { FC, PropsWithChildren } from 'react';

export interface FormContainerProps {
  title: string;
}

export const FormContainer: FC<PropsWithChildren<FormContainerProps>> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-wrap p-20 justify-center">
      <div className="w-full text-center mb-12">
        <h3 className="text-2xl">{title}</h3>
      </div>
      <div className="flex, flex-wrap justify-center w-1/4">{children}</div>
    </div>
  );
};
