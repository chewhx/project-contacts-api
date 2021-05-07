import React from "react";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Contacts from "./components/Contacts";
import Navbar from "./components/Navbar";
import PostContacts from "./components/PostContacts";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="container">
        <Route exact path={`/`} component={Contacts} />
        <Route exact path={`/post`} component={PostContacts} />
      </div>
    </QueryClientProvider>
  );
};

export default App;
