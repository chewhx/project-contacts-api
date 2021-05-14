import React from "react";
import GetContacts from "../components/GetContacts";

const ContactsScreen = () => {
  return (
    <section id="getAll" className="container-fluid bg-light py-5">
      <div className="container py-5">
        <GetContacts />
      </div>
    </section>
  );
};

export default ContactsScreen;
