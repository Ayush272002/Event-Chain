export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="header text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-700">Ticket Chain</h1>
        <nav className="nav mt-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/" className="text-blue-500 hover:text-blue-700">
                Home
              </a>
            </li>
            <li>
              <a href="/events" className="text-blue-500 hover:text-blue-700">
                Events
              </a>
            </li>
            <li>
              <a href="/contact" className="text-blue-500 hover:text-blue-700">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <input
          type="text"
          placeholder="Search events..."
          className="search-bar mt-4 p-2 border border-gray-300 rounded w-full max-w-md mx-auto"
        />
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
          <p className="text-gray-600">No events available at the moment.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <ul className="list-disc list-inside">
            <li>Event 1 - Date</li>
            <li>Event 2 - Date</li>
            <li>Event 3 - Date</li>
          </ul>
        </section>
      </main>
      <footer className="text-center mt-8">
        <p className="text-gray-500">
          &copy; 2024 Ticket Chain. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
