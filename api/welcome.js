export default function handler(req, res) {
    // This will handle GET requests to /api/welcome
    if (req.method === 'GET') {
      return res.status(200).send('Welcome to the Posi-Fortune Server!');
    } else {
      // Handle other HTTP methods (e.g., POST not allowed)
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  