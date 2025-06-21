export const up = (pgm) => {
  pgm.createTable('friends', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'integer',
      notNull: true,
    },
    friend_id: {
      type: 'integer',
      notNull: true,
    },
    added_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    }
  });
};

export const down = (pgm) => {
  pgm.dropTable('friends');
};
