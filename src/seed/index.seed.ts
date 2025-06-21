import { AppDataSource } from 'src/data-source';
import { seedAdminUser } from './admin-user.seed';

const seeders = [seedAdminUser];

async function main() {
  await AppDataSource.initialize();

  for (const seeder of seeders) {
    await seeder();
  }

  await AppDataSource.destroy();
}

main()
  .then(() => {
    console.log('✅ All seeders ran successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error running seeders:', err);
    process.exit(1);
  });
