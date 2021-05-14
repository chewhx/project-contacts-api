import React from "react";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import GlobalContextProvider from "./context";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import HomeScreen from "./screens/HomeScreen";
import ContactsScreen from "./screens/ContactsScreen";
import AddScreen from "./screens/AddScreen";
import PutContact from "./components/PutContact";

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
          <Route exact path={`/addcontacts`} component={AddScreen} />
          <Route exact path={`/contacts/:id`} component={PutContact} />
          <Route exact path={`/contacts`} component={ContactsScreen} />
          <Route exact path={`/`} component={HomeScreen} />
        </QueryClientProvider>
      </AlertProvider>
    </GlobalContextProvider>
  );
};

export default App;
