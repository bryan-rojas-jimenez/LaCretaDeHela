
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export {};

async function runStressTest() {
  console.log('🚀 INITIALIZING STRESS TEST...');
  const startTime = Date.now();
  const results = {
    inventoryItems: 0,
    customers: 0,
    projects: 0,
    tasks: 0,
    transactions: 0,
    errors: 0,
    error: null as string | null,
  };

  try {
    // 1. Bulk Inventory Ingestion (2,000 items)
    console.log('📦 Phase 1: Ingesting 2,000 Inventory Items...');
    for (let i = 0; i < 20; i++) {
      const batch = Array.from({ length: 100 }).map((_, j) => ({
        name: `Stress Test Product ${i * 100 + j}`,
        sku: `SKU-STRESS-${i * 100 + j}-${Date.now()}`,
        quantity: Math.floor(Math.random() * 1000),
        price: Math.random() * 500,
        category: 'Stress Test Data',
      }));
      await prisma.inventoryItem.createMany({ data: batch });
      results.inventoryItems += batch.length;
    }

    // 2. Bulk Customer Ingestion (1,000 customers)
    console.log('👥 Phase 2: Ingesting 1,000 Customers...');
    for (let i = 0; i < 10; i++) {
      const batch = Array.from({ length: 100 }).map((_, j) => ({
        firstName: `Stress`,
        lastName: `Customer ${i * 100 + j}`,
        email: `stress.${i * 100 + j}@example.com`,
        accountNumber: `ACC-STRESS-${i * 100 + j}-${Date.now()}`,
      }));
      await prisma.customer.createMany({ data: batch });
      results.customers += batch.length;
    }

    // 3. Project & Task Load (500 Projects, 2,500 Tasks)
    console.log('🏗️ Phase 3: Creating 500 Projects & 2,500 Tasks...');
    for (let i = 0; i < 50; i++) {
      const project = await prisma.project.create({
        data: {
          name: `Stress Project ${i}`,
          description: 'High load testing project',
          tasks: {
            create: Array.from({ length: 50 }).map((_, j) => ({
              title: `Heavy Task ${i}-${j}`,
              status: 'TODO',
              priority: 'HIGH',
            }))
          }
        }
      });
      results.projects += 1;
      results.tasks += 50;
    }

    // 4. Transaction Hammer (1,000 rapid updates)
    console.log('🔨 Phase 4: Hammering Stock Transactions (1,000 updates)...');
    const items = await prisma.inventoryItem.findMany({ take: 100 });
    for (let i = 0; i < 1000; i++) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      await prisma.transaction.create({
        data: {
          type: 'IN',
          amount: 5,
          itemId: randomItem.id,
        }
      });
      results.transactions += 1;
    }

    const duration = (Date.now() - startTime) / 1000;
    console.log('\n✅ STRESS TEST COMPLETE');
    console.log('-------------------------');
    console.log(`Duration: ${duration}s`);
    console.log(`Inventory Items: ${results.inventoryItems}`);
    console.log(`Customers: ${results.customers}`);
    console.log(`Projects: ${results.projects}`);
    console.log(`Tasks: ${results.tasks}`);
    console.log(`Transactions: ${results.transactions}`);
    console.log('-------------------------');

    return { ...results, duration, success: true };

  } catch (error) {
    console.error('❌ STRESS TEST CRASHED:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return { ...results, success: false, error: errorMessage, duration: (Date.now() - startTime) / 1000 };
  } finally {
    await prisma.$disconnect();
  }
}

runStressTest().then(res => {
  const fs = require('fs');
  const path = require('path');
  const logContent = `
# Stress Test Results - ${new Date().toISOString()}
- **Success:** ${res.success}
- **Total Duration:** ${res.duration}s
- **Inventory Items Added:** ${res.inventoryItems}
- **Customers Added:** ${res.customers}
- **Projects Created:** ${res.projects}
- **Tasks Created:** ${res.tasks}
- **Transactions Processed:** ${res.transactions}
- **Errors Encountered:** ${res.error || 'None'}

## Conclusion
The application ${res.success ? 'passed' : 'failed'} the stress test.
  `;
  fs.writeFileSync(path.join(__dirname, '../docs/STRESS_TEST_LOG.md'), logContent);
  console.log('Log recorded in docs/STRESS_TEST_LOG.md');
});
