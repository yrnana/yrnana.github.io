import createCache from '@emotion/cache'

export const createMyCache = () => {
	const cache = createCache()
	cache.compat = true
	return cache
}

export const myCache = createMyCache()
