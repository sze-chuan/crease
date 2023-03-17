import React, { createContext, useContext, useState } from 'react';

interface LoadingContextInterface {
  setLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

interface LoadingProviderInterface {
  children: React.ReactNode;
}

const LoadingContext = createContext<LoadingContextInterface>(
  {} as LoadingContextInterface
);

export const useLoading = (): LoadingContextInterface =>
  useContext(LoadingContext);

export const LoadingProvider = ({
  children,
}: LoadingProviderInterface): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <LoadingContext.Provider value={{ setLoading, isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
