/* eslint-disable import/prefer-default-export */
export const modelToJSON = (model, publicKeys) => publicKeys.reduce((acc, el) => ({
  ...acc,
  [el]: model[el],
}), {});
