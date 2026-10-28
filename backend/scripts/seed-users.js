require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");

const usersToSeed = [
  {
    name: "Admin",
    email: "admin@freshcart.in",
    rawPassword: "admin123",
    phone: "9876543210",
    role: "admin",
    address: null
  },
  {
    name: "Store Manager",
    email: "manager@freshcart.in",
    rawPassword: "admin123",
    phone: "9876501234",
    role: "admin",
    address: null
  },
  {
    name: "Priya Sundaram",
    email: "priya@gmail.com",
    rawPassword: "user123",
    phone: "9840123456",
    role: "customer",
    address: {
      fullName: "Priya Sundaram",
      phone: "9840123456",
      address: "Flat 4B, Green Meadows, 12th Main Road, Anna Nagar",
      city: "Chennai",
      pincode: "600040"
    }
  },
  {
    name: "Karthik Raja",
    email: "karthik.r@example.com",
    rawPassword: "user123",
    phone: "9841987654",
    role: "customer",
    address: {
      fullName: "Karthik Raja",
      phone: "9841987654",
      address: "24/7 South Boag Road, T. Nagar",
      city: "Chennai",
      pincode: "600017"
    }
  },
  {
    name: "Ananya Ramesh",
    email: "ananya.ramesh@example.com",
    rawPassword: "user123",
    phone: "9444112233",
    role: "customer",
    address: {
      fullName: "Ananya Ramesh",
      phone: "9444112233",
      address: "Plot 89, 3rd Avenue, Indira Nagar, Adyar",
      city: "Chennai",
      pincode: "600020"
    }
  },
  {
    name: "Venkatesh Kumar",
    email: "venkat.k@example.com",
    rawPassword: "user123",
    phone: "9884556677",
    role: "customer",
    address: {
      fullName: "Venkatesh Kumar",
      phone: "9884556677",
      address: "56 Bypass Road, Velachery",
      city: "Chennai",
      pincode: "600042"
    }
  },
  {
    name: "Sneha Patel",
    email: "sneha.p@example.com",
    rawPassword: "user123",
    phone: "9823456789",
    role: "customer",
    address: {
      fullName: "Sneha Patel",
      phone: "9823456789",
      address: "15 Sterling Road, Nungambakkam",
      city: "Chennai",
      pincode: "600034"
    }
  },
  {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    rawPassword: "user123",
    phone: "9711223344",
    role: "customer",
    address: {
      fullName: "Rahul Sharma",
      phone: "9711223344",
      address: "7th Cross, Gandhinagar, Adyar",
      city: "Chennai",
      pincode: "600020"
    }
  }
];

async function seedUsers() {
  console.log("\n==========================================");
  console.log("   FreshCart - Adding Backend Users");
  console.log("==========================================\n");

  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "freshcart"
  });

  console.log("Connected to MySQL database:", process.env.DB_NAME || "freshcart");

  const saltRounds = 10;
  const adminHash = await bcrypt.hash("admin123", saltRounds);
  const userHash = await bcrypt.hash("user123", saltRounds);

  console.log(`Bcrypt hashes generated successfully.`);

  for (const u of usersToSeed) {
    const passwordHash = u.role === "admin" ? adminHash : userHash;

    await conn.query(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         password = VALUES(password),
         phone = VALUES(phone),
         role = VALUES(role)`,
      [u.name, u.email, passwordHash, u.phone, u.role]
    );

    // Get user id
    const [[userRow]] = await conn.query("SELECT id FROM users WHERE email = ?", [u.email]);
    const userId = userRow.id;

    // Add default address if applicable
    if (u.address) {
      await conn.query(
        `INSERT INTO addresses (user_id, full_name, phone, address, city, pincode, is_default)
         SELECT ?, ?, ?, ?, ?, ?, TRUE
         WHERE NOT EXISTS (
           SELECT 1 FROM addresses WHERE user_id = ? AND address = ?
         )`,
        [
          userId,
          u.address.fullName,
          u.address.phone,
          u.address.address,
          u.address.city,
          u.address.pincode,
          userId,
          u.address.address
        ]
      );
    }

    console.log(`✔ User added/updated: [${u.role.toUpperCase()}] ${u.name} (${u.email}) | Password: ${u.rawPassword}`);
  }

  // Display final users in DB
  const [allUsers] = await conn.query("SELECT id, name, email, phone, role, created_at FROM users ORDER BY id ASC");
  console.log("\n==========================================");
  console.log(`Total Users in Database: ${allUsers.length}`);
  console.log("==========================================");
  console.table(allUsers);

  await conn.end();
  console.log("Seeding completed successfully!\n");
}

seedUsers().catch(err => {
  console.error("Error seeding users:", err);
  process.exit(1);
});

