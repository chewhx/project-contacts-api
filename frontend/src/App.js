import React from "react";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar";
// import GetContacts from "./components/GetContacts";
// import PostContact from "./components/PostContact";
// import PutContact from "./components/PutContact";
// import DeleteContact from "./components/DeleteContact";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Route path={`/`} component={HomeScreen} />
    </QueryClientProvider>
  );
};

export default App;
