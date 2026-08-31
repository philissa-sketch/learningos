// ---------------------------------------------------------------------------
// Master spelling word pool for the Weekly Word List system.
// Words are introduced in this fixed order as "new" words are needed to
// fill out a week's list of 10 (see useAppStore.js::advanceWeeklyWordList).
// Order doesn't imply difficulty tiers — just introduction sequence.
// ---------------------------------------------------------------------------

export const spellingWordPool = [
  { id: 'sp-01', word: 'Receive', distractors: ['Recieve', 'Receeve', 'Receve'] },
  { id: 'sp-02', word: 'Occurred', distractors: ['Occured', 'Ocurred', 'Occureed'] },
  { id: 'sp-03', word: 'Necessary', distractors: ['Neccessary', 'Neccesary', 'Necesary'] },
  { id: 'sp-04', word: 'Maneuver', distractors: ['Manuever', 'Manuver', 'Maneuvre'] },
  { id: 'sp-05', word: 'Definitely', distractors: ['Definately', 'Definitly', 'Deffinitely'] },
  { id: 'sp-06', word: 'Separate', distractors: ['Seperate', 'Separrate', 'Seperete'] },
  { id: 'sp-07', word: 'Accommodate', distractors: ['Accomodate', 'Acommodate', 'Accommadate'] },
  { id: 'sp-08', word: 'Rhythm', distractors: ['Rythm', 'Rhythem', 'Rhytm'] },
  { id: 'sp-09', word: 'Achievement', distractors: ['Acheivement', 'Achievment', 'Acheivment'] },
  { id: 'sp-10', word: 'Embarrass', distractors: ['Embarass', 'Embarras', 'Embarrasse'] },
  { id: 'sp-11', word: 'Privilege', distractors: ['Privelege', 'Priviledge', 'Privilage'] },
  { id: 'sp-12', word: 'Occasion', distractors: ['Ocassion', 'Occassion', 'Ocasion'] },
  { id: 'sp-13', word: 'Questionnaire', distractors: ['Questionaire', 'Questionnair', 'Quiestionnaire'] },
  { id: 'sp-14', word: 'Independent', distractors: ['Independant', 'Independint', 'Indipendent'] },
  { id: 'sp-15', word: 'Existence', distractors: ['Existance', 'Existince', 'Existense'] },
  { id: 'sp-16', word: 'Government', distractors: ['Goverment', 'Govermint', 'Governmant'] },
  // 'Begining' was listed TWICE, so Tuesday's four choices were really three
  // and one of them appeared in two slots. Caught by verify-word-study, Aug 9 2026.
  { id: 'sp-17', word: 'Beginning', distractors: ['Begining', 'Beginnning', 'Begginning'] },
  { id: 'sp-18', word: 'Foreign', distractors: ['Foriegn', 'Forein', 'Foreing'] },
  // THE CORRECT SPELLING WAS IN ITS OWN WRONG LIST. Tuesday showed 'Grammar'
  // twice, one marked right and one marked wrong, and Friday's typed test
  // would have printed the answer among the misspellings. Fixed Aug 9 2026.
  { id: 'sp-19', word: 'Grammar', distractors: ['Grammer', 'Gramar', 'Grammor'] },
  { id: 'sp-20', word: 'Immediately', distractors: ['Imediately', 'Immediatly', 'Immedietely'] },
  { id: 'sp-21', word: 'Knowledge', distractors: ['Knowlege', 'Knowldge', 'Nowledge'] },
  { id: 'sp-22', word: 'License', distractors: ['Lisence', 'Liscense', 'Licens'] },
  { id: 'sp-23', word: 'Mischievous', distractors: ['Mischevious', 'Mischievious', 'Mischeivous'] },
  { id: 'sp-24', word: 'Noticeable', distractors: ['Noticable', 'Noticeble', 'Notisable'] },
  { id: 'sp-25', word: 'Parallel', distractors: ['Parallell', 'Paralel', 'Parrallel'] },
  { id: 'sp-26', word: 'Perseverance', distractors: ['Perseverence', 'Preseverance', 'Persevereance'] },
  { id: 'sp-27', word: 'Physically', distractors: ['Physicaly', 'Phisically', 'Physicalley'] },
  { id: 'sp-28', word: 'Possession', distractors: ['Posession', 'Possesion', 'Posesion'] },
  { id: 'sp-29', word: 'Recommend', distractors: ['Recomend', 'Reccomend', 'Recommand'] },
  { id: 'sp-30', word: 'Restaurant', distractors: ['Resturant', 'Restaraunt', 'Restaurent'] },
  { id: 'sp-31', word: 'Schedule', distractors: ['Schedual', 'Skedule', 'Shedule'] },
  { id: 'sp-32', word: 'Successful', distractors: ['Succesful', 'Sucessful', 'Successfull'] },
  { id: 'sp-33', word: 'Surprise', distractors: ['Suprise', 'Surprize', 'Suprrise'] },
  { id: 'sp-34', word: 'Temperature', distractors: ['Temperture', 'Tempature', 'Temperatur'] },
  { id: 'sp-35', word: 'Thorough', distractors: ['Thurough', 'Thorogh', 'Thourough'] },
  { id: 'sp-36', word: 'Twelfth', distractors: ['Twelth', 'Twelfeth', 'Twelfh'] },
  { id: 'sp-37', word: 'Unnecessary', distractors: ['Unecessary', 'Unnecesary', 'Unneccessary'] },
  { id: 'sp-38', word: 'Vacuum', distractors: ['Vaccum', 'Vacume', 'Vacuumm'] },
  { id: 'sp-39', word: 'Vehicle', distractors: ['Vehical', 'Vehicel', 'Vehcile'] },
  { id: 'sp-40', word: 'Weird', distractors: ['Wierd', 'Weerd', 'Wiered'] },
  { id: 'sp-41', word: 'Know', distractors: ['Konw', 'Knoow', 'Kow'] }, // W5 Silent Letters
  { id: 'sp-42', word: 'Gnome', distractors: ['Gonme', 'Gnoome', 'Gnoe'] }, // W5 Silent Letters
  { id: 'sp-43', word: 'Wrist', distractors: ['Wirst', 'Wriist', 'Writ'] }, // W5 Silent Letters
  { id: 'sp-44', word: 'Lamb', distractors: ['Lmab', 'Lammb', 'Lmb'] }, // W5 Silent Letters
  { id: 'sp-45', word: 'Sword', distractors: ['Sowrd', 'Swoord', 'Swod'] }, // W5 Silent Letters
  { id: 'sp-46', word: 'Wrinkle', distractors: ['Wirnkle', 'Wriinkle', 'Wrikle'] }, // W5 Silent Letters
  { id: 'sp-47', word: 'Calf', distractors: ['Claf', 'Callf', 'Clf'] }, // W5 Silent Letters
  { id: 'sp-48', word: 'Autumn', distractors: ['Atuumn', 'Auttumn', 'Autmn'] }, // W5 Silent Letters
  { id: 'sp-49', word: 'Honest', distractors: ['Hnoest', 'Honnest', 'Honst'] }, // W5 Silent Letters
  { id: 'sp-50', word: 'Hour', distractors: ['Huor', 'Houur', 'Hur'] }, // W5 Silent Letters
  { id: 'sp-51', word: 'Attention', distractors: ['Atttention', 'Attntion', 'Attantion'] }, // W6 -TION Endings
  { id: 'sp-52', word: 'Celebration', distractors: ['Cleebration', 'Cellebration', 'Celbration'] }, // W6 -TION Endings
  { id: 'sp-53', word: 'Education', distractors: ['Eudcation', 'Eduucation', 'Eduation'] }, // W6 -TION Endings
  { id: 'sp-54', word: 'Information', distractors: ['Ifnormation', 'Infformation', 'Infrmation'] }, // W6 -TION Endings
  { id: 'sp-55', word: 'Invention', distractors: ['Ivnention', 'Invvention', 'Invntion'] }, // W6 -TION Endings
  { id: 'sp-56', word: 'Location', distractors: ['Lcoation', 'Loccation', 'Loction'] }, // W6 -TION Endings
  { id: 'sp-57', word: 'Motion', distractors: ['Mtoion', 'Mottion', 'Moton'] }, // W6 -TION Endings
  { id: 'sp-58', word: 'Nation', distractors: ['Ntaion', 'Nattion', 'Naton'] }, // W6 -TION Endings
  { id: 'sp-59', word: 'Station', distractors: ['Sattion', 'Staation', 'Staion'] }, // W6 -TION Endings
  { id: 'sp-60', word: 'Vacation', distractors: ['Vcaation', 'Vaccation', 'Vaction'] }, // W6 -TION Endings
  { id: 'sp-61', word: 'Decision', distractors: ['Dceision', 'Deccision', 'Decsion'] }, // W7 -SION Endings
  { id: 'sp-62', word: 'Division', distractors: ['Dviision', 'Divvision', 'Divsion'] }, // W7 -SION Endings
  { id: 'sp-63', word: 'Explosion', distractors: ['Epxlosion', 'Expplosion', 'Exposion'] }, // W7 -SION Endings
  { id: 'sp-64', word: 'Mission', distractors: ['Msision', 'Misssion', 'Mision'] }, // W7 -SION Endings
  { id: 'sp-65', word: 'Erosion', distractors: ['Eorsion', 'Eroosion', 'Eroion'] }, // W7 -SION Endings
  { id: 'sp-66', word: 'Passion', distractors: ['Psasion', 'Passsion', 'Pasion'] }, // W7 -SION Endings
  { id: 'sp-67', word: 'Permission', distractors: ['Premission', 'Perrmission', 'Perission'] }, // W7 -SION Endings
  { id: 'sp-68', word: 'Tension', distractors: ['Tnesion', 'Tennsion', 'Tenion'] }, // W7 -SION Endings
  { id: 'sp-69', word: 'Vision', distractors: ['Vsiion', 'Vission', 'Vison'] }, // W7 -SION Endings
  { id: 'sp-70', word: 'Conclusion', distractors: ['Cnoclusion', 'Connclusion', 'Conlusion'] }, // W7 -SION Endings
  { id: 'sp-71', word: 'Believe', distractors: ['Bleieve', 'Bellieve', 'Beleve'] }, // W8 IE/EI Rule
  { id: 'sp-72', word: 'Ceiling', distractors: ['Cieling', 'Ceiiling', 'Ceiing'] }, // W8 IE/EI Rule
  { id: 'sp-73', word: 'Chief', distractors: ['Cihef', 'Chiief', 'Chif'] }, // W8 IE/EI Rule
  { id: 'sp-74', word: 'Deceive', distractors: ['Dceeive', 'Decceive', 'Decive'] }, // W8 IE/EI Rule
  { id: 'sp-75', word: 'Field', distractors: ['Feild', 'Fieeld', 'Fied'] }, // W8 IE/EI Rule
  { id: 'sp-76', word: 'Friend', distractors: ['Firend', 'Friiend', 'Frind'] }, // W8 IE/EI Rule
  { id: 'sp-77', word: 'Niece', distractors: ['Neice', 'Nieece', 'Niee'] }, // W8 IE/EI Rule
  { id: 'sp-78', word: 'Weigh', distractors: ['Wiegh', 'Weiigh', 'Weih'] }, // W8 IE/EI Rule
  { id: 'sp-79', word: 'Neighbor', distractors: ['Nieghbor', 'Neiighbor', 'Neihbor'] }, // W8 IE/EI Rule
  { id: 'sp-80', word: 'Yield', distractors: ['Yeild', 'Yieeld', 'Yied'] }, // W8 IE/EI Rule
  { id: 'sp-81', word: 'Unusual', distractors: ['Uunsual', 'Unuusual', 'Unuual'] }, // W9 Prefixes
  { id: 'sp-82', word: 'Rebuild', distractors: ['Rbeuild', 'Rebbuild', 'Rebild'] }, // W9 Prefixes
  { id: 'sp-83', word: 'Disagree', distractors: ['Dsiagree', 'Dissagree', 'Disgree'] }, // W9 Prefixes
  { id: 'sp-84', word: 'Mistake', distractors: ['Msitake', 'Misstake', 'Misake'] }, // W9 Prefixes
  { id: 'sp-85', word: 'Unaware', distractors: ['Uanware', 'Unaaware', 'Unaare'] }, // W9 Prefixes
  { id: 'sp-86', word: 'Reappear', distractors: ['Raeppear', 'Reaappear', 'Reapear'] }, // W9 Prefixes
  { id: 'sp-87', word: 'Dishonest', distractors: ['Dsihonest', 'Disshonest', 'Disonest'] }, // W9 Prefixes
  { id: 'sp-88', word: 'Misplace', distractors: ['Msiplace', 'Missplace', 'Mislace'] }, // W9 Prefixes
  { id: 'sp-89', word: 'Unfold', distractors: ['Ufnold', 'Unffold', 'Unfld'] }, // W9 Prefixes
  { id: 'sp-90', word: 'Rewrite', distractors: ['Rwerite', 'Rewwrite', 'Rewite'] }, // W9 Prefixes
  { id: 'sp-91', word: 'Comfortable', distractors: ['Cmofortable', 'Commfortable', 'Comortable'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-92', word: 'Responsible', distractors: ['Rseponsible', 'Ressponsible', 'Resonsible'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-93', word: 'Reasonable', distractors: ['Raesonable', 'Reaasonable', 'Reaonable'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-94', word: 'Flexible', distractors: ['Felxible', 'Fleexible', 'Fleible'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-95', word: 'Valuable', distractors: ['Vlauable', 'Valluable', 'Valable'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-96', word: 'Visible', distractors: ['Vsiible', 'Vissible', 'Visble'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-97', word: 'Dependable', distractors: ['Dpeendable', 'Deppendable', 'Depndable'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-98', word: 'Possible', distractors: ['Psosible', 'Posssible', 'Posible'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-99', word: 'Remarkable', distractors: ['Rmearkable', 'Remmarkable', 'Remrkable'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-100', word: 'Terrible', distractors: ['Trerible', 'Terrrible', 'Terible'] }, // W10 Suffixes -ABLE/-IBLE
  { id: 'sp-101', word: 'Basketball', distractors: ['Bsaketball', 'Bassketball', 'Basetball'] }, // W11 Compound Words
  { id: 'sp-102', word: 'Everywhere', distractors: ['Eevrywhere', 'Eveerywhere', 'Eveywhere'] }, // W11 Compound Words
  { id: 'sp-103', word: 'Notebook', distractors: ['Ntoebook', 'Nottebook', 'Notbook'] }, // W11 Compound Words
  { id: 'sp-104', word: 'Underground', distractors: ['Udnerground', 'Undderground', 'Undrground'] }, // W11 Compound Words
  { id: 'sp-105', word: 'Spaceship', distractors: ['Sapceship', 'Spaaceship', 'Spaeship'] }, // W11 Compound Words
  { id: 'sp-106', word: 'Background', distractors: ['Bcakground', 'Bacckground', 'Bacground'] }, // W11 Compound Words
  { id: 'sp-107', word: 'Weekend', distractors: ['Weeekend', 'Weeend', 'Waekend'] }, // W11 Compound Words
  { id: 'sp-108', word: 'Without', distractors: ['Wtihout', 'Witthout', 'Witout'] }, // W11 Compound Words
  { id: 'sp-109', word: 'Sunlight', distractors: ['Snulight', 'Sunnlight', 'Sunight'] }, // W11 Compound Words
  { id: 'sp-110', word: 'Airport', distractors: ['Ariport', 'Airrport', 'Airort'] }, // W11 Compound Words
  { id: 'sp-111', word: 'Aerospace', distractors: ['Areospace', 'Aerrospace', 'Aerspace'] }, // W12 Roots - Space & Science
  { id: 'sp-112', word: 'Astronaut', distractors: ['Atsronaut', 'Asttronaut', 'Astonaut'] }, // W12 Roots - Space & Science
  { id: 'sp-113', word: 'Astronomy', distractors: ['Atsronomy', 'Asttronomy', 'Astonomy'] }, // W12 Roots - Space & Science
  { id: 'sp-114', word: 'Telephone', distractors: ['Tleephone', 'Tellephone', 'Telphone'] }, // W12 Roots - Space & Science
  { id: 'sp-115', word: 'Telescope', distractors: ['Tleescope', 'Tellescope', 'Telscope'] }, // W12 Roots - Space & Science
  { id: 'sp-116', word: 'Television', distractors: ['Tleevision', 'Tellevision', 'Telvision'] }, // W12 Roots - Space & Science
  { id: 'sp-117', word: 'Geography', distractors: ['Goegraphy', 'Geoography', 'Georaphy'] }, // W12 Roots - Space & Science
  { id: 'sp-118', word: 'Biology', distractors: ['Boilogy', 'Bioology', 'Bioogy'] }, // W12 Roots - Space & Science
  { id: 'sp-119', word: 'Photograph', distractors: ['Pohtograph', 'Phootograph', 'Phoograph'] }, // W12 Roots - Space & Science
  { id: 'sp-120', word: 'Thermometer', distractors: ['Tehrmometer', 'Theermometer', 'Themometer'] }, // W12 Roots - Space & Science
  { id: 'sp-121', word: 'Eighth', distractors: ['Egihth', 'Eigghth', 'Eigth'] }, // W13 Number Words
  { id: 'sp-122', word: 'Ninety', distractors: ['Nniety', 'Ninnety', 'Ninty'] }, // W13 Number Words
  { id: 'sp-123', word: 'Forty', distractors: ['Froty', 'Forrty', 'Fory'] }, // W13 Number Words
  { id: 'sp-124', word: 'Thirteen', distractors: ['Tihrteen', 'Thiirteen', 'Thiteen'] }, // W13 Number Words
  { id: 'sp-125', word: 'Fourteen', distractors: ['Fuorteen', 'Fouurteen', 'Fouteen'] }, // W13 Number Words
  { id: 'sp-126', word: 'Eighty', distractors: ['Egihty', 'Eigghty', 'Eigty'] }, // W13 Number Words
  { id: 'sp-127', word: 'Twentieth', distractors: ['Tewntieth', 'Tweentieth', 'Twetieth'] }, // W13 Number Words
  { id: 'sp-128', word: 'Hundred', distractors: ['Hnudred', 'Hunndred', 'Hunred'] }, // W13 Number Words
  { id: 'sp-129', word: 'Thousand', distractors: ['Tohusand', 'Thoousand', 'Thosand'] }, // W13 Number Words
  { id: 'sp-130', word: 'Seventieth', distractors: ['Sveentieth', 'Sevventieth', 'Sevntieth'] }, // W13 Number Words
  { id: 'sp-131', word: 'Affect', distractors: ['Afffect', 'Affct', 'Affact'] }, // W14 Commonly Confused
  { id: 'sp-132', word: 'Effect', distractors: ['Efffect', 'Effct', 'Effact'] }, // W14 Commonly Confused
  { id: 'sp-133', word: 'Accept', distractors: ['Acccept', 'Accpt', 'Accapt'] }, // W14 Commonly Confused
  { id: 'sp-134', word: 'Except', distractors: ['Ecxept', 'Exccept', 'Excpt'] }, // W14 Commonly Confused
  { id: 'sp-135', word: 'Advice', distractors: ['Avdice', 'Advvice', 'Advce'] }, // W14 Commonly Confused
  { id: 'sp-136', word: 'Advise', distractors: ['Avdise', 'Advvise', 'Advse'] }, // W14 Commonly Confused
  { id: 'sp-137', word: 'Weather', distractors: ['Waether', 'Weaather', 'Weaher'] }, // W14 Commonly Confused
  { id: 'sp-138', word: 'Whether', distractors: ['Wehther', 'Wheether', 'Wheher'] }, // W14 Commonly Confused
  { id: 'sp-139', word: 'Than', distractors: ['Tahn', 'Thaan', 'Tan'] }, // W14 Commonly Confused
  { id: 'sp-140', word: 'Then', distractors: ['Tehn', 'Theen', 'Ten'] }, // W14 Commonly Confused
  { id: 'sp-141', word: 'Importance', distractors: ['Ipmortance', 'Impportance', 'Imprtance'] }, // W15 -ANCE/-ENCE
  { id: 'sp-142', word: 'Appearance', distractors: ['Apppearance', 'Apparance', 'Appearanca'] }, // W15 -ANCE/-ENCE
  { id: 'sp-143', word: 'Difference', distractors: ['Dfiference', 'Diffference', 'Diference'] }, // W15 -ANCE/-ENCE
  { id: 'sp-144', word: 'Confidence', distractors: ['Cnofidence', 'Connfidence', 'Conidence'] }, // W15 -ANCE/-ENCE
  { id: 'sp-145', word: 'Patience', distractors: ['Ptaience', 'Pattience', 'Patence'] }, // W15 -ANCE/-ENCE
  { id: 'sp-146', word: 'Distance', distractors: ['Dsitance', 'Disstance', 'Disance'] }, // W15 -ANCE/-ENCE
  { id: 'sp-147', word: 'Evidence', distractors: ['Eivdence', 'Eviidence', 'Evience'] }, // W15 -ANCE/-ENCE
  { id: 'sp-148', word: 'Guidance', distractors: ['Giudance', 'Guiidance', 'Guiance'] }, // W15 -ANCE/-ENCE
  { id: 'sp-149', word: 'Science', distractors: ['Sicence', 'Sciience', 'Scince'] }, // W15 -ANCE/-ENCE
  { id: 'sp-150', word: 'Attendance', distractors: ['Atttendance', 'Attndance', 'Attandance'] }, // W15 -ANCE/-ENCE
  { id: 'sp-151', word: 'Island', distractors: ['Ilsand', 'Islland', 'Islnd'] }, // W16 More Silent Consonants
  { id: 'sp-152', word: 'Listen', distractors: ['Lsiten', 'Lissten', 'Lisen'] }, // W16 More Silent Consonants
  { id: 'sp-153', word: 'Muscle', distractors: ['Msucle', 'Musscle', 'Musle'] }, // W16 More Silent Consonants
  { id: 'sp-154', word: 'Column', distractors: ['Cloumn', 'Collumn', 'Colmn'] }, // W16 More Silent Consonants
  { id: 'sp-155', word: 'Condemn', distractors: ['Cnodemn', 'Conndemn', 'Conemn'] }, // W16 More Silent Consonants
  { id: 'sp-156', word: 'Campaign', distractors: ['Cmapaign', 'Cammpaign', 'Camaign'] }, // W16 More Silent Consonants
  { id: 'sp-157', word: 'Thumb', distractors: ['Tuhmb', 'Thuumb', 'Thub'] }, // W16 More Silent Consonants
  { id: 'sp-158', word: 'Subtle', distractors: ['Sbutle', 'Subbtle', 'Suble'] }, // W16 More Silent Consonants
  { id: 'sp-159', word: 'Doubt', distractors: ['Duobt', 'Douubt', 'Dout'] }, // W16 More Silent Consonants
  { id: 'sp-160', word: 'Solemn', distractors: ['Sloemn', 'Sollemn', 'Solmn'] }, // W16 More Silent Consonants
  { id: 'sp-161', word: 'Children', distractors: ['Cihldren', 'Chiildren', 'Chidren'] }, // W17 Irregular Plurals
  { id: 'sp-162', word: 'Feet', distractors: ['Feeet', 'Fet', 'Feat'] }, // W17 Irregular Plurals
  { id: 'sp-163', word: 'Mice', distractors: ['Mcie', 'Micce', 'Mce'] }, // W17 Irregular Plurals
  { id: 'sp-164', word: 'Geese', distractors: ['Geeese', 'Geee', 'Gaese'] }, // W17 Irregular Plurals
  { id: 'sp-165', word: 'Teeth', distractors: ['Teeeth', 'Teeh', 'Teath'] }, // W17 Irregular Plurals
  { id: 'sp-166', word: 'People', distractors: ['Poeple', 'Peoople', 'Peole'] }, // W17 Irregular Plurals
  { id: 'sp-167', word: 'Women', distractors: ['Wmoen', 'Wommen', 'Womn'] }, // W17 Irregular Plurals
  { id: 'sp-168', word: 'Men', distractors: ['Mne', 'Menn', 'Man'] }, // W17 Irregular Plurals
  { id: 'sp-169', word: 'Oxen', distractors: ['Oexn', 'Oxeen', 'Oen'] }, // W17 Irregular Plurals
  { id: 'sp-170', word: 'Leaves', distractors: ['Laeves', 'Leaaves', 'Leaes'] }, // W17 Irregular Plurals
  { id: 'sp-171', word: 'Although', distractors: ['Atlhough', 'Altthough', 'Altough'] }, // W18 -OUGH Words
  { id: 'sp-172', word: 'Through', distractors: ['Trhough', 'Thrrough', 'Thrugh'] }, // W18 -OUGH Words
  { id: 'sp-173', word: 'Tough', distractors: ['Tuogh', 'Touugh', 'Touh'] }, // W18 -OUGH Words
  { id: 'sp-174', word: 'Cough', distractors: ['Cuogh', 'Couugh', 'Couh'] }, // W18 -OUGH Words
  { id: 'sp-175', word: 'Enough', distractors: ['Eonugh', 'Enoough', 'Enogh'] }, // W18 -OUGH Words
  { id: 'sp-176', word: 'Thought', distractors: ['Tohught', 'Thoought', 'Thoght'] }, // W18 -OUGH Words
  { id: 'sp-177', word: 'Bought', distractors: ['Buoght', 'Bouught', 'Bouht'] }, // W18 -OUGH Words
  { id: 'sp-178', word: 'Brought', distractors: ['Borught', 'Broought', 'Broght'] }, // W18 -OUGH Words
  { id: 'sp-179', word: 'Drought', distractors: ['Dorught', 'Droought', 'Droght'] }, // W18 -OUGH Words
  { id: 'sp-180', word: 'Dough', distractors: ['Duogh', 'Douugh', 'Douh'] }, // W18 -OUGH Words
  { id: 'sp-181', word: 'Engineer', distractors: ['Egnineer', 'Enggineer', 'Engneer'] }, // W19 Engineering & Technology
  { id: 'sp-182', word: 'Blueprint', distractors: ['Buleprint', 'Bluueprint', 'Bluprint'] }, // W19 Engineering & Technology
  { id: 'sp-183', word: 'Mechanism', distractors: ['Mcehanism', 'Mecchanism', 'Mecanism'] }, // W19 Engineering & Technology
  { id: 'sp-184', word: 'Apparatus', distractors: ['Appparatus', 'Appratus', 'Apperatus'] }, // W19 Engineering & Technology
  { id: 'sp-185', word: 'Instrument', distractors: ['Isntrument', 'Insstrument', 'Insrument'] }, // W19 Engineering & Technology
  { id: 'sp-186', word: 'Technology', distractors: ['Tcehnology', 'Tecchnology', 'Tecnology'] }, // W19 Engineering & Technology
  { id: 'sp-187', word: 'Equipment', distractors: ['Euqipment', 'Equuipment', 'Equpment'] }, // W19 Engineering & Technology
  { id: 'sp-188', word: 'Machinery', distractors: ['Mcahinery', 'Macchinery', 'Macinery'] }, // W19 Engineering & Technology
  { id: 'sp-189', word: 'Structure', distractors: ['Srtucture', 'Strructure', 'Strcture'] }, // W19 Engineering & Technology
  { id: 'sp-190', word: 'Assembly', distractors: ['Asssembly', 'Assmbly', 'Assambly'] }, // W19 Engineering & Technology
  { id: 'sp-191', word: 'Quality', distractors: ['Qaulity', 'Quaality', 'Quaity'] }, // W20 Words with Q
  { id: 'sp-192', word: 'Quantity', distractors: ['Qauntity', 'Quaantity', 'Quatity'] }, // W20 Words with Q
  { id: 'sp-193', word: 'Quarter', distractors: ['Qaurter', 'Quaarter', 'Quater'] }, // W20 Words with Q
  { id: 'sp-194', word: 'Question', distractors: ['Qeustion', 'Queestion', 'Quetion'] }, // W20 Words with Q
  { id: 'sp-195', word: 'Quiet', distractors: ['Qiuet', 'Quiiet', 'Quit'] }, // W20 Words with Q
  { id: 'sp-196', word: 'Quick', distractors: ['Qiuck', 'Quiick', 'Quik'] }, // W20 Words with Q
  { id: 'sp-197', word: 'Require', distractors: ['Rqeuire', 'Reqquire', 'Reqire'] }, // W20 Words with Q
  { id: 'sp-198', word: 'Unique', distractors: ['Uinque', 'Uniique', 'Uniue'] }, // W20 Words with Q
  { id: 'sp-199', word: 'Quote', distractors: ['Qoute', 'Quoote', 'Quoe'] }, // W20 Words with Q
  { id: 'sp-200', word: 'Earthquake', distractors: ['Erathquake', 'Earrthquake', 'Earhquake'] }, // W20 Words with Q
  { id: 'sp-201', word: 'Rhyme', distractors: ['Ryhme', 'Rhyyme', 'Rhye'] }, // W21 Advanced Silent Letters
  { id: 'sp-202', word: 'Wednesday', distractors: ['Wdenesday', 'Weddnesday', 'Wedesday'] }, // W21 Advanced Silent Letters
  { id: 'sp-203', word: 'Handkerchief', distractors: ['Hnadkerchief', 'Hanndkerchief', 'Hankerchief'] }, // W21 Advanced Silent Letters
  { id: 'sp-204', word: 'Yacht', distractors: ['Ycaht', 'Yaccht', 'Yact'] }, // W21 Advanced Silent Letters
  { id: 'sp-205', word: 'Debt', distractors: ['Dbet', 'Debbt', 'Dbt'] }, // W21 Advanced Silent Letters
  { id: 'sp-206', word: 'Receipt', distractors: ['Rceeipt', 'Recceipt', 'Recipt'] }, // W21 Advanced Silent Letters
  { id: 'sp-207', word: 'Salmon', distractors: ['Slamon', 'Sallmon', 'Salon'] }, // W21 Advanced Silent Letters
  { id: 'sp-208', word: 'Gnaw', distractors: ['Ganw', 'Gnaaw', 'Gaw'] }, // W21 Advanced Silent Letters
  { id: 'sp-209', word: 'Knight', distractors: ['Kinght', 'Kniight', 'Kniht'] }, // W21 Advanced Silent Letters
  { id: 'sp-210', word: 'Wrestle', distractors: ['Werstle', 'Wreestle', 'Wretle'] }, // W21 Advanced Silent Letters
  { id: 'sp-211', word: 'Bureaucracy', distractors: ['Brueaucracy', 'Burreaucracy', 'Buraucracy'] }, // W22 Hard-to-Spell Words
  { id: 'sp-212', word: 'Miscellaneous', distractors: ['Msicellaneous', 'Misscellaneous', 'Misellaneous'] }, // W22 Hard-to-Spell Words
  { id: 'sp-213', word: 'Silhouette', distractors: ['Slihouette', 'Sillhouette', 'Silouette'] }, // W22 Hard-to-Spell Words
  { id: 'sp-214', word: 'Camouflage', distractors: ['Cmaouflage', 'Cammouflage', 'Camuflage'] }, // W22 Hard-to-Spell Words
  { id: 'sp-215', word: 'Kindergarten', distractors: ['Knidergarten', 'Kinndergarten', 'Kinergarten'] }, // W22 Hard-to-Spell Words
  { id: 'sp-216', word: 'Maintenance', distractors: ['Miantenance', 'Maiintenance', 'Maitenance'] }, // W22 Hard-to-Spell Words
  { id: 'sp-217', word: 'Surveillance', distractors: ['Sruveillance', 'Surrveillance', 'Sureillance'] }, // W22 Hard-to-Spell Words
  { id: 'sp-218', word: 'Reminisce', distractors: ['Rmeinisce', 'Remminisce', 'Remnisce'] }, // W22 Hard-to-Spell Words
  { id: 'sp-219', word: 'Questionable', distractors: ['Qeustionable', 'Queestionable', 'Quetionable'] }, // W22 Hard-to-Spell Words
  { id: 'sp-220', word: 'Inoculate', distractors: ['Ionculate', 'Inooculate', 'Inoulate'] }, // W22 Hard-to-Spell Words
  { id: 'sp-221', word: 'Agreement', distractors: ['Argeement', 'Agrreement', 'Agrement'] }, // W23 Double Vowels
  { id: 'sp-222', word: 'Cooperate', distractors: ['Coooperate', 'Cooerate', 'Cooperete'] }, // W23 Double Vowels
  { id: 'sp-223', word: 'Reelect', distractors: ['Reeelect', 'Reeect', 'Raelect'] }, // W23 Double Vowels
  { id: 'sp-224', word: 'Continuous', distractors: ['Cnotinuous', 'Conntinuous', 'Coninuous'] }, // W23 Double Vowels
  { id: 'sp-225', word: 'Bruise', distractors: ['Burise', 'Bruuise', 'Bruse'] }, // W23 Double Vowels
  { id: 'sp-226', word: 'Cruise', distractors: ['Curise', 'Cruuise', 'Cruse'] }, // W23 Double Vowels
  { id: 'sp-227', word: 'Guitar', distractors: ['Giutar', 'Guiitar', 'Guiar'] }, // W23 Double Vowels
  { id: 'sp-228', word: 'Fruit', distractors: ['Furit', 'Fruuit', 'Frut'] }, // W23 Double Vowels
  { id: 'sp-229', word: 'Juice', distractors: ['Jiuce', 'Juiice', 'Juie'] }, // W23 Double Vowels
  { id: 'sp-230', word: 'Suit', distractors: ['Siut', 'Suiit', 'Sit'] }, // W23 Double Vowels
  { id: 'sp-231', word: 'Import', distractors: ['Ipmort', 'Impport', 'Imprt'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-232', word: 'Export', distractors: ['Epxort', 'Expport', 'Exprt'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-233', word: 'Transport', distractors: ['Tarnsport', 'Traansport', 'Trasport'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-234', word: 'Report', distractors: ['Rpeort', 'Repport', 'Reprt'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-235', word: 'Predict', distractors: ['Perdict', 'Preedict', 'Preict'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-236', word: 'Contradict', distractors: ['Cnotradict', 'Conntradict', 'Conradict'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-237', word: 'Inspect', distractors: ['Isnpect', 'Insspect', 'Insect'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-238', word: 'Spectator', distractors: ['Sepctator', 'Speectator', 'Spetator'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-239', word: 'Respect', distractors: ['Rsepect', 'Resspect', 'Resect'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-240', word: 'Suspect', distractors: ['Ssupect', 'Susspect', 'Susect'] }, // W24 Latin Roots - PORT/DICT/SPECT
  { id: 'sp-241', word: 'Construct', distractors: ['Cnostruct', 'Connstruct', 'Contruct'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-242', word: 'Instruct', distractors: ['Isntruct', 'Insstruct', 'Insruct'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-243', word: 'Destruction', distractors: ['Dsetruction', 'Desstruction', 'Desruction'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-244', word: 'Interrupt', distractors: ['Itnerrupt', 'Intterrupt', 'Intrrupt'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-245', word: 'Erupt', distractors: ['Eurpt', 'Eruupt', 'Erut'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-246', word: 'Bankrupt', distractors: ['Bnakrupt', 'Bannkrupt', 'Banrupt'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-247', word: 'Visual', distractors: ['Vsiual', 'Vissual', 'Visal'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-248', word: 'Supervise', distractors: ['Spuervise', 'Suppervise', 'Suprvise'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-249', word: 'Revise', distractors: ['Rveise', 'Revvise', 'Revse'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-250', word: 'Advisory', distractors: ['Avdisory', 'Advvisory', 'Advsory'] }, // W25 Latin Roots - STRUCT/RUPT/VIS
  { id: 'sp-251', word: 'Delicious', distractors: ['Dleicious', 'Dellicious', 'Delcious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-252', word: 'Precious', distractors: ['Percious', 'Preecious', 'Preious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-253', word: 'Suspicious', distractors: ['Ssupicious', 'Susspicious', 'Susicious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-254', word: 'Gracious', distractors: ['Garcious', 'Graacious', 'Graious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-255', word: 'Spacious', distractors: ['Sapcious', 'Spaacious', 'Spaious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-256', word: 'Cautious', distractors: ['Cuatious', 'Cauutious', 'Cauious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-257', word: 'Ambitious', distractors: ['Abmitious', 'Ambbitious', 'Ambtious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-258', word: 'Nutritious', distractors: ['Nturitious', 'Nuttritious', 'Nutitious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-259', word: 'Infectious', distractors: ['Ifnectious', 'Inffectious', 'Infctious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-260', word: 'Conscious', distractors: ['Cnoscious', 'Connscious', 'Concious'] }, // W26 -CIOUS/-TIOUS
  { id: 'sp-261', word: 'Gorgeous', distractors: ['Grogeous', 'Gorrgeous', 'Goreous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-262', word: 'Courageous', distractors: ['Cuorageous', 'Couurageous', 'Couageous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-263', word: 'Outrageous', distractors: ['Oturageous', 'Outtrageous', 'Outageous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-264', word: 'Advantageous', distractors: ['Avdantageous', 'Advvantageous', 'Advntageous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-265', word: 'Curious', distractors: ['Cruious', 'Currious', 'Curous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-266', word: 'Serious', distractors: ['Sreious', 'Serrious', 'Serous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-267', word: 'Obvious', distractors: ['Ovbious', 'Obvvious', 'Obvous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-268', word: 'Various', distractors: ['Vraious', 'Varrious', 'Varous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-269', word: 'Anxious', distractors: ['Axnious', 'Anxxious', 'Anxous'] }, // W27 -EOUS/-IOUS
  { id: 'sp-270', word: 'Mysterious', distractors: ['Msyterious', 'Myssterious', 'Myserious'] }, // W27 -EOUS/-IOUS
  { id: 'sp-271', word: 'Acceleration', distractors: ['Accceleration', 'Accleration', 'Accelerateon'] }, // W28 Physics & Motion
  { id: 'sp-272', word: 'Gravity', distractors: ['Garvity', 'Graavity', 'Graity'] }, // W28 Physics & Motion
  { id: 'sp-273', word: 'Magnetic', distractors: ['Mganetic', 'Maggnetic', 'Magetic'] }, // W28 Physics & Motion
  { id: 'sp-274', word: 'Frequency', distractors: ['Ferquency', 'Freequency', 'Freuency'] }, // W28 Physics & Motion
  { id: 'sp-275', word: 'Vibration', distractors: ['Vbiration', 'Vibbration', 'Vibation'] }, // W28 Physics & Motion
  { id: 'sp-276', word: 'Pressure', distractors: ['Perssure', 'Preessure', 'Presure'] }, // W28 Physics & Motion
  { id: 'sp-277', word: 'Density', distractors: ['Dnesity', 'Dennsity', 'Denity'] }, // W28 Physics & Motion
  { id: 'sp-278', word: 'Elasticity', distractors: ['Ealsticity', 'Elaasticity', 'Elaticity'] }, // W28 Physics & Motion
  { id: 'sp-279', word: 'Resistance', distractors: ['Rseistance', 'Ressistance', 'Resstance'] }, // W28 Physics & Motion
  { id: 'sp-280', word: 'Combustion', distractors: ['Cmobustion', 'Commbustion', 'Comustion'] }, // W28 Physics & Motion
  { id: 'sp-281', word: 'Molecule', distractors: ['Mloecule', 'Mollecule', 'Molcule'] }, // W29 Chemistry
  { id: 'sp-282', word: 'Element', distractors: ['Eelment', 'Eleement', 'Eleent'] }, // W29 Chemistry
  { id: 'sp-283', word: 'Compound', distractors: ['Cmopound', 'Commpound', 'Comound'] }, // W29 Chemistry
  { id: 'sp-284', word: 'Reaction', distractors: ['Raection', 'Reaaction', 'Reation'] }, // W29 Chemistry
  { id: 'sp-285', word: 'Solution', distractors: ['Sloution', 'Sollution', 'Soltion'] }, // W29 Chemistry
  { id: 'sp-286', word: 'Mixture', distractors: ['Mxiture', 'Mixxture', 'Mixure'] }, // W29 Chemistry
  { id: 'sp-287', word: 'Solid', distractors: ['Sloid', 'Sollid', 'Sold'] }, // W29 Chemistry
  { id: 'sp-288', word: 'Liquid', distractors: ['Lqiuid', 'Liqquid', 'Liqid'] }, // W29 Chemistry
  { id: 'sp-289', word: 'Gaseous', distractors: ['Gsaeous', 'Gasseous', 'Gasous'] }, // W29 Chemistry
  { id: 'sp-290', word: 'Catalyst', distractors: ['Ctaalyst', 'Cattalyst', 'Catlyst'] }, // W29 Chemistry
  { id: 'sp-291', word: 'Galaxy', distractors: ['Glaaxy', 'Gallaxy', 'Galxy'] }, // W30 Astronomy
  { id: 'sp-292', word: 'Universe', distractors: ['Uinverse', 'Uniiverse', 'Unierse'] }, // W30 Astronomy
  { id: 'sp-293', word: 'Asteroid', distractors: ['Atseroid', 'Astteroid', 'Astroid'] }, // W30 Astronomy
  { id: 'sp-294', word: 'Meteorite', distractors: ['Mteeorite', 'Metteorite', 'Metorite'] }, // W30 Astronomy
  { id: 'sp-295', word: 'Constellation', distractors: ['Cnostellation', 'Connstellation', 'Contellation'] }, // W30 Astronomy
  { id: 'sp-296', word: 'Satellite', distractors: ['Staellite', 'Sattellite', 'Satllite'] }, // W30 Astronomy
  { id: 'sp-297', word: 'Eclipse', distractors: ['Elcipse', 'Ecllipse', 'Eclpse'] }, // W30 Astronomy
  { id: 'sp-298', word: 'Nebula', distractors: ['Nbeula', 'Nebbula', 'Nebla'] }, // W30 Astronomy
  { id: 'sp-299', word: 'Equinox', distractors: ['Euqinox', 'Equuinox', 'Equnox'] }, // W30 Astronomy
  { id: 'sp-300', word: 'Solstice', distractors: ['Slostice', 'Sollstice', 'Soltice'] }, // W30 Astronomy
  { id: 'sp-301', word: 'Continent', distractors: ['Cnotinent', 'Conntinent', 'Coninent'] }, // W31 Geography & Earth Science
  { id: 'sp-302', word: 'Peninsula', distractors: ['Pneinsula', 'Penninsula', 'Pennsula'] }, // W31 Geography & Earth Science
  { id: 'sp-303', word: 'Archipelago', distractors: ['Acrhipelago', 'Arcchipelago', 'Arcipelago'] }, // W31 Geography & Earth Science
  { id: 'sp-304', word: 'Plateau', distractors: ['Palteau', 'Plaateau', 'Plaeau'] }, // W31 Geography & Earth Science
  { id: 'sp-305', word: 'Sediment', distractors: ['Sdeiment', 'Seddiment', 'Sedment'] }, // W31 Geography & Earth Science
  { id: 'sp-306', word: 'Tectonic', distractors: ['Tcetonic', 'Tecctonic', 'Teconic'] }, // W31 Geography & Earth Science
  { id: 'sp-307', word: 'Atmosphere', distractors: ['Amtosphere', 'Atmmosphere', 'Atmsphere'] }, // W31 Geography & Earth Science
  { id: 'sp-308', word: 'Precipitation', distractors: ['Percipitation', 'Preecipitation', 'Preipitation'] }, // W31 Geography & Earth Science
  { id: 'sp-309', word: 'Hemisphere', distractors: ['Hmeisphere', 'Hemmisphere', 'Hemsphere'] }, // W31 Geography & Earth Science
  { id: 'sp-310', word: 'Latitude', distractors: ['Ltaitude', 'Lattitude', 'Lattude'] }, // W31 Geography & Earth Science
  { id: 'sp-311', word: 'Ordinary', distractors: ['Odrinary', 'Orddinary', 'Ordnary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-312', word: 'Boundary', distractors: ['Buondary', 'Bouundary', 'Boudary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-313', word: 'Vocabulary', distractors: ['Vcoabulary', 'Voccabulary', 'Vocbulary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-314', word: 'Laboratory', distractors: ['Lbaoratory', 'Labboratory', 'Labratory'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-315', word: 'Territory', distractors: ['Treritory', 'Terrritory', 'Teritory'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-316', word: 'Category', distractors: ['Ctaegory', 'Cattegory', 'Catgory'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-317', word: 'Mandatory', distractors: ['Mnadatory', 'Manndatory', 'Manatory'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-318', word: 'Voluntary', distractors: ['Vlountary', 'Volluntary', 'Volntary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-319', word: 'Customary', distractors: ['Csutomary', 'Cusstomary', 'Cusomary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-320', word: 'Auxiliary', distractors: ['Axuiliary', 'Auxxiliary', 'Auxliary'] }, // W32 -ARY/-ERY/-ORY Endings
  { id: 'sp-321', word: 'Occupation', distractors: ['Occcupation', 'Occpation', 'Occupatiun'] }, // W33 Business & Career
  { id: 'sp-322', word: 'Colleague', distractors: ['Cloleague', 'Collleague', 'Coleague'] }, // W33 Business & Career
  { id: 'sp-323', word: 'Entrepreneur', distractors: ['Etnrepreneur', 'Enttrepreneur', 'Entepreneur'] }, // W33 Business & Career
  { id: 'sp-324', word: 'Salary', distractors: ['Slaary', 'Sallary', 'Salry'] }, // W33 Business & Career
  { id: 'sp-325', word: 'Interview', distractors: ['Itnerview', 'Intterview', 'Intrview'] }, // W33 Business & Career
  { id: 'sp-326', word: 'Resume', distractors: ['Rseume', 'Ressume', 'Resme'] }, // W33 Business & Career
  { id: 'sp-327', word: 'Qualification', distractors: ['Qaulification', 'Quaalification', 'Quaification'] }, // W33 Business & Career
  { id: 'sp-328', word: 'Negotiate', distractors: ['Ngeotiate', 'Neggotiate', 'Negtiate'] }, // W33 Business & Career
  { id: 'sp-329', word: 'Professional', distractors: ['Porfessional', 'Proofessional', 'Proessional'] }, // W33 Business & Career
  { id: 'sp-330', word: 'Corporation', distractors: ['Croporation', 'Corrporation', 'Cororation'] }, // W33 Business & Career
  { id: 'sp-331', word: 'Argument', distractors: ['Agrument', 'Arggument', 'Argment'] }, // W34 Middle School Hard Words
  { id: 'sp-332', word: 'Judgment', distractors: ['Jdugment', 'Juddgment', 'Judment'] }, // W34 Middle School Hard Words
  { id: 'sp-333', word: 'Acquire', distractors: ['Aqcuire', 'Acqquire', 'Acqire'] }, // W34 Middle School Hard Words
  { id: 'sp-334', word: 'Acquaintance', distractors: ['Aqcuaintance', 'Acqquaintance', 'Acqaintance'] }, // W34 Middle School Hard Words
  { id: 'sp-335', word: 'Millennium', distractors: ['Mlilennium', 'Milllennium', 'Milennium'] }, // W34 Middle School Hard Words
  { id: 'sp-336', word: 'Occurrence', distractors: ['Occcurrence', 'Occrrence', 'Occorrence'] }, // W34 Middle School Hard Words
  { id: 'sp-337', word: 'Harass', distractors: ['Hraass', 'Harrass', 'Harss'] }, // W34 Middle School Hard Words
  { id: 'sp-338', word: 'Liaison', distractors: ['Laiison', 'Liaaison', 'Liason'] }, // W34 Middle School Hard Words
  { id: 'sp-339', word: 'Pronunciation', distractors: ['Pornunciation', 'Proonunciation', 'Prounciation'] }, // W34 Middle School Hard Words
  { id: 'sp-340', word: 'Fluorescent', distractors: ['Fulorescent', 'Fluuorescent', 'Flurescent'] }, // W34 Middle School Hard Words
  { id: 'sp-341', word: 'International', distractors: ['Itnernational', 'Intternational', 'Intrnational'] }, // W35 Advanced Prefixes
  { id: 'sp-342', word: 'Transatlantic', distractors: ['Tarnsatlantic', 'Traansatlantic', 'Trasatlantic'] }, // W35 Advanced Prefixes
  { id: 'sp-343', word: 'Supersonic', distractors: ['Spuersonic', 'Suppersonic', 'Suprsonic'] }, // W35 Advanced Prefixes
  { id: 'sp-344', word: 'Ultraviolet', distractors: ['Utlraviolet', 'Ulttraviolet', 'Ultaviolet'] }, // W35 Advanced Prefixes
  { id: 'sp-345', word: 'Interstellar', distractors: ['Itnerstellar', 'Intterstellar', 'Intrstellar'] }, // W35 Advanced Prefixes
  { id: 'sp-346', word: 'Transmission', distractors: ['Tarnsmission', 'Traansmission', 'Trasmission'] }, // W35 Advanced Prefixes
  { id: 'sp-347', word: 'Superhuman', distractors: ['Spuerhuman', 'Supperhuman', 'Suprhuman'] }, // W35 Advanced Prefixes
  { id: 'sp-348', word: 'Intergalactic', distractors: ['Itnergalactic', 'Inttergalactic', 'Intrgalactic'] }, // W35 Advanced Prefixes
  { id: 'sp-349', word: 'Transform', distractors: ['Tarnsform', 'Traansform', 'Trasform'] }, // W35 Advanced Prefixes
  { id: 'sp-350', word: 'Superstructure', distractors: ['Spuerstructure', 'Supperstructure', 'Suprstructure'] }, // W35 Advanced Prefixes
  { id: 'sp-351', word: 'Aeronautics', distractors: ['Areonautics', 'Aerronautics', 'Aernautics'] }, // W36 Aerospace Capstone
  { id: 'sp-352', word: 'Astrophysics', distractors: ['Atsrophysics', 'Asttrophysics', 'Astophysics'] }, // W36 Aerospace Capstone
  { id: 'sp-353', word: 'Propulsion', distractors: ['Porpulsion', 'Proopulsion', 'Proulsion'] }, // W36 Aerospace Capstone
  { id: 'sp-354', word: 'Trajectory', distractors: ['Tarjectory', 'Traajectory', 'Traectory'] }, // W36 Aerospace Capstone
  { id: 'sp-355', word: 'Reentry', distractors: ['Reeentry', 'Reetry', 'Reantry'] }, // W36 Aerospace Capstone
  { id: 'sp-356', word: 'Weightlessness', distractors: ['Wieghtlessness', 'Weiightlessness', 'Weihtlessness'] }, // W36 Aerospace Capstone
  { id: 'sp-357', word: 'Spacecraft', distractors: ['Sapcecraft', 'Spaacecraft', 'Spaecraft'] }, // W36 Aerospace Capstone
  { id: 'sp-358', word: 'Extravehicular', distractors: ['Etxravehicular', 'Exttravehicular', 'Extavehicular'] }, // W36 Aerospace Capstone
  { id: 'sp-359', word: 'Aerodynamics', distractors: ['Areodynamics', 'Aerrodynamics', 'Aerdynamics'] }, // W36 Aerospace Capstone
  { id: 'sp-360', word: 'Countdown', distractors: ['Cuontdown', 'Couuntdown', 'Coutdown'] }, // W36 Aerospace Capstone
];
