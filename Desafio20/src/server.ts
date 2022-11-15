import { Application} from "./deps.ts";
import ProductRoute from './routes/productRoute.ts';
import { logger } from "./middlewares/loggerMiddleware.ts";

import './configs/dbConfig.ts';

const PORT = 8000;
const app = new Application();

app.use(logger);
app.use(ProductRoute.routes());

console.log(`Server running on http://localhost:${PORT}`);
await app.listen({ port: PORT });