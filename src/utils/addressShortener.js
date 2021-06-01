// Shortens ETH address like 0x...4312
export const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4, address.length)}`;
};
