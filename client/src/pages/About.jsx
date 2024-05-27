import React from "react";

export default function About() {
  return (
    <div className="bg-gradient-to-br from-pink-400 to-purple-600 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl text-center px-6">
        <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
        <p className="text-lg text-white leading-relaxed">
          Welcome to our MERN stack authentication app, where security meets
          simplicity. Our mission is to provide a seamless and secure platform
          for user registration, login, and access management. With a focus on
          user experience and data protection, we empower individuals to create
          accounts easily, leveraging unique usernames, emails, and robust
          passwords. Through advanced authentication mechanisms such as JSON Web
          Tokens (JWT) and session cookies, users can confidently log in, with
          their identities verified and sessions securely managed. Our app
          features comprehensive password management, allowing users to reset
          forgotten passwords or update existing ones effortlessly. With
          carefully implemented user roles and authorization mechanisms, access
          to features and resources is precisely controlled, ensuring data
          security and privacy. All communications between client and server are
          encrypted using HTTPS, safeguarding against potential threats. We
          prioritize data integrity by thoroughly validating and sanitizing
          input data, mitigating common security risks like cross-site scripting
          (XSS) or SQL injection. Extensive logging and monitoring capabilities
          track user activities and system events for auditing and proactive
          security measures.
        </p>
      </div>
    </div>
  );
}
