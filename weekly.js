(() => {
  const data = window.ELKHORN_WEEKLY;
  const root = document.querySelector("[data-weekly]");

  if (!root || !data) return;

  const isFresh =
    typeof data.validThrough === "string" &&
    Number.isFinite(Date.parse(data.validThrough)) &&
    Date.now() <= Date.parse(data.validThrough);

  const fallback = {
    updatedLabel: "Weekly update in progress",
    headline: "This week’s details are on the way.",
    introduction:
      "We’re confirming the latest Grill specials and Elkhorn happenings. Use the options below for current information.",
    sections: [
      {
        kicker: "The Grill",
        title: "Ask about this week’s specials",
        body:
          "Call Elkhorn for the latest Thursday and Friday dinner features and reservation availability.",
        status: "Current details by phone",
        linkLabel: "Call Elkhorn",
        link: "tel:+18443830197",
      },
      {
        kicker: "Events & Planning",
        title: "Start planning your gathering",
        body:
          "Share your event details through Elkhorn’s secure inquiry path and the events team will follow up.",
        status: "Weddings · Celebrations · Gatherings",
        linkLabel: "Explore events",
        link: "events.html",
      },
      {
        kicker: "Golf",
        title: "Make time for a round",
        body:
          "Review course information and continue to current public or member booking options.",
        status: "Plan your visit",
        linkLabel: "Explore golf",
        link: "golf.html",
      },
    ],
  };

  const view = isFresh ? data : fallback;
  const updated = document.querySelector("[data-weekly-updated]");
  const title = document.querySelector("[data-weekly-title]");
  const intro = document.querySelector("[data-weekly-intro]");

  if (updated) updated.textContent = view.updatedLabel;
  if (title) title.textContent = view.headline;
  if (intro) intro.textContent = view.introduction;

  root.replaceChildren(
    ...view.sections.map((item) => {
      const article = document.createElement("article");
      article.className = "weekly-card";

      const kicker = document.createElement("p");
      kicker.className = "eyebrow";
      kicker.textContent = item.kicker;

      const heading = document.createElement("h2");
      heading.textContent = item.title;

      const body = document.createElement("p");
      body.textContent = item.body;

      const status = document.createElement("p");
      status.className = "weekly-status";
      status.textContent = item.status;

      const link = document.createElement("a");
      link.className = "text-link";
      link.href = item.link;
      link.append(document.createTextNode(`${item.linkLabel} `));

      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      const external = /^https?:\/\//i.test(item.link);
      arrow.textContent = external ? "↗" : "→";
      link.append(arrow);

      if (external) {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
      }

      article.append(kicker, heading, body, status, link);
      return article;
    }),
  );

  const weather = document.querySelector("[data-weather]");
  if (weather && data.weather) {
    const eyebrow = weather.querySelector(".eyebrow");
    const heading = weather.querySelector("h2");
    const copy = weather.querySelector(".weather-copy");
    const link = weather.querySelector("a");

    if (eyebrow) eyebrow.textContent = data.weather.label;
    if (heading) heading.textContent = data.weather.title;
    if (copy) copy.textContent = data.weather.body;
    if (link) {
      link.href = data.weather.link;
      link.replaceChildren(
        document.createTextNode(`${data.weather.linkLabel} `),
      );
      const arrow = document.createElement("span");
      arrow.setAttribute("aria-hidden", "true");
      arrow.textContent = "↗";
      link.append(arrow);
    }
  }
})();
