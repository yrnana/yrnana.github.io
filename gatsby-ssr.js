import { CacheProvider } from '@emotion/core'
import { createMyCache } from './src/utils/create-emotion-cache'

export const wrapRootElement = ({ element }) => (
	<CacheProvider value={createMyCache()}>{element}</CacheProvider>
)
