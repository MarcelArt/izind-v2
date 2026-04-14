import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, boolean, index, serial, pgEnum, integer } from 'drizzle-orm/pg-core';

// ==================== Start of better-auth ====================
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text('username').unique(),
  displayUsername: text('display_username'),
});

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)]
);

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  profiles: many(profiles),
}));


export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
// ==================== End of better-auth ====================

const baseSchema = {
  id: serial('id').primaryKey(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
};

export const Genders = ['L', 'P'] as const;
export const genders = pgEnum('genders', Genders);

export const BloodTypes = ['A', 'B', 'AB', 'O'] as const;
export const bloodTypes = pgEnum('blood_types', BloodTypes);

export const profiles = pgTable(
  'profiles',
  {
    ...baseSchema,
    nik: text('nik').notNull(),
    name: text('name').notNull(),
    placeOfBirth: text('place_of_birth').notNull(),
    dateOfBirth: timestamp('date_of_birth'),
    gender: genders('gender'), // 'L' | 'P'
    address: text('address').notNull(),
    rt: text('rt').notNull(),
    rw: text('rw').notNull(),
    village: text('village').notNull(),
    district: text('district').notNull(),
    city: text('city').notNull(),
    religion: text('religion').notNull(),
    maritalStatus: text('marital_status').notNull(),
    job: text('job').notNull(),
    nationality: text('nationality').notNull(),
    bloodType: bloodTypes('blood_type'), // 'A' | 'B' | 'AB' | 'O'
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('profile_userId_idx').on(table.userId)]
); 
export const profileRelations = relations(profiles, ({ one }) => ({
  user: one(user, {
    fields: [profiles.userId],
    references: [user.id],
  }),
}));

export const documents = pgTable(
  'documents',
  {
    ...baseSchema,
    filename: text('filename').notNull(),
    path: text('path').notNull(),
    type: text('type').notNull(),
    tags: text('tags').array(),
    profileId: integer('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  },
  (table) => [index('document_profileId_idx').on(table.profileId)],
);
export const documentRelations = relations(documents, ({ one }) => ({
  profile: one(profiles, {
    fields: [documents.profileId],
    references: [profiles.id],
  }),
}));

export const educations = pgTable(
  'educations',
  {
    ...baseSchema,
    school: text('school').notNull(),
    degree: text('degree').notNull(),
    fieldOfStudy: text('field_of_study').notNull(),
    startDate: timestamp('start_date').notNull(),
    endDate: timestamp('end_date'),
    grade: text('grade'),
    maxGrade: text('max_grade'),
    description: text('description'),
    documentId: integer('document_id').notNull().references(() => documents.id, { onDelete: 'cascade' }),
    profileId: integer('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  }
);
export const educationRelations = relations(educations, ({ one }) => ({
  document: one(documents, {
    fields: [educations.documentId],
    references: [documents.id],
  }),
  profile: one(profiles, {
    fields: [educations.profileId],
    references: [profiles.id],
  }),
}));