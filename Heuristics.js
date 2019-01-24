const euclideanCache = new Map();

const Heuristics = Object.freeze({
    CHEBYSHEV = (n1, n2) => {
        return Math.max(Math.abs(n1.x - n2.x), Math.abs(n1.y - n2.y));
    },
    MANHATTAN = (n1, n2) => {
        return Math.abs(n1.x - n2.x) + Math.abs(n1.y - n2.y);
    },
    EUCLIDEAN = (n1, n2) => {
        const x = Math.abs(n1.x - n2.x);
        const y = Math.abs(n1.y - n2.y);
        const set = x > y ? [x, y] : [y, x];

        if(euclideanCache.has(set[0]) && euclideanCache.get(set[0]).has(set[1])) {
            return euclideanCache.get(set[0]).get(set[1]);
        }
        const dist = Math.sqrt(Math.pow(n1.x - n2.x, 2) + Math.pow(n1.y - n2.y, 2));
        if (!euclideanCache.has(set[0])) {
            euclideanCache.set(set[0], new Map()); 
        }
        euclideanCache.get(set[0]).set(set[1], dist);
        return dist;
    }

})