export const up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    first_name: {
      type: 'varchar(100)',
      notNull: true,
    },
    last_name: {
      type: 'varchar(100)',
      notNull: true,
    },
    email: {
      type: 'varchar(100)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'varchar(100)',
      notNull: true,
    },
    age: {
      type: 'integer',
      notNull: true,
      default: 0,
    },
    isVerified: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
    security_stamp: {
      type: 'varchar(100)',
      notNull: true,
      default: '',
    },
    role_id: {
      type: 'integer',
      notNull: true,
      references: 'roles(id)',
      onDelete: 'CASCADE',
    },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  });
};

export const down = (pgm) => {
  pgm.dropTable('users');
};
