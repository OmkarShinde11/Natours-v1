const swaggerDocs=require('swagger-jsdoc');
const options={
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'Node.js API with Swagger',
        },
        servers: [
          {
            url: 'http://localhost:4201', // Replace with your server URL
          },
        ],
      },
      apis: ['./routes/*.js'], // Path to the API docs
}

const specs=swaggerDocs(options);
module.exports=specs;