import React from "react";
import { Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import HomeScreen from "./screens/HomeScreen";
import PostContact from "./components/PostContact";
import EditScreen from "./screens/Contacts/EditScreen";

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
    <AlertProvider template={Notification} {...options}>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Route exact path={`/contacts/:id`} component={EditScreen} />
        <Route exact path={`/add`} component={PostContact} />
        <Route exact path={`/`} component={HomeScreen} />
      </QueryClientProvider>
    </AlertProvider>
  );
};

export default App;
