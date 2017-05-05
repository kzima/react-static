import React from 'react';
import { Link } from 'react-router'

export const Index = () => (
  <section>
    <h1>This is the index page!</h1>
    <p>This page loads instantly even though your bundle is still loading in the background!</p>
    <nav>
      <Link to="/login">Login here</Link>
      <Link to="/about">About this site!</Link>
    </nav>
  </section>
)

export const Admin = () => (
  <section>
    <h1>You're logged in!</h1>
    <p>This page is also prerendered.</p>
    <nav>
      <Link to="/">Home</Link>
    </nav>
  </section>
)

export const Login = () => (
  <section>
    <h1>This is the login form</h1>
    <form action="/admin">
      <p>Hard refresh this page and check the "view page source" for the rendered content!</p>
      <button type="submit">Go to Admin</button>
    </form>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About this site!</Link>
    </nav>
  </section>
)

export const About = () => (
  <section>
    <h1>About this site</h1>
    <p>It works!</p>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Log in here</Link>
      <a href="http://google.com">External link, don't crawl this.</a>
    </nav>
  </section>
)

export const FourOhFour = () => (
  <section>
    <h1>Four Oh Four Yo.</h1>
  </section>
)
