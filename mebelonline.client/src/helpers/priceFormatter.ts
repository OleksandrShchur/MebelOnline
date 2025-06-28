const priceFormatter = (price: number): string =>
  new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);

export default priceFormatter;
