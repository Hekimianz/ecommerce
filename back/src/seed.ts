import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Role, User } from './users/User.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: false,
});

async function seed() {
  await dataSource.initialize();
  const userRepo = dataSource.getRepository(User);

  const users = userRepo.create([
    {
      email: 'admin@test.com',
      password: '$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // bcrypt hash
      role: Role.admin,
    },
    {
      email: 'user@test.com',
      password: '$2b$10$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      role: Role.user,
    },
  ]);

  await userRepo.save(users);
  console.log('Users seeded');
  await dataSource.destroy();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
