const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export {};

async function runUITestSimulation() {
  console.log('🧪 STARTING UI SIMULATION TEST...');

  // 1. Simulate "Add Customer" Form Submit
  console.log('\n👤 Testing Customer Creation...');
  const customerData = {
    firstName: "Test",
    lastName: "User UI",
    email: `ui.test.${Date.now()}@example.com`,
    phone: "555-0199",
    address: "123 UI Way",
    accountNumber: `UI-${Date.now()}`
  };

  try {
    const customer = await prisma.customer.create({ data: customerData });
    console.log(`✅ Customer Created: ${customer.firstName} ${customer.lastName} (ID: ${customer.id})`);
  } catch (error) {
    console.error('❌ Customer Creation Failed:', error);
  }

  // 2. Simulate "Add Supplier" Form Submit
  console.log('\n🚚 Testing Supplier Creation...');
  const supplierData = {
    name: "UI Test Supplier Corp",
    email: `supplier.ui.${Date.now()}@example.com`,
    contact: "Manager Mike",
    address: "456 Supply Chain Blvd",
    taxId: `TAX-UI-${Date.now()}`
  };

  try {
    const supplier = await prisma.supplier.create({ data: supplierData });
    console.log(`✅ Supplier Created: ${supplier.name} (ID: ${supplier.id})`);
  } catch (error) {
    console.error('❌ Supplier Creation Failed:', error);
  }

  await prisma.$disconnect();
}

runUITestSimulation();