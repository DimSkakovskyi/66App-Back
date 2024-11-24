import { Model } from 'objection';
import Habit from './Habit.js';

class HabitProgress extends Model {
  static get tableName() {
    return 'habit_progress';
  }

  static get relationMappings() {
    return {
      habit: {
        relation: Model.BelongsToOneRelation,
        modelClass: Habit,
        join: {
          from: 'habit_progress.habit_id',
          to: 'habits.id',
        },
      },
    };
  }
}

export default HabitProgress;