import React from "react";
import styles from "../styles/contact.module.css";
import Input from "../components/Input";
import Label from "../components/Label";
import FormButton from "../components/FormButton";
import Head from "next/head";
import { useState } from "react";
import LoadingForm from "../components/LoadingForm";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reset, setReset] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successToggle, setSuccessToggle] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [errorResponseMessage, setErrorResponseMessage] = useState("");

  function nameHandler(data) {
    setName(data);
  }
  function emailHandler(data) {
    setEmail(data);
  }
  function messageHandler(event) {
    setMessage(event.target.value);
  }

  async function contactFormHandler(event) {
    event.preventDefault();

    setLoading(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setLoading(false);
      setErrorResponseMessage(data.message);
      setErrorResponse(true);
      setSuccessToggle(true);
    } else {
      event.target.reset();
      setLoading(false);
      setSuccessToggle(true);
      setReset(true);
      setTimeout(() => {
        setReset(false);
      }, 1000);
    }
  }

  return (
    <>
      <Head>
        <title>Contact | Task Hunt</title>

        <meta name="title" content="Contact | Task Hunt" />
        <meta
          name="description"
          content="Task Hunt, Contact us if you need any help or to give us feedback."
        />
        <meta
          name="keywords"
          content="contact, task hunt contact , task, hunt, taskhunt, ats, assignment tracking sytem, task hunt, assignments, students, teachers"
        />
        <meta name="robots" content="index, follow" />
        <meta content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="10 days" />
        <meta name="author" content="Task Hunt - Bhagya Mudgal" />
      </Head>

      <div className={styles.body_contact}>
        <div className={styles.heading_div}>
          <h1>Contact Form</h1>
        </div>
        <div className={styles.contact_form}>
          {successToggle ? (
            errorResponse ? (
              <div className={styles.errorResponse_div}>
                <h3>{errorResponseMessage}</h3>
              </div>
            ) : (
              <div className={styles.success_div}>
                <h3>Form Submited Successfully!</h3>
              </div>
            )
          ) : loading ? (
            <LoadingForm />
          ) : (
            <form
              id="contactform"
              onSubmit={contactFormHandler}
              className={styles.form}
              autoComplete="off"
            >
              <div className={styles.form_elements}>
                <Label for="name" text="Name"></Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required="true"
                  height="40px"
                  value={nameHandler}
                  reset={reset}
                />
              </div>
              <div className={styles.form_elements}>
                <Label for="email" text="Email"></Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required="true"
                  height="40px"
                  value={emailHandler}
                  reset={reset}
                />
              </div>
              <div className={styles.form_elements}>
                <Label for="message" text="Message"></Label>
                <textarea
                  className={styles.message}
                  id="message"
                  name="message"
                  rows="5"
                  cols="51"
                  onChange={messageHandler}
                ></textarea>
              </div>
              <div className={styles.form_elements}>
                <FormButton type="submit" text="Send"></FormButton>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ContactPage;
