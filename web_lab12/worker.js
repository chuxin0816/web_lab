onmessage = function (e) {
    const { start, end } = e.data;

    let count = 0;
    // 简单判断质数函数（可稍微优化）
    function isPrime(num) {
        if (num < 2) return false;
        // 优化上限为sqrt(num)
        const limit = Math.sqrt(num);
        for (let i = 2; i <= limit; i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }

    for (let num = start; num <= end; num++) {
        if (isPrime(num)) {
            count++;
            // 每找到1000个质数，发送一次进度消息
            if (count % 1000 === 0) {
                postMessage({ type: 'progress', count: count });
            }
        }
    }

    // 最终结果
    postMessage({ type: 'result', count: count });
};