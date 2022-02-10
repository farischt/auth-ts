# Authentication System by Farischt

Token based authentication system using Next.js & PostgreSQL Database with sequelize ORM. (Ongoing version)

## Installation

First, you'll need node.js and yarn installed : [https://nodejs.org/en/].

- Our version of node.js : v16.13.2
- Our version of yarn : 1.22.17

## Technologies

Our project uses the following technologies :

- The React framework Next.js for both front-end and back-end (React + Node.js running on the same server)
- A postgreSQL database
- Sequelize ORM
- Typescript
- Docker containers for postgres and pgAdmin

## Getting Started

Install all the dependencies by running the following command :

```bash
yarn add
```

Go to /server/database/config/config.json and add your own database configurations. If you are using docker, make sur you started your postgres container.

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
