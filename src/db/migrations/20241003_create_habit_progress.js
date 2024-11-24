/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();      // ID (auto)
        table.string('username').notNullable();  // username
        table.string('email').notNullable().unique(); // email
        table.string('password').notNullable();  // password
        table.timestamps(true, true); // created at, updated at
      });
    await knex.schema.createTable('habits', (table) => {
        table.increments('id').primary(); // habit ID
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE'); // foreign key to users, deletes habit if user is deleted
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.enu('status', ['active', 'paused', 'completed']).notNullable(); // habit status, limited to 'active', 'paused', or 'completed'
        table.integer('current_streak').notNullable().defaultTo(0); 
        table.integer('max_streak').notNullable().defaultTo(0); 
        table.timestamps(true, true); // created at, updated at
      });
    await knex.schema.createTable('habit_progress', (table) => {
        table.increments('id').primary(); // auto ID
        table.integer('habit_id').unsigned().references('id').inTable('habits').onDelete('CASCADE'); // // foreign key to users, deletes task if user is deleted
        table.date('progress_date').notNullable(); // date when progress was recorded
        table.boolean('status').notNullable(); // status of the habit on that day (true if completed, false otherwise)
        table.timestamps(true, true); // created_at and updated_at
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable('users');
    await knex.schema.dropTable('habit_progress'); // drop users table if rollback
};
