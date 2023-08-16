export default function TicketNotFound() {
  return (
    <div className="h-screen center">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-4xl font-bold text-center">Ticket Not Found</h1>
        <p className="text-xl text-center">
          Please check your link and try again
        </p>
        <p className="text-base text-center">
          Still having issues?, please contact us
        </p>
      </div>
    </div>
  );
}
