# TicketChain

## Problem

Many popular ticket sites exist, that allow customers to browse different upcoming events in their area and book tickets, however we identified several issues with these centralised service model:

- Tickets cannot be easily transferred
  - Many existing platforms make it difficult if not impossible to transfer tickets between different users. This means people don't have _true_ ownership over their purchased tickets.
- Complex user interfaces
  - User interfaces on many of these websites can be quite complex and complicated, which can make it hard to book the right ticket and can often lead to customers making costly mistakes.
- Scalability issues
  - When popular events are released, many of these websites can slow down or sometimes even crash, worsening the experience for the end user.
- Single point of failure
  - These central services consolidate all of the data and compute for their services in one spot. One possible risk to consider is a cyberattack - if the central organisation is compromised, all customer data is at risk of being stolen and leaked. Another possible risk is the central server going down, meaning ticket services would go down, which is not ideal if thousands of attendees are trying to verify themselves at an event.
  - Hidden booking fees
    -  Centralised platforms often impose high service fees which aren't visible when viewing events. This is a lack of privacy issue because it is unclear how ticket prices are determined, leading to mistrust in customers.
- 

## Proposal

We propose to build a solution which tackles these issues head-on. TicketChain is a decentralised website which allows users to browse upcoming events, and book tickets for these events through verifiable, immutable blockchain transactions. This allows users to purchase tickets, even during higher volumes without performance degradation, all over the world. Functionality also exists for users to transfer their tickets to other users.

This is made possible through the use of smart contracts deployed on the blockchain which expose several public read and write methods, which can be invoked through our front-end user interface. A record of transactions are kept secure on the blockchain, and no central entity can tamper with these transactions.

Because the main application logic is on the blockchain, this means we can exploit the blockchains' scalability and durability during high levels of demand. The workload of execution is split between nodes and transaction gas fees pay for the compute required during levels of high demand for the service, solving the issue of central services being unscalable and avoiding us from having a single point of failure.
