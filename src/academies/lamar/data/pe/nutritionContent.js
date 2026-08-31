/**
 * PE & Nutrition — Nutrition Content
 *
 * Covers every topic listed in PROJECT_PLAN.md Part 4's Nutrition
 * section: macronutrients, protein, healthy fats, carbohydrates,
 * hydration, meal planning, reading nutrition labels, healthy snacks,
 * cooking basics, recovery nutrition, muscle-building nutrition, and
 * healthy weight gain — plus a real recipe library, real shopping
 * lists, and nutrition challenges.
 *
 * HARD FRAMING REQUIREMENT (not optional): Lamar, the real student
 * this app is built for, is a real 12-year-old currently underweight
 * for his age/height and working toward healthy weight and muscle
 * gain. Every topic below is written around strength, energy, growth,
 * and function — never appearance, never restriction, never diet-
 * culture language. No calorie-counting, no "before/after," no body
 * comparison of any kind.
 *
 * NUMERIC GROUNDING — every specific numeric target below traces to
 * one of these two verified sources, and nowhere in this file does a
 * number appear without the required caveat that it's a general
 * population guideline, not personalized medical advice:
 *   - USDA Dietary Guidelines for Americans 2020-2025: ages 9-13 need
 *     approximately 34 grams of protein per day (about a 5-ounce
 *     equivalent) as a general population baseline.
 *   - American Academy of Pediatrics: ages 9-13 should drink roughly
 *     up to 24 fluid ounces of plain water per day as a baseline, on
 *     TOP OF fluids from food/milk/other beverages, with more needed
 *     depending on body size, activity level, and heat.
 * This app is not a substitute for medical guidance and does not
 * present itself as one — every section that touches weight gain or
 * an individualized target says so explicitly.
 */

const MEDICAL_CAVEAT =
  'This is a general population guideline, not personalized medical advice. Lamar\'s real, individual target — especially for healthy weight gain or athletic performance — should come from his actual pediatrician or a registered dietitian, not this app.';

export const nutritionTopics = [
  {
    id: 'macronutrients',
    title: 'The Big Three: Macronutrients',
    summary:
      'Macronutrients are the three nutrients your body needs in large amounts for energy and growth: carbohydrates, protein, and fat. Every food is really a mix of these three (plus water, vitamins, and minerals).',
    body: [
      'Think of macronutrients as your body\'s three main fuel and building sources. Carbohydrates are your body\'s preferred quick-energy source — they power your brain and your muscles during exercise. Protein is your body\'s building material — it repairs and builds muscle, skin, and other tissue, which matters a lot for a growing 12-year-old who is also strength training. Fat supports hormone production, protects your organs, helps your body absorb certain vitamins, and provides longer-lasting energy.',
      'None of the three is "bad." A healthy plate usually has some of all three — for example, chicken and rice and broccoli with a little olive oil gives you protein (chicken), carbs (rice), fat (olive oil), plus vitamins and fiber (broccoli).',
      'For someone actively training and working on healthy weight gain, all three macronutrients matter — carbs to fuel workouts, protein to help build muscle, and healthy fats for hormones and overall energy. Cutting any of the three out isn\'t a healthy approach at any age.'
    ]
  },
  {
    id: 'protein',
    title: 'Protein — Building and Repairing Muscle',
    summary:
      'Protein is the nutrient your muscles use to repair and rebuild after exercise, which is a big part of why it matters for someone doing regular strength training.',
    body: [
      'When you do strength exercises like push-ups or squats, you create tiny amounts of stress in your muscle fibers. Protein gives your body the raw material to repair and rebuild those fibers a little stronger than before — that\'s the real, physical process behind getting stronger over time.',
      'Good protein sources include chicken, turkey, fish, eggs, beans, lentils, Greek yogurt, cottage cheese, milk, tofu, nuts, and nut butters. Spreading protein across meals and snacks throughout the day (rather than eating it all in one meal) is a simple, real habit that helps your body use it well.',
      `As a general population baseline, the USDA Dietary Guidelines for Americans list about 34 grams of protein per day for kids ages 9-13 (roughly a 5-ounce equivalent spread across the day). ${MEDICAL_CAVEAT} Someone actively strength training and working toward healthy muscle gain may benefit from more than that baseline, but the right specific number for Lamar should come from his pediatrician or a registered dietitian, not a guess in this app.`
    ]
  },
  {
    id: 'healthy-fats',
    title: 'Healthy Fats',
    summary:
      'Fat isn\'t the enemy — the right fats support brain function, hormone health, and long-lasting energy.',
    body: [
      'Healthy fats come from foods like avocado, olive oil, nuts, seeds, nut butters, and fatty fish like salmon. These support brain development, help your body absorb vitamins A, D, E, and K, and provide a steady, slow-burning source of energy.',
      'Fats to eat less often are the heavily processed kinds found in a lot of fried food and packaged snacks — not because fat itself is bad, but because whole-food fat sources come packaged with other real nutrients too.',
      'A simple real-world habit: add a spoonful of nut butter to a snack, a drizzle of olive oil to vegetables, or a handful of nuts alongside fruit — small, easy additions rather than an overhaul.'
    ]
  },
  {
    id: 'carbohydrates',
    title: 'Carbohydrates — Your Body\'s Main Fuel',
    summary:
      'Carbs are the fuel your muscles and brain reach for first, especially during exercise — this matters directly on workout days.',
    body: [
      'Whole-food carbohydrate sources — whole grains, fruit, vegetables, oats, brown rice, potatoes, whole-wheat bread — come packaged with fiber, vitamins, and minerals your body uses well. These are the best everyday choices.',
      'Refined carbs (candy, soda, white bread, sugary cereal) give quick energy but not much else, and eating mostly these instead of whole-food carbs can leave you feeling more tired later, not more energized.',
      'On workout days — especially before Monday/Tuesday/Friday strength days or a Saturday sports day — eating a real carb source (like oatmeal, toast, or fruit) an hour or two before exercising gives your muscles fuel to actually work with.'
    ]
  },
  {
    id: 'hydration',
    title: 'Hydration',
    summary:
      'Water keeps every system in your body working — including your muscles, your focus, and your energy level during a workout.',
    body: [
      'Being even a little dehydrated can make workouts feel harder than they should and can affect focus and mood. Drinking water throughout the day (not just when you feel thirsty) is the simplest habit that helps.',
      `As a general population baseline, the American Academy of Pediatrics suggests kids ages 9-13 drink roughly up to 24 fluid ounces of plain water per day — and that's on TOP of fluids already coming from food, milk, and other drinks, not the only source of hydration in a day. ${MEDICAL_CAVEAT} More water is typically needed on hot days or heavier activity days (like a long Saturday outdoor session), and the right amount for Lamar specifically is a conversation for his pediatrician, not a fixed number here.`,
      'A simple habit: drink a glass of water with each meal, plus water before, during, and after workouts.'
    ]
  },
  {
    id: 'meal-planning',
    title: 'Meal Planning Basics',
    summary:
      'A little planning ahead makes it much easier to actually eat well through a busy week of school and workouts.',
    body: [
      'A simple weekly meal plan just means roughly deciding, ahead of time, what breakfast/lunch/dinner will be most days — it doesn\'t need to be complicated or exact.',
      'A useful way to build a balanced plate: fill about half with vegetables/fruit, a quarter with a protein source, and a quarter with a whole-grain or starchy carb, plus a source of healthy fat somewhere in the meal.',
      'Planning around the week\'s workout schedule helps too — eating a real meal or snack with carbs and protein a couple hours before a strength day, and a protein-containing snack after, supports both the workout and the recovery from it.'
    ]
  },
  {
    id: 'reading-labels',
    title: 'Reading Nutrition Labels',
    summary:
      'Nutrition labels tell you exactly what\'s in packaged food — learning to read one is a real, useful life skill.',
    body: [
      'Start at the top: "Serving Size" and "Servings Per Container" tell you what the rest of the label is actually measuring — a lot of packages contain more than one serving, so the numbers below apply per serving, not necessarily the whole package.',
      'Check the protein line to see how much a food actually contributes toward the day\'s protein.',
      'Look at "Added Sugars" specifically (a separate line from total sugar on modern labels) — this tells you how much sugar was added during processing versus occurring naturally (like in fruit or plain milk).',
      'Check the ingredients list too, not just the nutrition facts box — ingredients are listed in order from most to least by weight, so the first few ingredients make up most of the food.'
    ]
  },
  {
    id: 'healthy-snacks',
    title: 'Healthy Snacks',
    summary:
      'Good snacks refuel you between meals and workouts — protein + carb combos work especially well.',
    body: [
      'Real, easy snack ideas: Greek yogurt with berries, apple slices with peanut butter, a handful of trail mix, whole-grain toast with almond butter and banana, hard-boiled eggs, cheese and whole-grain crackers, hummus with vegetables or pita, a protein smoothie with fruit and milk or yogurt.',
      'A snack that pairs a protein with a carb (like apple + peanut butter, or crackers + cheese) tends to be more filling and energizing than a carb alone.',
      'Timing matters too: a snack about 30-60 minutes before a workout gives you fuel to use; a snack with some protein within an hour or two after a workout supports the muscle-repair process protein is responsible for.'
    ]
  },
  {
    id: 'cooking-basics',
    title: 'Cooking Basics',
    summary:
      'Learning a handful of real, simple cooking skills builds independence and makes healthy eating easier for life, not just this year.',
    body: [
      'Kitchen safety first: always wash your hands before cooking, keep raw meat separate from other foods (different cutting board), wash produce, and always have an adult present for stovetop or oven use.',
      'Core skills worth practicing this year: cracking and scrambling eggs, measuring ingredients accurately, using a knife safely to slice soft foods (with supervision), following a recipe step-by-step in order, using a stovetop to sauté vegetables, and using an oven to bake or roast.',
      'Learning to read a recipe fully before starting (all ingredients, all steps) is its own real skill — it prevents getting halfway through and realizing something is missing.'
    ]
  },
  {
    id: 'recovery-nutrition',
    title: 'Recovery Nutrition',
    summary:
      'What you eat after a workout genuinely helps your body recover and adapt — this is where real strength gains actually happen.',
    body: [
      'The muscle-repair process protein is responsible for happens mostly in the hours after a workout, not during it — eating a real protein-containing meal or snack within a couple hours after a strength or cardio session gives your body the material to do that repair.',
      'Rehydrating after a workout matters just as much as eating — replacing the water lost through sweat helps every system recover, including muscles.',
      'Sleep is actually part of recovery nutrition too, in a sense — a lot of real muscle repair and growth hormone release happens during deep sleep, which is exactly why this app tracks sleep alongside food and water.'
    ]
  },
  {
    id: 'muscle-building-nutrition',
    title: 'Muscle-Building Nutrition',
    summary:
      'Building muscle takes a real combination of consistent strength training, enough protein, and enough total food energy — no single food or supplement does it alone.',
    body: [
      'Muscle grows through a real, repeated cycle: strength training creates the stimulus, protein supplies the building material, and sleep plus rest days give your body time to actually do the rebuilding. Skipping any one of the three slows the other two down.',
      'Consistency matters more than intensity for a 12-year-old — showing up for the weekly workout plan week after week, all school year, builds real strength over time far more than occasional hard efforts.',
      `Protein spread across meals (see the Protein section for the general USDA baseline for ages 9-13) supports this process. ${MEDICAL_CAVEAT} Muscle-building supplements (protein powders marketed for serious athletes, creatine, etc.) are not appropriate to start without a real conversation with Lamar's pediatrician first — real food is the foundation at this age, not a supplement aisle.`
    ]
  },
  {
    id: 'healthy-weight-gain',
    title: 'Healthy Weight Gain',
    summary:
      'For someone working toward a healthier weight, the goal is steady, real nourishment and strength — never a number on a scale to obsess over.',
    body: [
      'Healthy weight gain comes from consistently eating enough real food — including regular meals, not skipping them, and adding nutrient-dense snacks between meals — combined with the strength training in this program that helps that extra fuel build real muscle instead of just being stored.',
      'Nutrient-dense, higher-calorie whole foods that support healthy weight gain include things like nut butters, avocado, whole milk or whole-milk yogurt, granola, olive oil, cheese, and hearty grain bowls — adding these into regular meals and snacks is a much better approach than eating a lot of low-nutrition food just to eat more.',
      `This app deliberately does not provide a specific calorie or weight target — that is a real medical decision that belongs with Lamar's pediatrician, who can track his actual growth curve over time. ${MEDICAL_CAVEAT} What this app CAN do is support the two things fully within its control: a real, full-year strength program, and real food education — both framed entirely around strength, energy, and health, never appearance.`
    ]
  }
];

export const recipeLibrary = [
  {
    id: 'recipe-scrambled-eggs-toast',
    title: 'Scrambled Eggs & Whole-Grain Toast',
    category: 'Breakfast',
    servings: 1,
    prepTime: '10 minutes',
    skillLevel: 'Beginner',
    ingredients: [
      '2 eggs',
      '1 tablespoon milk',
      'Pinch of salt and pepper',
      '1 teaspoon butter or oil',
      '1 slice whole-grain bread',
      'Optional: shredded cheese, sliced avocado'
    ],
    steps: [
      'Crack the eggs into a bowl, add the milk, salt, and pepper, and whisk with a fork until blended.',
      'Heat the butter or oil in a nonstick pan over medium-low heat (adult supervision at the stove).',
      'Pour in the eggs. Let them sit a few seconds, then gently push them from the edges toward the center with a spatula as they cook, repeating until softly set — this takes 2-4 minutes.',
      'Remove from heat while they still look slightly glossy — they keep cooking a bit off the heat.',
      'Toast the bread while the eggs cook. Serve together, with cheese or avocado if you like.'
    ],
    nutritionNote: 'A real protein-and-carb breakfast combo — a good example of pairing a protein source with a whole-food carb before a school or workout morning.'
  },
  {
    id: 'recipe-greek-yogurt-parfait',
    title: 'Greek Yogurt Parfait',
    category: 'Breakfast / Snack',
    servings: 1,
    prepTime: '5 minutes',
    skillLevel: 'Beginner',
    ingredients: [
      '1 cup plain or vanilla Greek yogurt',
      '1/2 cup berries (fresh or frozen, thawed)',
      '2 tablespoons granola',
      '1 teaspoon honey (optional)'
    ],
    steps: [
      'Spoon half the yogurt into a bowl or glass.',
      'Add a layer of berries and a sprinkle of granola.',
      'Add the rest of the yogurt, then top with the remaining berries and granola.',
      'Drizzle with honey if you\'d like it a little sweeter.'
    ],
    nutritionNote: 'Greek yogurt is a strong protein source for its size — a good option for a snack that also supports recovery after a workout.'
  },
  {
    id: 'recipe-chicken-rice-veggie-bowl',
    title: 'Chicken, Rice & Veggie Bowl',
    category: 'Lunch / Dinner',
    servings: 2,
    prepTime: '25 minutes',
    skillLevel: 'Intermediate (adult supervision for stovetop and cutting)',
    ingredients: [
      '1 cup rice (cooked according to package directions)',
      '2 boneless chicken breasts or thighs, cut into bite-size pieces',
      '2 cups mixed vegetables (broccoli, bell peppers, carrots), chopped',
      '1 tablespoon olive oil',
      'Salt, pepper, and garlic powder to taste',
      'Optional: soy sauce or a squeeze of lemon'
    ],
    steps: [
      'Cook the rice according to package directions.',
      'Heat the olive oil in a pan over medium heat (adult supervision). Add the chicken pieces, season with salt, pepper, and garlic powder, and cook, stirring occasionally, until no longer pink inside (about 6-8 minutes).',
      'Remove the chicken and set aside. Add the vegetables to the same pan and cook, stirring, until tender-crisp (about 5-6 minutes).',
      'Combine the rice, chicken, and vegetables in a bowl. Add soy sauce or lemon if you\'d like.'
    ],
    nutritionNote: 'A balanced plate in one bowl — real protein (chicken), whole-food carbs (rice), and vegetables, matching the meal-planning "half plate vegetables" habit.'
  },
  {
    id: 'recipe-turkey-wrap',
    title: 'Turkey & Veggie Wrap',
    category: 'Lunch',
    servings: 1,
    prepTime: '10 minutes',
    skillLevel: 'Beginner',
    ingredients: [
      '1 whole-wheat tortilla',
      '3-4 slices deli turkey (or leftover cooked chicken/turkey)',
      '1 slice cheese (optional)',
      'Lettuce, tomato, cucumber slices',
      '1 tablespoon hummus or mustard'
    ],
    steps: [
      'Lay the tortilla flat and spread the hummus or mustard evenly.',
      'Layer the turkey, cheese, and vegetables in the center.',
      'Fold in the sides, then roll the wrap up tightly from the bottom.',
      'Slice in half to serve.'
    ],
    nutritionNote: 'A quick, real protein-forward lunch — good for a school day, easy to pack ahead as part of meal planning.'
  },
  {
    id: 'recipe-baked-salmon-sweet-potato',
    title: 'Baked Salmon & Sweet Potato',
    category: 'Dinner',
    servings: 2,
    prepTime: '35 minutes',
    skillLevel: 'Intermediate (adult supervision for oven use)',
    ingredients: [
      '2 salmon fillets',
      '2 medium sweet potatoes, scrubbed and cut into wedges',
      '1 tablespoon olive oil (divided)',
      'Salt, pepper, and a squeeze of lemon',
      'Optional: steamed green beans or broccoli on the side'
    ],
    steps: [
      'Preheat the oven to 400°F (adult supervision).',
      'Toss the sweet potato wedges with half the olive oil, salt, and pepper on a baking sheet. Roast for about 15 minutes.',
      'Push the sweet potatoes to one side, add the salmon fillets to the other side, brush with the remaining olive oil, and season with salt, pepper, and lemon.',
      'Return to the oven and bake another 12-15 minutes, until the salmon flakes easily with a fork and the sweet potatoes are tender.',
      'Serve together, with vegetables on the side if you\'d like.'
    ],
    nutritionNote: 'Salmon is a real source of healthy fats alongside protein — a good example of a meal covering all three macronutrients plus real vegetables.'
  },
  {
    id: 'recipe-protein-smoothie',
    title: 'Recovery Protein Smoothie',
    category: 'Snack / Post-Workout',
    servings: 1,
    prepTime: '5 minutes',
    skillLevel: 'Beginner',
    ingredients: [
      '1 cup milk (dairy or fortified plant milk)',
      '1/2 cup Greek yogurt',
      '1 banana',
      '1/2 cup berries (fresh or frozen)',
      '1 tablespoon peanut butter (optional)',
      'Ice, if using fresh fruit'
    ],
    steps: [
      'Add all ingredients to a blender.',
      'Blend until smooth, about 30-45 seconds.',
      'Pour into a glass and drink within an hour of a workout for the best recovery timing.'
    ],
    nutritionNote: 'A real example of recovery nutrition — protein (milk, yogurt, peanut butter) plus carbs (banana, berries) within the after-workout window discussed in the Recovery Nutrition section.'
  },
  {
    id: 'recipe-veggie-stirfry',
    title: 'Simple Beef & Vegetable Stir-Fry',
    category: 'Dinner',
    servings: 2,
    prepTime: '25 minutes',
    skillLevel: 'Intermediate (adult supervision for stovetop and cutting)',
    ingredients: [
      '1/2 lb lean beef strips (or chicken/tofu)',
      '3 cups mixed vegetables (broccoli, carrots, snap peas, bell pepper)',
      '2 tablespoons soy sauce',
      '1 tablespoon oil',
      '1 clove garlic, minced (or 1/2 teaspoon garlic powder)',
      'Cooked rice, for serving'
    ],
    steps: [
      'Heat the oil in a large pan or wok over medium-high heat (adult supervision).',
      'Add the beef strips and cook, stirring, until browned, about 3-4 minutes. Remove and set aside.',
      'Add the vegetables and garlic to the same pan, stirring frequently, and cook until tender-crisp, about 5-6 minutes.',
      'Return the beef to the pan, add the soy sauce, and stir to coat everything evenly. Cook 1-2 more minutes.',
      'Serve over rice.'
    ],
    nutritionNote: 'A one-pan meal with real protein and a full serving of vegetables — a good model for building a balanced dinner quickly on a busy school night.'
  },
  {
    id: 'recipe-energy-bites',
    title: 'No-Bake Energy Bites',
    category: 'Snack',
    servings: 12,
    prepTime: '15 minutes (plus chilling)',
    skillLevel: 'Beginner',
    ingredients: [
      '1 cup rolled oats',
      '1/2 cup peanut butter (or other nut/seed butter)',
      '1/3 cup honey',
      '1/4 cup mini chocolate chips or dried fruit',
      '1 tablespoon chia or flax seeds (optional)'
    ],
    steps: [
      'Mix all ingredients together in a bowl until well combined.',
      'Chill the mixture in the fridge for about 20-30 minutes so it\'s easier to handle.',
      'Roll into small, bite-size balls (about 1 tablespoon each).',
      'Store in an airtight container in the fridge for up to a week — a real grab-and-go snack for before or after a workout.'
    ],
    nutritionNote: 'A homemade snack that pairs carbs (oats, honey) with protein and healthy fat (peanut butter) — a good pre-workout fuel option.'
  }
];

export const shoppingListCategories = [
  {
    id: 'produce',
    label: 'Produce',
    items: [
      'Bananas', 'Berries (fresh or frozen)', 'Apples', 'Broccoli', 'Carrots', 'Bell peppers',
      'Leafy greens (spinach, lettuce)', 'Sweet potatoes', 'Avocados', 'Cucumber', 'Tomatoes', 'Snap peas'
    ]
  },
  {
    id: 'protein',
    label: 'Protein',
    items: [
      'Eggs', 'Chicken breast or thighs', 'Ground turkey', 'Salmon or other fish', 'Lean beef',
      'Greek yogurt', 'Cottage cheese', 'Beans (canned or dry)', 'Lentils', 'Tofu', 'Deli turkey (low-sodium)'
    ]
  },
  {
    id: 'dairy',
    label: 'Dairy & Alternatives',
    items: ['Milk (dairy or fortified plant milk)', 'Cheese (shredded/sliced)', 'Butter', 'Plain/vanilla Greek yogurt']
  },
  {
    id: 'grains',
    label: 'Grains & Starches',
    items: ['Rice', 'Whole-grain bread', 'Whole-wheat tortillas', 'Rolled oats', 'Whole-grain pasta', 'Granola']
  },
  {
    id: 'fats-nuts',
    label: 'Healthy Fats & Nuts',
    items: ['Olive oil', 'Peanut butter or almond butter', 'Mixed nuts', 'Chia or flax seeds', 'Trail mix']
  },
  {
    id: 'pantry',
    label: 'Pantry Staples',
    items: ['Honey', 'Soy sauce', 'Garlic (fresh or powder)', 'Salt and pepper', 'Hummus', 'Whole-grain crackers']
  },
  {
    id: 'hydration',
    label: 'Hydration',
    items: ['Water bottle refills', 'Sparkling water (unsweetened)', 'Herbal tea (caffeine-free)', 'Low-sugar electrolyte drink (for long outdoor/sports days)']
  }
];

export const nutritionChallenges = [
  {
    id: 'challenge-water-week',
    title: 'Hydration Habit Week',
    description:
      'Hit your daily water tracker goal every day for a full week — a real habit-building challenge, not a competition against anyone else.',
    durationDays: 7
  },
  {
    id: 'challenge-protein-every-meal',
    title: 'Protein at Every Meal',
    description:
      'For 5 school days in a row, include a real protein source (eggs, chicken, yogurt, beans, etc.) at breakfast, lunch, and dinner.',
    durationDays: 5
  },
  {
    id: 'challenge-try-new-recipe',
    title: 'Try a New Recipe',
    description:
      'Pick one recipe from the Recipe Library you haven\'t made before and cook it (with adult supervision where needed) this week.',
    durationDays: 7
  },
  {
    id: 'challenge-read-3-labels',
    title: 'Label Detective',
    description:
      'Read the nutrition label on 3 different packaged foods in your kitchen this week and find the protein and added sugar lines on each.',
    durationDays: 7
  },
  {
    id: 'challenge-veggie-every-dinner',
    title: 'Vegetables at Every Dinner',
    description:
      'Include a real vegetable serving at dinner every night for a full week.',
    durationDays: 7
  },
  {
    id: 'challenge-recovery-snack',
    title: 'Recovery Snack Streak',
    description:
      'After every workout this week, have a protein-containing snack or meal within a couple hours, matching the Recovery Nutrition guidance.',
    durationDays: 7
  }
];

export function getRecipeById(id) {
  return recipeLibrary.find((r) => r.id === id) || null;
}

export function getNutritionTopicById(id) {
  return nutritionTopics.find((t) => t.id === id) || null;
}
