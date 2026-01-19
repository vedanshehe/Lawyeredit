const checkOwnership = (resourceAuthorId, userId) => {
  return resourceAuthorId.toString() === userId.toString();
};

export default checkOwnership;
