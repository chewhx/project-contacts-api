import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import Contacts from "./components/Contacts";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Hello from frontend</h1>
      <Contacts />
    </QueryClientProvider>
  );
};

export default App;
