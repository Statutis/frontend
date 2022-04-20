let idCounter = 0

export default function _uniqueId(prefix: string) {
    idCounter++
    return prefix + "-" + idCounter
}
