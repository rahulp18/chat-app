# ChatVia

ChatVia is a full-featured chat application built with modern technologies, designed to provide seamless communication through direct messages and group chats. The application is structured as a monorepo using Turbo, with a backend powered by NestJS, Prisma, and PostgreSQL, and a frontend developed with Next.js 14.

## Features

### Completed Features
- **User Registration & Login:** Secure user authentication with JWT.
- **Direct Messaging:** Send messages directly to other users.
- **Group Chats:** Create and manage group chats with multiple participants.
- **Message Sending:** Send and receive messages in both direct and group chats.
- **Chat Management:** Delete direct chats or leave group chats.
- **User Search:** Search for users within the application.

### Upcoming Features
- **Video & Voice Calls:** Seamless communication through video and voice calls.
- **Profile Settings:** Customize and manage user profiles.
- **Block & Unblock Users:** Manage privacy by blocking or unblocking users.
- **Status Feature:** Display and update user status.
- **Forgot Password:** Password recovery for users who forget their credentials.

## Project Structure

The project is organized as a monorepo using Turbo, containing two main applications:

- **Frontend:** A Next.js 14 application located in `apps/frontend`.
- **Backend:** A NestJS application with Prisma and PostgreSQL, located in `apps/server`.

## Getting Started

### Prerequisites
- **Node.js** (v16+)
- **Yarn** (v1.22.22)
- **PostgreSQL** (for the database)

### Installation

1. **Clone the repository:**
   ```bash
   git clone  https://github.com/rahulp18/chat-app.git
   cd ChatVia
