import Header from '../components/custom/header';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div>
        <Header />
        {/* Other page content */}
      </div>
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
