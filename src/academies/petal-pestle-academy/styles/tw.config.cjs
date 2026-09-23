const _m = require('<PETAL-PESTLE-APP>/tailwind.config.js'); const base = _m.default || _m;
module.exports = {
  ...base,
  // Only this school's own screens that came from the standalone app.
  content: ['<THIS-FOLDER>/components/**/*.{js,jsx}', '<THIS-FOLDER>/screens/HerSchool/**/*.{js,jsx}', '<THIS-FOLDER>/data/**/*.{js,jsx}', '<THIS-FOLDER>/config/**/*.{js,jsx}'],
  // Scoped: every rule applies only inside <div class="pp-app">, so nothing
  // here can restyle a platform screen, even in this school.
  important: '.pp-app',
  corePlugins: { ...(base.corePlugins || {}), preflight: false }
};
