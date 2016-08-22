'use strict';

const Schema = use('Schema');

class IngredientSchema extends Schema {

  up() {
    this.create('ingredients', (table) => {
      table.increments();
      table.string('name', 100);
      table.timestamps();
    });
  }

  down() {
    this.drop('ingredients');
  }

}

module.exports = IngredientSchema;