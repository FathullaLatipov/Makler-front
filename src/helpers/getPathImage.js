export function getPathImage(image) {
    const value = URL.createObjectURL(image);
    return value;
}