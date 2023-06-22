/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.createTable("cars", (t) => {
    t.increments();
    t.string("vin").notNullable().unique();
    t.string("make").notNullable();
    t.string("model").notNullable();
    t.integer("mileage").notNullable();
    t.string("title");
    t.string("transmission");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  // SİHRİNİZİ GÖSTERİN
  return knex.schema.dropTableIfExists("cars");
};
