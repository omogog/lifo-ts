import { app } from './infrastructure/http/server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server available http://localhost:${PORT}/`);
    console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});