import * as migration_20260517_153526_20250517_initial from './20260517_153526_20250517_initial';

export const migrations = [
  {
    up: migration_20260517_153526_20250517_initial.up,
    down: migration_20260517_153526_20250517_initial.down,
    name: '20260517_153526_20250517_initial'
  },
];
