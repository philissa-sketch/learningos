herApp.css is GENERATED from her standalone app's design settings.

When a screen copied from the standalone app uses a colour or class herApp.css
does not have yet, regenerate it:

  1. In styles/tw.config.cjs replace <PETAL-PESTLE-APP> with the standalone
     app's folder and <THIS-FOLDER> with this academy folder.
  2. From the standalone app's folder run:
       node node_modules/tailwindcss/lib/cli.js -c <THIS-FOLDER>/styles/tw.config.cjs
            -i <THIS-FOLDER>/styles/herApp.source.css.txt -o out.css
  3. Prefix the unscoped component classes (.panel, .panel-white, .container,
     .label-caps) with ".pp-app ", keep the header and the print block, and
     replace herApp.css.

Every rule must start ".pp-app" so nothing restyles a platform screen.
