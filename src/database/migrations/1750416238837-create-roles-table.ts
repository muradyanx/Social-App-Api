export const up = (pgm) => {
  pgm.createTable('roles', {
    id: {
      type: 'serial',
      primaryKey: true,
      notNull: true,
    },
    role_name: {
      type: 'varchar(100)',
      notNull: true,
    },
  });
};

export const down = (pgm) => {
  pgm.dropTable('roles');
};
