const cache = new Map();

const TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req, res, next) {
  const key = req.originalUrl;

  const cachedData = cache.get(key);

  // Cache exists
  if (cachedData) {
    const age = Date.now() - cachedData.createdAt;

    // Cache is still valid
    if (age < TTL) {
      res.set("X-Cache", "HIT");

      return res.json(cachedData.data);
    }

    // Cache has expired
    cache.delete(key);
  }

  // Cache MISS
  res.set("X-Cache", "MISS");

  const originalJson = res.json.bind(res);

  res.json = (data) => {
    cache.set(key, {
      data: data,
      createdAt: Date.now()
    });

    return originalJson(data);
  };

  next();
}

// Clear all cached data
function clearCache() {
  cache.clear();
}

module.exports = {
  cacheMiddleware,
  clearCache
};