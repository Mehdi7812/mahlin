const FA = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export const fa = (n) => String(n).replace(/[0-9]/g, (d) => FA[+d]);

export const money = (n) => {
  const num = Number(n);
  if (n === null || n === undefined || n === '' || isNaN(num)) return fa('0');
  return fa(num.toLocaleString('en-US')).replace(/,/g, '٬');
};
