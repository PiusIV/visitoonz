export default function MapFrame() {
  return (
    <div className="iframe-container mt-20 grid justify-center w-full relative h-100 rounded-xl overflow-hidden shadow-lg">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.112812999394!2d6.9620542!3d5.3997791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425dd354613b53%3A0xf02bd3de07d68123!2sVisiToonz%20Art%20Enterprises!5e0!3m2!1sen!2sng!4v1783042679167!5m2!1sen!2sng"
        title="Google Maps Location of Visitoonz Enterprise"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        className="w-full h-full border-0"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>{" "}
      <div className="absolute bg-bg p-2 rounded shadow">Owerri Office</div>
    </div>
  );
}
