import Header from '../components/custom/header';
import Footer from '../components/custom/footer';
import Test from '../components/scripts/Test';
import MetaMask from '../components/scripts/MetaMask';

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
        <section className="mb-8">
          <Test />
        </section>
        <section className="mb-8">
          <MetaMask />
        </section>
        <Footer />
      </main>
    </div>
  );
}
