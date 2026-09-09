/*
 * Canonical weekly editorial source.
 *
 * Update only from Jessica's verified Monday specials. Keep `validThrough`
 * accurate so expired offers automatically fall back to current-contact paths
 * instead of remaining on the public site.
 */
window.ELKHORN_WEEKLY = {
  contentVersion: "2026-09-07",
  publishedAt: "2026-09-09T09:14:05-07:00",
  validThrough: "2026-09-14T06:59:59-07:00",
  updatedLabel: "Week of September 7",
  headline: "Dinner worth planning around.",
  introduction:
    "Two chef-prepared dinner specials, a seasonal appetizer, and late-night happy hour at Elkhorn Grill.",
  weather: {
    label: "Stockton outlook",
    title: "Plan with the weather in mind.",
    body:
      "Check current conditions before a round, patio visit, or outdoor celebration.",
    linkLabel: "View current forecast",
    link: "https://forecast7.com/en/37d96n12129/stockton/",
  },
  sections: [
    {
      kicker: "Thursday · September 10",
      title: "Teriyaki salmon",
      body:
        "Teriyaki salmon served with rice and vegetables.",
      status: "$18 · Dinner 5–9pm",
      linkLabel: "Call for reservations",
      link: "tel:+12094772200",
    },
    {
      kicker: "Friday · September 11",
      title: "Braised lamb shank",
      body:
        "Braised lamb shank with chimichurri and creamy polenta.",
      status: "$28 · Dinner 5–9pm",
      linkLabel: "Call for reservations",
      link: "tel:+12094772200",
    },
    {
      kicker: "Thursday & Friday",
      title: "A little something for the table",
      body:
        "Try the honey-kissed prosciutto-wrapped peach with mozzarella, then stay for $10 appetizers and drink specials during late-night happy hour.",
      status: "$14 featured appetizer · Happy hour 7–9pm",
      linkLabel: "Call for reservations",
      link: "tel:+12094772200",
    },
  ],
};
