/**
 * Heritage Points — Sheet Population Script
 * ──────────────────────────────────────────
 * Paste this entire file into the Apps Script editor of your Google Sheet
 * (Extensions → Apps Script), then click Run → populateHPData.
 *
 * It will:
 *  • Clear and reformat the "HP Description Data" tab
 *  • Write field names down column A (rows 1–10)
 *  • Write one place per column B–X (all 23 Heritage Points)
 *  • Freeze column A so field names stay visible while scrolling
 *  • Format the header column and leave photoFolder + fullText rows
 *    ready for the team to fill in Drive folder URLs and expanded copy.
 */

function populateHPData() {
  const SHEET_NAME = 'HP Description Data';
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  } else {
    sheet.clearContents();
    sheet.clearFormats();
  }

  // ── Field order — must match property names the app reads ──────────────
  const FIELDS = [
    'id',
    'name',
    'hookLine',
    'shortText',
    'fullText',
    'category',
    'photoFolder',
    'lat',
    'lng',
    'contributor',
  ];

  // ── All 23 Heritage Points (seed data) ────────────────────────────────
  const PLACES = [
    {
      id: 's1', lat: 50.0492, lng: 19.9462,
      name: 'Theater "BARAKAH"',
      hookLine: 'Small stage, real stakes.',
      category: 'event space',
      contributor: 'local resident',
      shortText: 'A small-scale theatre network running important works and community events in Kazimierz.',
      fullText: 'The kind of cultural infrastructure that sustains a neighbourhood — invisible to tourist apps, essential to locals.',
      photoFolder: '',
    },
    {
      id: 's2', lat: 50.0511, lng: 19.9452,
      name: 'Hevre',
      hookLine: 'A synagogue that never stopped gathering.',
      category: 'event space',
      contributor: 'local resident',
      shortText: 'A bar and community event space inside an inoperative synagogue on Miodowa.',
      fullText: 'The building carries history; the community inside it is writing a new layer on top.',
      photoFolder: '',
    },
    {
      id: 's3', lat: 50.0513, lng: 19.9443,
      name: 'Alchemia Bar',
      hookLine: 'Twenty years of the same wooden tables.',
      category: 'bar & culture',
      contributor: 'Kazimierz regular',
      shortText: "One of the founding venues of Kazimierz's cultural revival.",
      fullText: 'Artists, students, and longtime residents share the same wooden tables. Apps mark it. They cannot explain what it means to people who have been coming here for twenty years.',
      photoFolder: '',
    },
    {
      id: 's4', lat: 50.0517, lng: 19.9448,
      name: 'Les Colores Cafe Bar',
      hookLine: 'Colour, coffee, and no TripAdvisor logic.',
      category: 'bar & culture',
      contributor: 'local',
      shortText: 'A small bar in the heart of Kazimierz known to regulars for its atmosphere and community feel.',
      fullText: 'Not its ranking on any platform.',
      photoFolder: '',
    },
    {
      id: 's5', lat: 50.0521, lng: 19.9453,
      name: 'Kraina Szeptow Bar',
      hookLine: "The city's quietest corner.",
      category: 'bar & culture',
      contributor: 'local',
      shortText: '"Land of Whispers." A Kazimierz bar built on intimacy, not footfall.',
      fullText: 'The name is the brief.',
      photoFolder: '',
    },
    {
      id: 's6', lat: 50.0508, lng: 19.9472,
      name: '"LueLue" Art Gallery',
      hookLine: 'Local walls, local work.',
      category: 'gallery & arts',
      contributor: 'arts community',
      shortText: 'An independent gallery on Józefa showing local and emerging work.',
      fullText: 'Exists because the neighbourhood decided it should — not because the economics demanded it.',
      photoFolder: '',
    },
    {
      id: 's7', lat: 50.0515, lng: 19.9435,
      name: 'Enjoy Tufting Studio',
      hookLine: 'Heritage being made right now.',
      category: 'gallery & arts',
      contributor: 'local artisan',
      shortText: 'An independent tufting studio run by a local, offering walk-in workshops and community events.',
      fullText: 'A reminder that heritage is being made right now, not only preserved.',
      photoFolder: '',
    },
    {
      id: 's8', lat: 50.0499, lng: 19.9454,
      name: 'Todoro',
      hookLine: 'Made here. Bought here. Stays here.',
      category: 'gallery & arts',
      contributor: 'regular customer',
      shortText: 'Handcrafted jewellery by a local artisan.',
      fullText: 'Small production, close relationship between maker and buyer. The antithesis of a souvenir shop.',
      photoFolder: '',
    },
    {
      id: 's9', lat: 50.0506, lng: 19.9475,
      name: 'Lean & Miko (pottery studio)',
      hookLine: 'Clay, community, Józefa street.',
      category: 'gallery & arts',
      contributor: 'local',
      shortText: 'A pottery studio on Józefa where you can watch, learn, and buy directly.',
      fullText: 'Objects made here stay in the neighbourhood — passed between people who know each other.',
      photoFolder: '',
    },
    {
      id: 's10', lat: 50.0520, lng: 19.9448,
      name: 'Art Workshop "Kwaśny & La Compania"',
      hookLine: 'Where Kazimierz makes things.',
      category: 'gallery & arts',
      contributor: 'local',
      shortText: "An art workshop embedded in Kazimierz's creative fabric.",
      fullText: "The kind of place that anchors a neighbourhood's identity without appearing on any official map.",
      photoFolder: '',
    },
    {
      id: 's11', lat: 50.0518, lng: 19.9455,
      name: 'Art Gallery "Lookarnia Illustrations"',
      hookLine: "Illustrated stories of the place you're standing in.",
      category: 'gallery & arts',
      contributor: 'local',
      shortText: 'An illustration-focused gallery giving local artists a wall.',
      fullText: 'Locals encounter work made about the place they live in.',
      photoFolder: '',
    },
    {
      id: 's12', lat: 50.0512, lng: 19.9437,
      name: 'Art Gallery "Raven"',
      hookLine: "Art on the neighbourhood's terms.",
      category: 'gallery & arts',
      contributor: 'local',
      shortText: 'A gallery operating at the intersection of community and commerce.',
      fullText: "Just on the community's terms.",
      photoFolder: '',
    },
    {
      id: 's13', lat: 50.0507, lng: 19.9469,
      name: '"Austeria" Bookshop',
      hookLine: 'Hebrew books in a 16th-century synagogue.',
      category: 'shop',
      contributor: 'regular customer',
      shortText: 'A Hebrew culture bookshop inside the High Synagogue on Józefa.',
      fullText: 'The building is listed; the bookshop is what makes it alive. Neither makes sense without the other.',
      photoFolder: '',
    },
    {
      id: 's14', lat: 50.0514, lng: 19.9457,
      name: '"Lokator" Bookshop + Coffee',
      hookLine: 'Arrive for a book. Stay for two hours.',
      category: 'shop',
      contributor: 'regular',
      shortText: 'A multilingual bookstore and café.',
      fullText: 'Regulars from multiple cities, multiple languages — one neighbourhood.',
      photoFolder: '',
    },
    {
      id: 's15', lat: 50.0505, lng: 19.9445,
      name: 'Patisserie "Vanilla"',
      hookLine: 'Not a destination bakery. A neighbourhood one.',
      category: 'shop',
      contributor: 'local resident',
      shortText: 'Deeply associated with Kazimierz life.',
      fullText: 'Not a destination bakery — a neighbourhood one. The distinction matters.',
      photoFolder: '',
    },
    {
      id: 's16', lat: 50.0498, lng: 19.9455,
      name: 'Traditional ice cream (Starowiślna)',
      hookLine: 'The one locals always go back to.',
      category: 'shop',
      contributor: 'local',
      shortText: 'The go-to ice cream shop on Starowiślna.',
      fullText: 'No tourist queues, no Instagram wall — just a shop locals have been choosing for years.',
      photoFolder: '',
    },
    {
      id: 's17', lat: 50.0522, lng: 19.9442,
      name: 'Antique shop "Hulajpole"',
      hookLine: 'Leave a book. Take a book.',
      category: 'shop',
      contributor: 'local',
      shortText: 'A second-hand bookstore and antique shop where books are interchangeable.',
      fullText: 'The logic is communal, not commercial.',
      photoFolder: '',
    },
    {
      id: 's18', lat: 50.0516, lng: 19.9440,
      name: 'Plac Nowy',
      hookLine: "The square apps can't explain.",
      category: 'informal space',
      contributor: 'Kazimierz regular',
      shortText: 'The real market square of Kazimierz. Colourful, loud, alive.',
      fullText: "Meeting point, food court, and social anchor simultaneously. Apps mark it. They cannot capture a Saturday morning here.",
      photoFolder: '',
    },
    {
      id: 's19', lat: 50.0481, lng: 19.9476,
      name: '"Kładka Bernadka"',
      hookLine: 'Same bridge, two different cities.',
      category: 'informal space',
      contributor: 'local resident',
      shortText: 'The Father Bernadek pedestrian bridge — an informal meeting space and daily crossing.',
      fullText: 'Locals use it to get somewhere; visitors use it for a view. The same structure, two completely different experiences.',
      photoFolder: '',
    },
    {
      id: 's20', lat: 50.0510, lng: 19.9460,
      name: 'Passage "Listy Schindlera"',
      hookLine: 'A shorthand for layered memory.',
      category: 'informal space',
      contributor: 'local',
      shortText: "A passage connecting Dietla and Miodowa, named after Schindler's letters.",
      fullText: "One of those routes residents use as shorthand for the neighbourhood's layered memory.",
      photoFolder: '',
    },
    {
      id: 's21', lat: 50.0542, lng: 19.9484,
      name: 'Stara Zajezdnia',
      hookLine: 'The tram depot the community kept.',
      category: 'informal space',
      contributor: 'regular visitor',
      shortText: 'An old tram depot repurposed as a space for markets, pop-ups, and lunch.',
      fullText: 'The kind of adaptive reuse that only works when the community keeps showing up — which it does.',
      photoFolder: '',
    },
    {
      id: 's22', lat: 50.0510, lng: 19.9470,
      name: 'Żydowskie Muzeum Galicja',
      hookLine: 'A cultural centre, not a tourist attraction.',
      category: 'museum',
      contributor: 'local',
      shortText: 'The Galicia Jewish Museum on Dajwór.',
      fullText: 'A serious institution documenting the history of Jews in southeastern Poland. A cultural centre the neighbourhood built its identity around.',
      photoFolder: '',
    },
    {
      id: 's23', lat: 50.0543, lng: 19.9485,
      name: 'Muzeum Inżynierii i Techniki',
      hookLine: 'Not just a museum.',
      category: 'museum',
      contributor: 'local',
      shortText: 'The Museum of Engineering and Technology on Wawrzyńca.',
      fullText: 'Under-visited relative to its quality. A neighbourhood institution overlooked because no famous film was made about it.',
      photoFolder: '',
    },
  ];

  // ── Build the 2-D array: rows = fields, cols = places ─────────────────
  // Cell [0][0] = "field" label; [0][1..23] = place names as header hint
  // Cell [r][0] = field key; [r][c] = place[field]

  const numRows = FIELDS.length;
  const numCols = 1 + PLACES.length; // col A (field names) + one col per place

  const data = [];
  for (let r = 0; r < numRows; r++) {
    const row = [FIELDS[r]]; // column A
    for (let c = 0; c < PLACES.length; c++) {
      const val = PLACES[c][FIELDS[r]];
      row.push(val !== undefined && val !== null ? val : '');
    }
    data.push(row);
  }

  // Write all at once (much faster than cell-by-cell)
  sheet.getRange(1, 1, numRows, numCols).setValues(data);

  // ── Formatting ────────────────────────────────────────────────────────

  // Column A: field key labels — bold, light grey background
  const colA = sheet.getRange(1, 1, numRows, 1);
  colA.setFontWeight('bold');
  colA.setBackground('#f0f0f0');
  colA.setFontFamily('Courier New');
  colA.setFontSize(10);

  // Rows that are "long text" fields — taller row height, wrap text
  const wrapRows = {
    shortText: FIELDS.indexOf('shortText') + 1,
    fullText:  FIELDS.indexOf('fullText')  + 1,
  };
  sheet.setRowHeight(wrapRows.shortText, 60);
  sheet.setRowHeight(wrapRows.fullText,  80);
  sheet.getRange(wrapRows.shortText, 2, 1, PLACES.length).setWrap(true);
  sheet.getRange(wrapRows.fullText,  2, 1, PLACES.length).setWrap(true);

  // photoFolder row — highlight yellow so team knows to fill it in
  const photoRow = FIELDS.indexOf('photoFolder') + 1;
  sheet.getRange(photoRow, 2, 1, PLACES.length)
    .setBackground('#fff9c4')
    .setNote('Paste the Google Drive folder URL for this place\'s photos here.');

  // lat/lng rows — number format
  const latRow = FIELDS.indexOf('lat') + 1;
  const lngRow = FIELDS.indexOf('lng') + 1;
  sheet.getRange(latRow, 2, 1, PLACES.length).setNumberFormat('0.0000000');
  sheet.getRange(lngRow, 2, 1, PLACES.length).setNumberFormat('0.0000000');

  // Freeze column A (field names stay visible while scrolling right)
  sheet.setFrozenColumns(1);

  // Auto-resize column A; set place columns to a comfortable fixed width
  sheet.autoResizeColumn(1);
  for (let c = 2; c <= numCols; c++) {
    sheet.setColumnWidth(c, 260);
  }

  // Outer border around the data block
  sheet.getRange(1, 1, numRows, numCols)
    .setBorder(true, true, true, true, false, false, '#cccccc', SpreadsheetApp.BorderStyle.SOLID);

  // ── Done ──────────────────────────────────────────────────────────────
  SpreadsheetApp.getUi().alert(
    '✅ Heritage Points sheet populated!\n\n' +
    PLACES.length + ' places × ' + FIELDS.length + ' fields written to "' + SHEET_NAME + '".\n\n' +
    'Next steps:\n' +
    '1. Fill in the photoFolder row (highlighted yellow) with Google Drive folder links.\n' +
    '2. Correct lat/lng coordinates where needed.\n' +
    '3. Edit shortText / fullText / hookLine copy to taste.'
  );
}
