"use client";

import React, { ReactNode } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || "",
      userPoolClientId:
        process.env.NEXT_PUBLIC_COGNITO_USER_POOL_CLIENT_ID || "",
    },
  },
});

const formFields = {
  signUp: {
    name: {
      order: 1,
      placeholder: "Enter your full name",
      label: "Full Name",
    },
    username: {
      order: 2,
      placeholder: "Choose a username",
      label: "Username",
      inputprops: { required: true },
    },
    email: {
      order: 3,
      placeholder: "Enter your email address",
      label: "Email",
      inputprops: { type: "email", required: true },
    },
    password: {
      order: 4,
      placeholder: "Enter your password",
      label: "Password",
      inputprops: { type: "password", required: true },
    },
    confirm_password: {
      order: 5,
      placeholder: "Confirm your password",
      label: "Confirm Password",
      inputprops: { type: "password", required: true },
    },
  },
};

type Props = {
  children?: ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  return (
    <>
      <style>
        {`
    [data-amplify-authenticator] {
    --amplify-components-authenticator-form-height: 5000px;
    --amplify-components-authenticator-form-padding: var(--amplify-space-medium);
    
    background-image: url('/beast.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    
    /* Fallback if a specific height variable is not available */
    height: var(--amplify-components-authenticator-form-height);
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100vh;
    }
    `}
      </style>
      <Authenticator formFields={formFields} className="shadow-lg">
        {({ user }) =>
          user ? (
            <div>{children}</div>
          ) : (
            <div>
              <h1>Please sign in below:</h1>
            </div>
          )
        }
      </Authenticator>
    </>
  );
};

export default AuthProvider;
