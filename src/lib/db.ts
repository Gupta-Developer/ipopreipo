import { Pool } from "@neondatabase/serverless";

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
});

let isInitialized = false;

export async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }
  if (isInitialized) return;
  
  try {
    console.log("Initializing database tables...");
    // Create users table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'USER',
        password VARCHAR(255) NOT NULL,
        picture VARCHAR(1000),
        assigned_countries TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create payment_apps table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS payment_apps (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        rating DECIMAL(3, 2) NOT NULL DEFAULT 4.0,
        active_users VARCHAR(255) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        country VARCHAR(255) NOT NULL,
        country_slug VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        logo_color VARCHAR(50) NOT NULL DEFAULT '#6366f1',
        logo_letter VARCHAR(10) NOT NULL,
        summary TEXT NOT NULL,
        features JSONB NOT NULL,
        charges JSONB NOT NULL,
        limits JSONB NOT NULL,
        platforms TEXT[] NOT NULL,
        pros TEXT[] NOT NULL,
        cons TEXT[] NOT NULL,
        category_ratings JSONB NOT NULL,
        detailed_review JSONB NOT NULL,
        detailed_article JSONB DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        added_by VARCHAR(255) NOT NULL DEFAULT 'seed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create banks table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS banks (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        rating DECIMAL(3, 2) NOT NULL DEFAULT 4.0,
        active_users VARCHAR(255) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        country VARCHAR(255) NOT NULL,
        country_slug VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        logo_color VARCHAR(50) NOT NULL DEFAULT '#6366f1',
        logo_letter VARCHAR(10) NOT NULL,
        summary TEXT NOT NULL,
        features JSONB NOT NULL,
        charges JSONB NOT NULL,
        interest_rate VARCHAR(255) NOT NULL,
        platforms TEXT[] NOT NULL,
        pros TEXT[] NOT NULL,
        cons TEXT[] NOT NULL,
        category_ratings JSONB NOT NULL,
        detailed_review JSONB NOT NULL,
        detailed_article JSONB DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        added_by VARCHAR(255) NOT NULL DEFAULT 'seed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create brokers table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS brokers (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        country VARCHAR(50) NOT NULL,
        country_name VARCHAR(255) NOT NULL,
        rating DECIMAL(3, 2) NOT NULL DEFAULT 4.0,
        type VARCHAR(255) NOT NULL,
        depository VARCHAR(255) NOT NULL,
        active_clients VARCHAR(255) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        summary TEXT NOT NULL,
        logo_color VARCHAR(50) NOT NULL DEFAULT '#6366f1',
        logo_letter VARCHAR(10) NOT NULL,
        segments JSONB NOT NULL,
        charges JSONB NOT NULL,
        brokerage JSONB NOT NULL,
        margins JSONB NOT NULL,
        platforms TEXT[] NOT NULL,
        pros TEXT[] NOT NULL,
        cons TEXT[] NOT NULL,
        additional_features JSONB NOT NULL,
        other_investments JSONB NOT NULL,
        category_ratings JSONB NOT NULL,
        detailed_reviews JSONB NOT NULL,
        taxes JSONB NOT NULL,
        detailed_article JSONB DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        added_by VARCHAR(255) NOT NULL DEFAULT 'seed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create credit_cards table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS credit_cards (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        overall_rating DECIMAL(3, 2) NOT NULL DEFAULT 4.0,
        type VARCHAR(255) NOT NULL,
        best_for VARCHAR(255) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        issuer_code VARCHAR(50) NOT NULL,
        network VARCHAR(100) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        description TEXT NOT NULL,
        features_checklist JSONB NOT NULL,
        perks JSONB NOT NULL,
        fees JSONB NOT NULL,
        late_payment_charges JSONB NOT NULL,
        pros TEXT[] NOT NULL,
        cons TEXT[] NOT NULL,
        ratings_breakdown JSONB NOT NULL,
        review_title VARCHAR(255) NOT NULL,
        review_content TEXT NOT NULL,
        review_overview_table JSONB NOT NULL,
        country VARCHAR(255) NOT NULL,
        detailed_article JSONB DEFAULT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        added_by VARCHAR(255) NOT NULL DEFAULT 'seed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create crypto_apps table
    await dbPool.query(`
      CREATE TABLE IF NOT EXISTS crypto_apps (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        rating DECIMAL(3, 2) NOT NULL DEFAULT 4.0,
        active_users VARCHAR(255) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
        country VARCHAR(255) NOT NULL,
        country_slug VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        logo_color VARCHAR(50) NOT NULL DEFAULT '#6366f1',
        logo_letter VARCHAR(10) NOT NULL,
        summary TEXT NOT NULL,
        features JSONB NOT NULL,
        charges JSONB NOT NULL,
        limits JSONB NOT NULL,
        platforms TEXT[] NOT NULL,
        pros TEXT[] NOT NULL,
        cons TEXT[] NOT NULL,
        category_ratings JSONB NOT NULL,
        detailed_review JSONB NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        added_by VARCHAR(255) NOT NULL DEFAULT 'seed',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure picture and assigned_countries columns exist if table was already created earlier
    await dbPool.query(`
      ALTER TABLE users ADD COLUMN IF NOT EXISTS picture VARCHAR(1000);
      ALTER TABLE users ADD COLUMN IF NOT EXISTS assigned_countries TEXT;
    `);

    // Seed default users if they don't exist
    const checkUsers = await dbPool.query("SELECT COUNT(*) FROM users;");
    if (parseInt(checkUsers.rows[0].count) === 0) {
      console.log("Seeding default user accounts...");
      await dbPool.query(`
        INSERT INTO users (email, name, role, password) VALUES
        ('mayank@ipopreipo.com', 'Mayank Patel', 'PRO', 'password123'),
        ('admin@ipopreipo.com', 'System Admin', 'ADMIN', 'password123'),
        ('author@ipopreipo.com', 'Regional Editor', 'AUTHOR', 'password123');
      `);
      console.log("Default users seeded successfully.");
    }

    // Seed default payment apps if they don't exist
    const checkPaymentApps = await dbPool.query("SELECT COUNT(*) FROM payment_apps;");
    if (parseInt(checkPaymentApps.rows[0].count) === 0) {
      console.log("Seeding default payment apps...");
      const { PAYMENT_APPS_DATA } = require("../data/paymentAppsData");
      for (const app of PAYMENT_APPS_DATA) {
        await dbPool.query(
          `INSERT INTO payment_apps (
            slug, name, rating, active_users, likes, country, country_slug, type,
            logo_color, logo_letter, summary, features, charges, limits,
            platforms, pros, cons, category_ratings, detailed_review, detailed_article, status, added_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
          [
            app.slug,
            app.name,
            app.rating,
            app.activeUsers,
            app.likes,
            app.country,
            app.countrySlug,
            app.type,
            app.logoColor,
            app.logoLetter,
            app.summary,
            JSON.stringify(app.features),
            JSON.stringify(app.charges),
            JSON.stringify(app.limits),
            app.platforms,
            app.pros,
            app.cons,
            JSON.stringify(app.categoryRatings),
            JSON.stringify(app.detailedReview),
            app.detailedArticle ? JSON.stringify(app.detailedArticle) : null,
            "approved",
            "seed@ipopreipo.com",
          ]
        );
      }
      console.log("Default payment apps seeded successfully.");
    }

    // Seed default banks if they don't exist
    const checkBanks = await dbPool.query("SELECT COUNT(*) FROM banks;");
    if (parseInt(checkBanks.rows[0].count) === 0) {
      console.log("Seeding default banks...");
      const { BANKS_DATA } = require("../data/banksData");
      for (const bank of BANKS_DATA) {
        await dbPool.query(
          `INSERT INTO banks (
            slug, name, rating, active_users, likes, country, country_slug, type,
            logo_color, logo_letter, summary, features, charges, interest_rate,
            platforms, pros, cons, category_ratings, detailed_review, status, added_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
          [
            bank.slug,
            bank.name,
            bank.rating,
            bank.activeUsers,
            bank.likes,
            bank.country,
            bank.countrySlug,
            bank.type,
            bank.logoColor,
            bank.logoLetter,
            bank.summary,
            JSON.stringify(bank.features),
            JSON.stringify(bank.charges),
            bank.interestRate,
            bank.platforms,
            bank.pros,
            bank.cons,
            JSON.stringify(bank.categoryRatings),
            JSON.stringify(bank.detailedReview),
            "approved",
            "seed@ipopreipo.com"
          ]
        );
      }
      console.log("Default banks seeded successfully.");
    }

    // Seed default brokers if they don't exist
    const checkBrokers = await dbPool.query("SELECT COUNT(*) FROM brokers;");
    if (parseInt(checkBrokers.rows[0].count) === 0) {
      console.log("Seeding default brokers...");
      const { BROKERS_DATA } = require("../data/brokersData");
      for (const broker of BROKERS_DATA) {
        await dbPool.query(
          `INSERT INTO brokers (
            slug, name, country, country_name, rating, type, depository, active_clients,
            likes, summary, logo_color, logo_letter, segments, charges, brokerage, margins,
            platforms, pros, cons, additional_features, other_investments, category_ratings,
            detailed_reviews, taxes, detailed_article, status, added_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)`,
          [
            broker.slug,
            broker.name,
            broker.country,
            broker.countryName,
            broker.rating,
            broker.type,
            broker.depository,
            broker.activeClients,
            broker.likes,
            broker.summary,
            broker.logoColor,
            broker.logoLetter,
            JSON.stringify(broker.segments),
            JSON.stringify(broker.charges),
            JSON.stringify(broker.brokerage),
            JSON.stringify(broker.margins),
            broker.platforms,
            broker.pros,
            broker.cons,
            JSON.stringify(broker.additionalFeatures),
            JSON.stringify(broker.otherInvestments),
            JSON.stringify(broker.categoryRatings),
            JSON.stringify(broker.detailedReviews),
            JSON.stringify(broker.taxes),
            broker.detailedArticle ? JSON.stringify(broker.detailedArticle) : null,
            "approved",
            "seed@ipopreipo.com"
          ]
        );
      }
      console.log("Default brokers seeded successfully.");
    }

    // Seed default credit cards if they don't exist
    const checkCards = await dbPool.query("SELECT COUNT(*) FROM credit_cards;");
    if (parseInt(checkCards.rows[0].count) === 0) {
      console.log("Seeding default credit cards...");
      const { CREDIT_CARDS_CATALOG } = require("../data/cardsData");
      for (const card of CREDIT_CARDS_CATALOG) {
        await dbPool.query(
          `INSERT INTO credit_cards (
            slug, name, overall_rating, type, best_for, issuer, issuer_code, network,
            likes, description, features_checklist, perks, fees, late_payment_charges,
            pros, cons, ratings_breakdown, review_title, review_content, review_overview_table,
            country, detailed_article, status, added_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)`,
          [
            card.slug,
            card.name,
            card.overallRating,
            card.type,
            card.bestFor,
            card.issuer,
            card.issuerCode,
            card.network,
            card.likes,
            card.description,
            JSON.stringify(card.featuresChecklist),
            JSON.stringify(card.perks),
            JSON.stringify(card.fees),
            JSON.stringify(card.latePaymentCharges),
            card.pros,
            card.cons,
            JSON.stringify(card.ratingsBreakdown),
            card.reviewTitle,
            card.reviewContent,
            JSON.stringify(card.reviewOverviewTable),
            card.country,
            card.detailedArticle ? JSON.stringify(card.detailedArticle) : null,
            "approved",
            "seed@ipopreipo.com"
          ]
        );
      }
      console.log("Default credit cards seeded successfully.");
    }

    // Seed default crypto apps if they don't exist
    const checkCrypto = await dbPool.query("SELECT COUNT(*) FROM crypto_apps;");
    if (parseInt(checkCrypto.rows[0].count) === 0) {
      console.log("Seeding default crypto apps...");
      const { CRYPTO_APPS_DATA } = require("../data/cryptoAppsData");
      for (const app of CRYPTO_APPS_DATA) {
        await dbPool.query(
          `INSERT INTO crypto_apps (
            slug, name, rating, active_users, likes, country, country_slug, type,
            logo_color, logo_letter, summary, features, charges, limits,
            platforms, pros, cons, category_ratings, detailed_review, status, added_by
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`,
          [
            app.slug,
            app.name,
            app.rating,
            app.activeUsers,
            app.likes,
            app.country,
            app.countrySlug,
            app.type,
            app.logoColor,
            app.logoLetter,
            app.summary,
            JSON.stringify(app.features),
            JSON.stringify(app.charges),
            JSON.stringify(app.limits),
            app.platforms,
            app.pros,
            app.cons,
            JSON.stringify(app.categoryRatings),
            JSON.stringify(app.detailedReview),
            "approved",
            "seed@ipopreipo.com"
          ]
        );
      }
      console.log("Default crypto apps seeded successfully.");
    }

    isInitialized = true;
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

/**
 * Execute a raw SQL query on the database.
 * @param query The SQL query string
 * @param params Optional array of parameter values
 */
export async function query(queryText: string, params?: any[]) {
  // Ensure tables exist before running query
  await initDatabase();

  const start = Date.now();
  const res = await dbPool.query(queryText, params);
  const duration = Date.now() - start;
  console.log("Executed Query:", { queryText, durationMs: duration, rowsCount: res.rowCount });
  return res;
}

