export default function Home() {
  return (
    <div className="container">
      <header className="header">
        <title>Event Chain</title>
        <h1 className="text-8xl text-center" >Ticket Chain</h1>
        <nav className="nav">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/events">Events</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search events..."
          className="search-bar"
        />
      </header>
      <main>
        <section>
          <h2>Featured Events</h2>
          <p>No events available at the moment.</p>
        </section>
        <section>
          <h2>Upcoming Events</h2>
          <ul>
            <li>Event 1 - Date</li>
            <li>Event 2 - Date</li>
            <li>Event 3 - Date</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2024 Ticket Chain. All rights reserved.</p>
      </footer>
    </div>
  );
}
