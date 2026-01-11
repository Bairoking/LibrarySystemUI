const jwt = require('jsonwebtoken');

exports.auth = (roles = []) => {
  return (req, res, next) => {

    // 1️⃣ Read Authorization header safely
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // 2️⃣ Must start with "Bearer "
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization format must be Bearer <token>' });
    }

    // 3️⃣ Extract token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }

    try {
      // 4️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 5️⃣ Role-based access control
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Access denied' });
      }

      // 6️⃣ Attach user to request
      req.user = decoded;
      next();

    } catch (err) {
      console.error('JWT ERROR:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  };
};
