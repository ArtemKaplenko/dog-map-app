const validationStation = ({ name, description, radius }) => {
  if (name === '' || name.length > 20) {
    return false;
  } else if (description === '' || description.length > 200) {
    return false;
  } else if (parseFloat(radius) <= 0 || parseFloat(radius) > 250) {
    return false;
  }
  return true;
}

export default validationStation;