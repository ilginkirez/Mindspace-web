# Mindspace Backend

This is the backend for the Mindspace Mental Wellness Platform.

## Prerequisites

- Node.js installed
- SQLite (default) or PostgreSQL

## Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Environment Variables:
    Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
    (On Windows: `copy .env.example .env`)

    Adjust `DATABASE_URL` if you want to use PostgreSQL instead of the local SQLite file.

4.  Database Migration:
    Run the following to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```
    This command will also generate the Prisma Client.

## Running the Server

-   **Development Mode**:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:3000`.

-   **Production Build**:
    ```bash
    npm run build
    npm start
    ```

## API Documentation

-   **Auth**: `/auth/register`, `/auth/login`, `/auth/me`
-   **Experts**: `/experts` (List), `/experts/:id` (Profile), `/expert/me/appointments` (Private)
-   **Blogs**: `/blogs` (List/Get), `/blogs` (Create - Expert/Admin), `/blogs/:id` (Update/Delete)
-   **Appointments**: `/appointments` (Create), `/appointments/:id/cancel`, `/appointments/:id/feedback`
-   **User**: `/me/appointments`, `/me/saved-posts`
-   **Admin**: `/admin/create-expert`, `/admin/verify-expert/:user_id`

## Role-Based Access

-   **User**: Can view blogs, saved posts, create appointments, leave feedback.
-   **Expert**: Can create/edit blogs (verified only for publishing), view own appointments.
-   **Admin**: Can manage experts, blogs, and perform all actions.
