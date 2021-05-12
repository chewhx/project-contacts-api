import React from "react";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Navbar from "./components/Navbar";
import GlobalContextProvider from "./context";
// import GetContacts from "./components/GetContacts";
// import PostContact from "./components/PostContact";
// import PutContact from "./components/PutContact";
// import DeleteContact from "./components/DeleteContact";
import HomeScreen from "./screens/HomeScreen";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = new QueryClient();
  const options = {
    // you can also just use 'bottom center'
    position: positions.TOP_CENTER,
    transition: transitions.FADE,
    timeout: 5000,
    containerStyle: {
      zIndex: 1200,
      width: "100vw",
      pointerEvents: "true",
    },
  };
  return (
    <GlobalContextProvider>
      <AlertProvider template={Notification} {...options}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Route path={`/`} component={HomeScreen} />
        </QueryClientProvider>
      </AlertProvider>
    </GlobalContextProvider>
  );
};

export default App;
