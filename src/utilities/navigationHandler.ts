const handleHexagonPress = (navigation, id, targetScreen, paramsKey) => {
    navigation.navigate(targetScreen, { [paramsKey]: id });
};

export default handleHexagonPress;