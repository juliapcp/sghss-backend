import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default function setupSwagger(app: Application) {
    const specPath = path.resolve(__dirname, '../../docs/openapi.yaml');
    const spec = yaml.load(fs.readFileSync(specPath, 'utf8')) as object;
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));
}
