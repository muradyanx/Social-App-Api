export const up = (pgm) => {
  pgm.createTable('friend_requests', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    sender_id: {
      type: 'integer',
      references: 'users(id)',
      notNull: true,
    },
    receiver_id: {
      type: 'integer',
      references: 'users(id)',
      notNull: true,
    },
    status: {
      type: 'varchar(100)',
      default: 'pending',
    },
    sent_at: {
      type: 'timestamp',
      default: pgm.func('current_timestamp'),
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('friend_requests');
};
