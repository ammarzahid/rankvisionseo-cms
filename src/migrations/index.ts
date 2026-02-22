import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260222_170802_add_site_content_global from './20260222_170802_add_site_content_global';
import * as migration_20260222_181013_improve_site_content_editor_v2 from './20260222_181013_improve_site_content_editor_v2';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260222_170802_add_site_content_global.up,
    down: migration_20260222_170802_add_site_content_global.down,
    name: '20260222_170802_add_site_content_global',
  },
  {
    up: migration_20260222_181013_improve_site_content_editor_v2.up,
    down: migration_20260222_181013_improve_site_content_editor_v2.down,
    name: '20260222_181013_improve_site_content_editor_v2'
  },
];
