var idCounter = 0

export default function _uniqueId(prefix) {
    idCounter++
    return prefix + "-" + idCounter
}
