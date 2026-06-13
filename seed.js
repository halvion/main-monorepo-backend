require('dotenv').config();
const { Pool } = require('pg');
const { crypto } = require('crypto');

// Generate v4 UUID
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_VENUE_URL,
});

async function main() {
  console.log('Seeding VENUE database via raw SQL...');

  const ownerId = 'a531e21b-cfc0-4357-897b-99d7a228fb56';

  const venues = [
    {
      name: 'Halvion Futsal Center',
      description: 'Premium vinyl futsal court with complete amenities and spectating area.',
      address: '789 Arena Blvd, Sports City',
      metadata: {
        type: 'futsal',
        surfaceType: 'vinyl',
        isIndoor: true,
        capacity: 10,
        amenities: JSON.stringify(['parking', 'toilet', 'shower', 'canteen']),
        openTime: '08:00',
        closeTime: '22:00',
        pricePerHour: 50000.00,
      },
    },
    {
      name: 'Golden Shuttle Badminton Arena',
      description: 'International standard wooden courts for professional and casual players.',
      address: '456 Court Lane, Racket District',
      metadata: {
        type: 'badminton',
        surfaceType: 'wooden',
        isIndoor: true,
        capacity: 4,
        amenities: JSON.stringify(['parking', 'toilet', 'changing_room']),
        openTime: '08:00',
        closeTime: '22:00',
        pricePerHour: 15000.00,
      },
    },
    {
      name: 'Downtown Basketball Court',
      description: 'Outdoor concrete basketball court with standard hoops.',
      address: '101 Street Court, City Park',
      metadata: {
        type: 'basketball',
        surfaceType: 'concrete',
        isIndoor: false,
        capacity: 10,
        amenities: JSON.stringify(['toilet']),
        openTime: '10:00',
        closeTime: '22:00',
        pricePerHour: 30000.00,
      },
    },
  ];

  for (const venue of venues) {
    // Check if facility exists
    const facilityCheck = await pool.query('SELECT id FROM facilities WHERE name = $1', [venue.name]);
    let facilityId;

    if (facilityCheck.rows.length === 0) {
      facilityId = uuidv4();
      const now = new Date();
      // Insert facility
      await pool.query(
        `INSERT INTO facilities (id, "ownerId", name, description, address, "isActive", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [facilityId, ownerId, venue.name, venue.description, venue.address, true, now, now]
      );

      // Insert metadata
      const metadataId = uuidv4();
      await pool.query(
        `INSERT INTO facility_metadata (id, "facilityId", type, "surfaceType", "isIndoor", capacity, amenities, "openTime", "closeTime", "pricePerHour")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          metadataId,
          facilityId,
          venue.metadata.type,
          venue.metadata.surfaceType,
          venue.metadata.isIndoor,
          venue.metadata.capacity,
          venue.metadata.amenities,
          venue.metadata.openTime,
          venue.metadata.closeTime,
          venue.metadata.pricePerHour,
        ]
      );
      console.log(`Created facility: ${venue.name} (${facilityId})`);
    } else {
      facilityId = facilityCheck.rows[0].id;
      console.log(`Facility ${venue.name} already exists, skipping creation.`);
    }

    // Seed operating slots for next 30 days
    const openHour = parseInt(venue.metadata.openTime.split(':')[0], 10);
    const closeHour = parseInt(venue.metadata.closeTime.split(':')[0], 10);

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    console.log(`Generating slots for ${venue.name}...`);
    let slotsAdded = 0;

    for (let day = 0; day < 30; day++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + day);

      for (let hour = openHour; hour < closeHour; hour++) {
        const startStr = `${hour.toString().padStart(2, '0')}:00`;
        const endStr = `${(hour + 1).toString().padStart(2, '0')}:00`;

        try {
          await pool.query(
            `INSERT INTO operating_slots (id, "facilityId", "slotDate", "startTime", "endTime", "isAvailable", "createdAt")
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT ("facilityId", "slotDate", "startTime") DO NOTHING`,
            [uuidv4(), facilityId, currentDate, startStr, endStr, true, new Date()]
          );
          slotsAdded++;
        } catch (err) {
          // Ignore duplicates or issues
        }
      }
    }
    console.log(`Slots seeding for ${venue.name} completed (${slotsAdded} slots query executed).`);
  }

  console.log('VENUE database seeded successfully via raw SQL.');
}

main()
  .catch((e) => console.error(e))
  .finally(() => pool.end());
