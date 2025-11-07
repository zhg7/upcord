# <img src="https://raw.githubusercontent.com/zhg7/upcord/557a10359a3711576e6546e940458052c5d54321/client/src/assets/images/upcord-icon.svg" width="42px"></img> Upcord
General-purpose forum organised into subforums. Registered users have their own profiles, can create threads and leave comments. They can also communicate with each other privately via chats.

[![Licence](https://img.shields.io/github/license/zhg7/upcord?style=for-the-badge)](./LICENSE)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![Primevue](https://img.shields.io/badge/primevue-f8fafc?style=for-the-badge&logo=primevue)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

<details>
<summary>Screenshots</summary>
<br/>
<sup>Redacted to remove personal information.</sup><br/><br/>
<img width="1892" height="884" alt="capture_1762547175717" src="https://github.com/user-attachments/assets/36fbc89f-0132-4144-95fe-ea8982a34269" />
<img width="1893" height="877" alt="capture_1762547380739" src="https://github.com/user-attachments/assets/1726226b-0f4f-4903-975f-f4d7cc70e5bd" />
<img width="1892" height="916" alt="capture_1762547820447" src="https://github.com/user-attachments/assets/a749a754-e40c-494f-8819-a0a2bcd34875" />
<img width="1915" height="912" alt="capture_1762548413054" src="https://github.com/user-attachments/assets/28a3a943-cfc5-4b75-928c-76882c5ddb55" />
<img width="1893" height="919" alt="capture_1762548021214" src="https://github.com/user-attachments/assets/71dbaec8-eff3-43c0-8e69-535f9dbba487" />
<img width="1893" height="913" alt="capture_1762548216271" src="https://github.com/user-attachments/assets/93b57975-e99f-48af-aa6a-aa77f041f8f5" />
</details>

## Uso

### Requirements
- [Node.js](https://nodejs.org/)
- [MySQL](https://aws.amazon.com/rds/mysql/)
- [SendGrid](https://sendgrid.com/)
- [Cloudinary](https://cloudinary.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

### Environment variables
#### ```client```
- ```VITE_SERVER_BASE_URL```

#### ```server```
- [```DATABASE_URL```](https://www.prisma.io/docs/reference/database-reference/connection-urls#mysql)
- [```SENDGRID_API_KEY```](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs#create-and-store-a-sendgrid-api-key)
- ```SENDGRID_SENDER```
- [```CLOUDINARY_URL```](https://cloudinary.com/documentation/node_integration#setting_the_cloudinary_url_environment_variable)
- ```CLIENT_BASE_URL```

### Getting started

Go to the ```client``` and ```server``` folders. Install dependencies:
```bash
npm install
```
Create the database:
```bash
npx prisma migrate dev
```
Run local development servers:
```bash
npm run dev
```
