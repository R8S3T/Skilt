export const randomMargin = (min = 0, max = 20) => {
    return Math.random() * (max - min) + min;
}