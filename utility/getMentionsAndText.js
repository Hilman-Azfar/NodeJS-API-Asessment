module.exports = (notification) => {
  // split by whitespace + a
  // use non capturing group to not include whitepace + a in split array
  // use positive look ahead to match without including it in the result
  // reference: https://includestdio.com/1623.html

  // get a better email match which doesnt need manual updates
  const parsed = notification.split(
    /(?:\s@)(?=[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA_Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|sg)\b)/g
  );
  return parsed;
};
