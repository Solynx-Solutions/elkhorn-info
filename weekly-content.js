/*
 * Canonical weekly editorial source.
 *
 * Update only from Jessica's verified Monday specials. Keep `validThrough`
 * accurate so expired offers automatically fall back to current-contact paths
 * instead of remaining on the public site.
 */
window.ELKHORN_WEEKLY = {
  contentVersion: "2026-08-17",
  publishedAt: "2026-08-17T12:00:00-07:00",
  validThrough: "2026-08-24T06:59:59-07:00",
  updatedLabel: "Week of August 17",
  headline: "This week, meet us at Elkhorn.",
  introduction:
    "A single editorial view of Grill service, public happenings, golf planning, and the week ahead.",
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
      kicker: "Tuesday–Sunday",
      title: "Breakfast & lunch",
      body:
        "The Grill kitchen serves from 7am to 2pm, with all-day breakfast, lunch choices, and changing features.",
      status: "Kitchen · 7am–2pm",
      linkLabel: "Explore the Grill",
      link: "restaurant.html#menu",
    },
    {
      kicker: "Thursday & Friday",
      title: "Dinner at the Grill",
      body:
        "Dinner is served from 5pm to 9pm. Reservations are recommended.",
      status: "Dinner · 5–9pm",
      linkLabel: "Call for reservations",
      link: "tel:+18443830197",
    },
    {
      kicker: "Golf",
      title: "Make time for a round",
      body:
        "Review the weather, find public tee times, or continue through verified member booking.",
      status: "Live availability through EZLinks",
      linkLabel: "Explore golf",
      link: "golf.html",
    },
  ],
};
