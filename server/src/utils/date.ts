const oneYearFromNow = (): Date =>
  new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

const thirtyDaysFromNow = (): Date =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const fifteenMinuteFromNow = (): Date => new Date(Date.now() + 15 * 60 * 1000);

export { oneYearFromNow, thirtyDaysFromNow, fifteenMinuteFromNow };
