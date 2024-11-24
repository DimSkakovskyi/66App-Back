import { Model } from 'objection';
import User from './User.js';
import HabitProgress from './HabitProgress.js';

class Habit extends Model {
  static get tableName() {
    return 'habits';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'habits.user_id',
          to: 'users.id',
        },
      },
      habitProgress: {
        relation: Model.HasManyRelation,
        modelClass: HabitProgress,
        join: {
          from: 'habits.id',
          to: 'habit_progress.habit_id',
        },
      },
    };
  }
}

export default Habit;