import { User } from "@/entities/user/types";

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    maidenName: "Smith",
    age: 30,
    gender: "male",
    email: "john.doe@example.com",
    phone: "123456789",
    birthDate: "1990-05-12",
    image: "https://example.com/avatar.jpg",
    height: 180,
    weight: 75,
    university: "Tech University",
    username: "johndoe",
    password: "securepass123",
    eyeColor: "blue",
    hair: {
      color: "brown",
      type: "curly",
    },
    address: {
      address: "123 Main St",
      city: "Springfield",
      state: "NY",
      stateCode: "NY",
      postalCode: "10001",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    bank: {
      cardExpire: "06/24",
      cardNumber: "1234-5678-9012-3456",
      cardType: "Visa",
      currency: "USD",
      iban: "US12345678901234567890",
    },
    company: {
      name: "ExampleCorp",
      department: "Engineering",
      title: "Senior Developer",
      address: {
        address: "456 Business Rd",
        city: "Metropolis",
        state: "CA",
        stateCode: "CA",
        postalCode: "90001",
        coordinates: {
          lat: 34.0522,
          lng: -118.2437,
        },
      },
    },
    crypto: {
      coin: "Bitcoin",
      wallet: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      network: "BTC",
    },
    bloodGroup: "A+",
    ein: "12-3456789",
    ssn: "123-45-6789",
    macAddress: "00:1B:44:11:3A:B7",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0",
    role: "user",
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Brown",
    maidenName: "Johnson",
    age: 35,
    gender: "female",
    email: "alice.brown@example.com",
    phone: "987654321",
    birthDate: "1985-10-25",
    image: "https://example.com/alice.jpg",
    height: 165,
    weight: 55,
    university: "City University",
    username: "aliceb",
    password: "alice123",
    eyeColor: "green",
    hair: {
      color: "blonde",
      type: "straight",
    },
    address: {
      address: "789 College Ave",
      city: "Riverdale",
      state: "TX",
      stateCode: "TX",
      postalCode: "73301",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    bank: {
      cardExpire: "09/25",
      cardNumber: "9876-5432-1098-7654",
      cardType: "MasterCard",
      currency: "USD",
      iban: "US09876543210987654321",
    },
    company: {
      name: "EduTech",
      department: "Research",
      title: "Intern",
      address: {
        address: "101 Innovation Dr",
        city: "Austin",
        state: "TX",
        stateCode: "TX",
        postalCode: "73301",
        coordinates: {
          lat: 30.2672,
          lng: -97.7431,
        },
      },
    },
    crypto: {
      coin: "Ethereum",
      wallet: "0x1234567890abcdef",
      network: "ETH",
    },
    bloodGroup: "B+",
    ein: "98-7654321",
    ssn: "234-56-7890",
    macAddress: "00:1C:42:2E:60:4A",
    ip: "192.168.1.2",
    userAgent: "Mozilla/5.0",
    role: "admin",
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Martínez",
    maidenName: "Fernández",
    age: 24,
    gender: "male",
    email: "carlos.m@example.com",
    phone: "555123456",
    birthDate: "2000-07-08",
    image: "https://example.com/carlos.jpg",
    height: 172,
    weight: 80,
    university: "Universidad Nacional",
    username: "carlosm",
    password: "mypass",
    eyeColor: "brown",
    hair: {
      color: "black",
      type: "wavy",
    },
    address: {
      address: "456 Calle Mayor",
      city: "Madrid",
      state: "Madrid",
      stateCode: "MD",
      postalCode: "28013",
      coordinates: {
        lat: 40.4168,
        lng: -3.7038,
      },
    },
    bank: {
      cardExpire: "12/26",
      cardNumber: "4567-8901-2345-6789",
      cardType: "Amex",
      currency: "EUR",
      iban: "ES7921000813610123456789",
    },
    company: {
      name: "GlobalCorp",
      department: "HR",
      title: "Manager",
      address: {
        address: "Plaza Mayor 1",
        city: "Madrid",
        state: "Madrid",
        stateCode: "MD",
        postalCode: "28013",
        coordinates: {
          lat: 40.4168,
          lng: -3.7038,
        },
      },
    },
    crypto: {
      coin: "Litecoin",
      wallet: "LcHKz8T2sfPj1Gp5F3JYmMYiV9L2BNcV6t",
      network: "LTC",
    },
    bloodGroup: "AB-",
    ein: "45-6789012",
    ssn: "345-67-8901",
    macAddress: "00:1D:7E:2F:90:AB",
    ip: "192.168.1.3",
    userAgent: "Mozilla/5.0",
    role: "user",
  },
  {
    id: 4,
    firstName: "Linda",
    lastName: "Nguyen",
    maidenName: "Tran",
    age: 55,
    gender: "female",
    email: "linda.nguyen@example.com",
    phone: "321987654",
    birthDate: "1969-11-02",
    image: "https://example.com/linda.jpg",
    height: 158,
    weight: 60,
    university: "Pacific University",
    username: "lindanguyen",
    password: "lindaPW123",
    eyeColor: "hazel",
    hair: {
      color: "gray",
      type: "straight",
    },
    address: {
      address: "321 Ocean Blvd",
      city: "San Diego",
      state: "CA",
      stateCode: "CA",
      postalCode: "92101",
      coordinates: {
        lat: 32.7157,
        lng: -117.1611,
      },
    },
    bank: {
      cardExpire: "04/27",
      cardNumber: "6543-2109-8765-4321",
      cardType: "Discover",
      currency: "USD",
      iban: "US54321098765432109876",
    },
    company: {
      name: "HealthFirst",
      department: "Wellness",
      title: "Coordinator",
      address: {
        address: "999 Wellness Way",
        city: "San Diego",
        state: "CA",
        stateCode: "CA",
        postalCode: "92101",
        coordinates: {
          lat: 32.7157,
          lng: -117.1611,
        },
      },
    },
    crypto: {
      coin: "Ripple",
      wallet: "rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv",
      network: "XRP",
    },
    bloodGroup: "O-",
    ein: "67-8901234",
    ssn: "456-78-9012",
    macAddress: "00:1E:8D:3C:AB:CD",
    ip: "192.168.1.4",
    userAgent: "Mozilla/5.0",
    role: "moderator",
  },
];
