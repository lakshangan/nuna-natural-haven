import app from './src/app.js';
import { ENV } from './src/config/env.js';

const PORT = process.env.PORT || 5050;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 Backend listening on port: ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api`);
});
