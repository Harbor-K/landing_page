// Where the buttons on this page go.
// Back → the portfolio home (Projects section). Next project → that project's page.
// When utrada / eto-markets get their own folders and are deployed, change the URLs below to point at them.
const PORTFOLIO = 'https://project-harbor-kim-portfolio-114.magicpatterns.app/';

export const HOME_URL = PORTFOLIO + '#work';

export const PROJECT_URLS: Record<string, string> = {
  '#/trust-bank': PORTFOLIO + '#/trust-bank',
  '#/gamecove': PORTFOLIO + '#/gamecove',
  '#/utrada': PORTFOLIO + '#/utrada',
};
