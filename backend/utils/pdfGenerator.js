const pdf = require('pdfkit');

const generatePDFReceipt = async ({ user, movie, booking }) => {
    return new Promise((resolve, reject) => {
        const doc = new pdf();
        const buffers = [];

        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        doc.fontSize(20).text("Booking Confirmation", { align: "center" });
        doc.text("\n\n");

        doc.fontSize(14).text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);
        doc.text(`Movie: ${movie.title}`);
        doc.text(`Date: ${movie.releaseDate}`);
        doc.text(`Number of Tickets: ${booking.numberOfTickets}`);
        doc.text(`Selected Seats: ${JSON.stringify(booking.selectedSeats)}`);
        doc.text(`Total Price: $${booking.totalPrice}`);
        doc.text("\n\nThank you for your booking!");

        doc.end();
    });
};

module.exports = { generatePDFReceipt };
