export const syncPetals = (petals) => {
    return petals.every(p => p.status === "ALIGNED" && p.root === "08e829");
};
