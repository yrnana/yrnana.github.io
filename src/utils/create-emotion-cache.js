import createCache from '@emotion/cache'
const isProd = process.env.NODE_ENV === 'production'

export const createMyCache = () => {
	const cache = createCache()
	if (!isProd) cache.compat = true
	return cache
}

export const myCache = createMyCache()
