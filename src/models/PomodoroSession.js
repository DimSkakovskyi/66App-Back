import { Model } from 'objection';
import User from './User.js';

class PomodoroSession extends Model {
  static get tableName() {
    return 'pomodoro_sessions';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'pomodoro_sessions.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

export default PomodoroSession;