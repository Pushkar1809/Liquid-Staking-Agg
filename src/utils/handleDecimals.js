export const handleDecimals = (num) => {
    return parseFloat(num).toLocaleString("en", {
			minimumFractionDigits: 4,
		});
}