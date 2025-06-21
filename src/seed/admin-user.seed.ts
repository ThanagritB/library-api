import { AppDataSource } from 'src/data-source';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedAdminUser() {
  const userRepository = AppDataSource.getRepository(User);

  const existing = await userRepository.findOne({
    where: { username: 'admin' },
  });

  if (existing) {
    console.log('✅ Admin user already exists, skipping.');
    return;
  }

  const admin = userRepository.create({
    username: 'admin',
    email: 'admin@example.com',
    password: await bcrypt.hash('123456', 10),
  });

  await userRepository.save(admin);
  console.log('✅ Admin user seeded successfully.');
}
