# AccessG: Refined Product Strategy

## 1. What is it, in one sentence?
AccessG is a single-page application where event creators sell standard and code-locked exclusive tickets, and attendees store offline-ready digital passes for instant gate scanning.

## 2. Who is it for, and when do they open it?
It is for Chike, a 26-year-old software developer in Lagos. He opens it on Friday night while standing in a chaotic queue outside a tech meetup, desperate for his QR code to load. He also opens it on a random Tuesday evening when he is bored, just to look through the memory suite—a small digital photo album of the events he attended last month—checking his wallet balance for upcoming shows.

## 3. What goes wrong today without it?
A creator sells tickets through bank transfers and WhatsApp messages. At the venue gate, the network drops. The gatekeeper has to scroll through a messy spreadsheet on a tiny phone screen while fifty angry people wait outside. Two people get in using a screenshot of the same PDF ticket because the gatekeeper has no way to scan and invalidate duplicates. Trust is destroyed, and the creator loses revenue.

## 4. What can it do?
*(Ten features for version one, built as a single-page app that changes based on login state.)*

**Customer Features:**
1. **View Public Events:** The user asks what is happening this weekend, the app answers with the General Events list, drawn from shared records.
2. **Unlock Studio Events:** The user inputs a creator code, the app unlocks a hidden event page, drawn from shared records.
3. **Buy Ticket:** The user asks to secure a seat, the app processes payment and generates a digital pass, drawn from private records.
4. **Offline Pass Display:** The user asks for their QR code at a dead-network gate, the app displays the locally saved ticket, drawn from private records.
5. **Memory Suite & Wallet:** The user asks what they did last month and what they can spend, the app shows their past event photos and balance, drawn from private records.

**Event Creator Features:**
6. **General Event Creation:** The creator asks to list a 500-person concert, the app publishes it to the main feed.
7. **Studio Event Creation:** The creator asks to list a 15-person dinner, the app generates an access code and a dietary requirement form.
8. **Shared Gatekeeper Link:** The creator asks how bouncers will check tickets, the app generates a secure, no-login web link for staff to scan QR codes.
9. **Sales Dashboard:** The creator asks how much money they made, the app shows total tickets sold and revenue.

**Owner Features:**
10. **Support Override:** The owner asks to refund a broken transaction, the app revokes the ticket and updates the wallet.

*(Note: Automated marketing emails and in-app chat were cut. Building a reliable chat system takes weeks, and users will just message the creator on social media anyway. We focus strictly on making the ticket scan work.)*

## 5. What does it refuse to do?
It refuses to search private records by meaning. Shared records may be searched by meaning, but private records must be fetched by exact customer ID and never searched across customers. It explicitly refuses to tell one user if another user bought a ticket. It also refuses to process a ticket purchase if the capacity cap is reached, locking the database row so two people cannot buy the final ticket at the exact same millisecond.

## 6. Where do the records come from, who approves them, and how do they stay current?
*   **Shared records** (event details, prices, access codes) come directly from the Event Creator. The creator approves them by hitting publish, and they stay current because the creator edits them from their dashboard.
*   **Private records** (ticket ownership, wallet balance) come exclusively from the payment gateway. Nobody approves them manually. They stay current automatically via server callbacks the moment a bank confirms a transaction.

## 7. Why can a normal chatbot not do this?
A normal chatbot searches public internet data. It has no access to locked database states.

*   **Question 1:** "Is VIP sold out for the Lagos Tech Mixer?"
    *   *Chatbot:* "I cannot check live availability, but you can visit their website."
    *   *AccessG:* "Yes, the cap of 50 VIP tickets was reached three minutes ago."
*   **Question 2:** "Did my payment for the Studio Dinner go through?" (Fetched by exact customer ID).
    *   *Chatbot:* "Usually, payments take a few minutes to reflect. Please check your bank."
    *   *AccessG:* "No, your payment failed at 8:14 PM due to insufficient funds. Your seat is not reserved."
*   **Question 3:** "What is the access code for the Design Roast?"
    *   *Chatbot:* "I do not have access to private event codes."
    *   *AccessG:* "I cannot provide the code. You must obtain it directly from the event creator's promotional materials."

## 8. How does paying change what a person can see, and what happens when payment stops?
Before paying, a user only sees event marketing text and a checkout button. The moment payment clears, the app generates a cryptographic QR code, unlocks the event rules, and activates the memory suite for that specific event. If a payment fails, or if a ticket is refunded, the app immediately revokes the QR code, turning it into a greyed-out screen that says "Pass Invalid."

## 9. What must version one collect that version two will need, and what must version one not do yet?
Version one must collect the exact timestamps of every ticket scan and the device model of the user. Version two will need this to build an offline-sync prediction engine. Version one must not build an algorithmic recommendation feed. Showing users events based on their preferences requires a massive dataset. For now, a simple chronological list is enough.

## 10. What could go wrong? (Top 3 by Severity)
1. **The Oversell Collision.** A creator lists a 20-person event. Fifty people click buy at the exact same time. If the database does not lock the row during payment, you sell 50 tickets to a 20-seat room, ruining the high-trust promise.
2. **The Link Leak.** A gatekeeper shares the verification link on a public WhatsApp group, allowing anyone to act as a bouncer and mark tickets as scanned, invalidating real attendees before they arrive.
3. **The Gateway Blackout.** The payment processor goes down on a Friday evening during a major ticket drop. Users are charged by their banks, but AccessG never receives the success callback, leaving hundreds of people without tickets and demanding refunds.

---

### Building It (Tools & Costs)
To build this by describing it to an AI coding tool, use a free React framework like Next.js for the single page application, paired with a free Supabase or PostgreSQL backend for the database. These are free to build and test for months.

For the payment gateway, use Paystack or Flutterwave. They are free to integrate. The live transaction cost will be exactly 1.5% + 100 Naira for local transactions. They also handle the currency switching, allowing international users to pay in dollars while settling you in Naira.

### Gap Count
Total of 16 gaps identified in the original raw idea:
*   **ASK:** 2
*   **ASSUME:** 6
*   **RECOMMEND:** 8