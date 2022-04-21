export function displayDelay(a:Date, b:Date = new Date()) {
    let seconds = Math.abs(b.getTime() - a.getTime()) / 1000;
    if (seconds < 60)
        return Math.floor(seconds) + " secondes"
    seconds /= 60
    if (seconds < 60)
        return Math.floor(seconds) + " minutes"
    seconds /= 60
    if (seconds < 24)
        return Math.floor(seconds) + " heures"

    seconds /= 24
    return Math.floor(seconds) + " jours"
}