const FA = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
export const fa = (n) => String(n).replace(/[0-9]/g, (d) => FA[+d]);
export const money = (n) => fa(n.toLocaleString('en-US')).replace(/,/g, '٬');
