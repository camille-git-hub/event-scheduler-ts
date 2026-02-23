export default function Footer() {
  return (
    <footer className="p-6 text-center opacity-70 fixed bottom-0 left-0 w-full bg-base-200">
      <p>© {new Date().getFullYear()} Event Scheduler. All rights reserved.</p>
    </footer>
  );
}
