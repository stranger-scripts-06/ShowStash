# ShowStash – Integrated Movie and Event Ticketing System

ShowStash is a web-based ticketing platform designed to streamline the booking and RSVP process for movie theaters and event organizers. It provides users with a secure and efficient interface to book tickets, receive real-time confirmations, and make payments. Organizers and theater managers benefit from tools for tracking sales, validating entries through QR codes, and managing events via an intuitive dashboard.

---

## Table of Contents

- [Problem Statement](#problem-statement)
- [Purpose and Scope](#purpose-and-scope)
- [Target Users](#target-users)
- [Functional Requirements](#functional-requirements)
- [System Architecture](#system-architecture)
- [Data Flow and Interaction](#data-flow-and-interaction)
- [Technical Stack](#technical-stack)
- [Deployment](#deployment)
- [Modifications and Updates](#modifications-and-updates)
- [Getting Started](#getting-started)

---

## Problem Statement

ShowStash addresses the challenges of managing ticket bookings and event RSVPs in real-time. Users can book movie or event tickets, receive confirmations via email/SMS, and complete secure payments. Organizers and theater managers can monitor ticket sales, generate QR codes for verification, and access a comprehensive dashboard for operational control.

---

## Purpose and Scope

### Purpose

To provide a unified platform that automates the process of booking, confirming, and validating tickets for both events and movie screenings.

### Scope

- Collection and validation of user, booking, and event/movie data.
- Secure payment processing through integrated gateways.
- Confirmation messages with QR codes sent via email and SMS.
- Real-time updates to booking status and event management.
- Generation of PDF reports summarizing bookings and sales.

---

## Target Users

- **Event Organizers**: Create events, manage RSVPs, and track attendees.
- **Theater Managers**: Handle movie ticket bookings, show schedules, and ticket validations.
- **End-Users**: Book tickets, receive confirmations, and complete payments online.

---

## Functional Requirements

- **User Authentication**: Secure login and registration process.
- **Data Validation**: Verification of user inputs (name, email, phone, payment details).
- **Payment Processing**: Secure payment integration with real-time status updates.
- **Confirmation System**: Email confirmations including unique QR codes.
- **Reporting**: Generate booking reports in PDF format.
- **API Integration**: Frontend and backend communication via RESTful APIs.

---

## System Architecture

- **Frontend**: Built using React.js or Vue.js for an interactive user experience.
- **Backend**: Node.js with Express.js to handle business logic and API endpoints.
- **Database**: MongoDB Atlas for storing user, booking, and event-related data.

---

## Data Flow and Interaction

1. **User Interaction**: Users browse events, book tickets, and initiate payments via the frontend.
2. **Backend Processing**: The Express server handles validations, processes transactions, and generates QR codes.
3. **Database Operations**: MongoDB Atlas stores and retrieves data in real time.
4. **Confirmation and Feedback**: Users receive booking confirmation and ticket details via email or SMS.

---

## Technical Stack

- **Frontend**: React.js or Vue.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **Deployment Platforms**:
  - Frontend: Netlify or Vercel
  - Backend: Heroku or DigitalOcean
  - Database: MongoDB Atlas (cloud-hosted)

---

## Deployment

- **Frontend Deployment**: Netlify or Vercel (CDN-backed, responsive hosting)
- **Backend Deployment**: Heroku or DigitalOcean (scalable server deployment)
- **Database**: MongoDB Atlas (managed, cloud-based NoSQL database)

---

## Modifications and Updates

### 1. Payment Functionality Improvements
- Integrated secure payment simulation for consistent test responses.
- Enhanced validation of booking and card details at the backend.
- Automated updates of booking status post-payment.
- Redirected users to a dedicated confirmation page after payment.

### 2. Improved User Interaction
- Added user controls such as a button to resend confirmation emails.
- Implemented detailed error feedback for failed transactions and validation errors.

### 3. Frontend-Backend Integration
- Developed REST APIs for booking, payment, and confirmation.
- Improved frontend logic for dynamic redirection and personalized responses.

### 4. Testing and Debugging
- Used Thunder Client to validate and debug API endpoints.
- Fixed middleware and routing issues in Express backend.
- Hardcoded critical values during development for streamlined testing.

---

## Getting Started

1. **Clone the repository**  
   `git clone https://github.com/your-username/showstash.git`

2. **Install dependencies**  
   Navigate to the frontend and backend directories and run:  
   `npm install`

3. **Configure environment variables**  
   Add `.env` files in both frontend and backend directories with required configurations (MongoDB URI, API keys, etc.)

4. **Run the application locally**  
   Start both servers using:  
   `npm start`

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
