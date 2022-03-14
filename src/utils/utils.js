const routeToPlayerInformation = (router, playerName) => {
  router.push({
    name: "PlayerInformationView",
    params: {
      playerName: playerName,
    },
  });
};

export {
  routeToPlayerInformation
}